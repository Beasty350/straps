'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HARCore } from '@/lib/pose/HARCore';
import { calculateAngle } from '@/lib/pose/MathUtils';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { RefreshCcw, ArrowLeft, PlayCircle, ChevronDown, ChevronUp, ActivityIcon, AlertTriangle, Heart, Video, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { AuthProvider, useAuth } from '@/lib/auth';
import { EXERCISE_CONFIGS } from '@/lib/pose/ExerciseRules';

export default function TrainingPageWrap() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
        <TrainingPage />
      </Suspense>
    </AuthProvider>
  );
}

function TrainingPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isHrConnected, setIsHrConnected] = useState(false);

  const [menu, setMenu] = useState<any>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [repsOffset, setRepsOffset] = useState(0);

  const [stats, setStats] = useState({
    exercise: '',
    reps: 0,
    status: 'Idle',
    feedback: '',
    score: 100,
    isPending: true,
    accuracy: 100,
    deductions: 0
  });

  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [expandedSet, setExpandedSet] = useState<number | null>(null);
  const [availableMenus, setAvailableMenus] = useState<any[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [showMenuPicker, setShowMenuPicker] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const allCompletedSetsRef = useRef<any[]>([]);
  const processingCompletionRef = useRef(false);

  const scoreBuffer = useRef<number[]>([]);
  const accuracyBuffer = useRef<number[]>([]);
  const deductionsBuffer = useRef<number[]>([]);
  const repFeedbackBuffer = useRef<string[]>([]);
  const lastRepCount = useRef(0);

  const currentSetReps = useRef<{
    timestamp: number;
    angles: Record<string, number>;
    positions: Record<string, { x: number, y: number, z: number }>;
  }[]>([]);

  const lastCaptureTime = useRef(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const harRef = useRef<HARCore | null>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);
  const isRestingRef = useRef(false);
  const isStartedRef = useRef(false);
  const [isPoseRecording, setIsPoseRecording] = useState(false);
  const sessionStartTime = useRef(Date.now());
  const [savedRecapId, setSavedRecapId] = useState<string | null>(null);
  const [isGeneratingLLM, setIsGeneratingLLM] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const relevantJointsRef = useRef<string[]>([]);

  // GIF Modal States
  const [gifVisible, setGifVisible] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifCloseLockRemaining, setGifCloseLockRemaining] = useState(0);
  const gifLockIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasShownInitialGif, setHasShownInitialGif] = useState(false);

  // Track previous exercise index to show GIF on change (even with zero rest)
  const prevExerciseIndexRef = useRef<number>(-1);

  // Heart Rate Monitoring
  const [heartRate, setHeartRate] = useState<number>(0);
  const hrSamplesRawRef = useRef<{ timestamp: number; bpm: number }[]>([]);
  const hrIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hrDeviceRef = useRef<any>(null);
  const currentRecapIdRef = useRef<string | null>(null);

  useEffect(() => { isRestingRef.current = isResting; }, [isResting]);
  useEffect(() => { isStartedRef.current = isStarted; }, [isStarted]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

  const normalizeExerciseKey = (input: string): string => {
    if (!input) return '';

    const clean = input.toLowerCase().trim().replace(/[\s-]+/g, '_');

    if (clean.includes('side_lunges') || clean.includes('side_lunge') || clean.includes('cossack')) return 'side_lunges';
    if (clean.includes('push_clean') || clean.includes('clean_jerk') || (clean.includes('clean') && clean.includes('jerk'))) return 'dumbbell_push_clean_jerk';
    if (clean.includes('push_jerk') || clean.includes('jerk')) return 'dumbbell_push_jerk';
    if (clean.includes('front_raise')) return 'front_raise';
    if (clean.includes('sumo_deadlift')) return 'sumo_deadlift';
    if (clean.includes('sumo_squat')) return 'sumo_squat';
    if (clean.includes('bicep')) return 'bicep_curl';
    if (clean.includes('hammer')) return 'hammer_curl';
    if (clean.includes('overhead') || clean.includes('shoulder_press')) return 'overhead_press';
    if (clean.includes('lateral')) return 'lateral_raises';
    if (clean.includes('up_right') || clean.includes('upright')) return 'up_right';
    if (clean.includes('high_pull')) return 'high_pull';
    if (clean.includes('thruster')) return 'dumbbell_thruster';
    if (clean.includes('deadlift')) return 'deadlift';
    if (clean.includes('lunge')) return 'lunges';
    if (clean.includes('squat')) return 'squat';

    return clean;
  };

  const formatExerciseName = (key: string) => {
    const normalized = normalizeExerciseKey(key);
    if (!normalized) return "Unknown";
    return normalized.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getFeedbackPenalty = (feedback: string): number => {
    const text = String(feedback || '').toLowerCase();

    if (!text) return 0;
    if (/face the camera|turn sideways|not visible/.test(text)) return 55;
    if (/start |move to start|rack position|widen|stance/.test(text)) return 40;
    if (/stand straight|keep |bend |do not|don't|stop at|fix form|symmetrical|alternate|together/.test(text)) return 30;

    return 0;
  };

  const getSafeScores = (scores: any, feedback: string = '') => {
    const feedbackPenalty = getFeedbackPenalty(feedback);
    const deviationMae = Number.isFinite(scores?.deviation_mae) ? Number(scores.deviation_mae) : 0;
    const maePenalty = Math.min(100, Math.round(deviationMae * 2));

    const rawDeductions = Number.isFinite(scores?.deductions)
      ? Number(scores.deductions)
      : Math.max(maePenalty, feedbackPenalty);

    const deductions = Math.min(100, Math.max(0, Math.round(rawDeductions)));

    const overall = Number.isFinite(scores?.overall)
      ? Math.max(0, Math.min(100, Math.round(Number(scores.overall))))
      : Math.max(0, 100 - deductions);

    const accuracy = Number.isFinite(scores?.accuracy)
      ? Math.max(0, Math.min(100, Math.round(Number(scores.accuracy))))
      : overall;

    return {
      overall,
      isPending: Boolean(scores?.isPending),
      accuracy,
      deductions,
      isDeviating: Boolean(scores?.isDeviating) || deductions > 0,
      details: Array.isArray(scores?.details) ? scores.details : [],
      deviation_mae: deviationMae
    };
  };

  const isWarningFeedback = (feedback: string, scores?: any): boolean => {
    const text = String(feedback || '').toLowerCase();
    if (scores?.isDeviating || scores?.deductions > 0) return true;

    return /face the camera|turn sideways|start |move to start|rack position|widen|stance|stand straight|keep |bend |do not|don't|stop at|fix form|not visible|symmetrical|alternate|together/.test(text);
  };

  const getExerciseCategory = (exerciseKey: string): string => {
    const configKey = normalizeExerciseKey(exerciseKey);
    const config = EXERCISE_CONFIGS[configKey];
    if (!config) return 'General';
    switch (config.category) {
      case 'upper_body': return 'Upper Body';
      case 'lower_body': return 'Lower Body';
      case 'full_body': return 'Full Body';
      default: return 'General';
    }
  };

  const generateAISummary = async () => {
    if (!savedRecapId) return;
    setIsGeneratingLLM(true);
    try {
      const res = await fetch('/api/recap/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recapId: savedRecapId })
      });
      const data = await res.json();
      if (data.success) setAiSummary(data.summary);
      else alert(data.error || "Failed to generate summary.");
    } catch (e) {
      console.error("Failed to generate AI summary", e);
    } finally {
      setIsGeneratingLLM(false);
    }
  };

  const fetchMenu = async () => {
    if (mode === 'free') {
      const local = localStorage.getItem('straps_free_mode_menu');
      if (local) {
        const menuData = JSON.parse(local);
        setMenu(menuData);
        setCurrentExerciseIndex(0);
        setRepsOffset(0);
        return;
      }
    }
    if (!user) return;
    const headers = { 'x-user-id': user.id.toString() };
    try {
      const res = await fetch(`${API_BASE}/api/menus`, { headers });
      const data = await res.json();
      if (data && data.length > 0) {
        const normalized = data.map((m: any) => {
          let exercises = m.exerciseList;
          if (typeof exercises === 'string') exercises = JSON.parse(exercises);
          return { ...m, exercises };
        });
        const completedMenus = JSON.parse(localStorage.getItem('straps_completed_menus') || '[]');
        const filteredMenus = normalized.filter((m: any) => !completedMenus.includes(m.id));
        setAvailableMenus(filteredMenus);
        if (filteredMenus.length > 0) setShowMenuPicker(true);
        else setMenu(null);
      }
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const selectMenu = (menuId: string) => {
    const chosen = availableMenus.find(m => m.id === menuId);
    if (chosen) {
      setMenu(chosen);
      setSelectedMenuId(menuId);
      setShowMenuPicker(false);
      setCurrentExerciseIndex(0);
      setRepsOffset(0);
      allCompletedSetsRef.current = [];
      setResults([]);
    }
  };

  // --- Heart Rate Functions ---
  const connectHeartRateMonitor = async () => {
    if (!(navigator as any).bluetooth) {
      alert('Web Bluetooth is not supported in this browser.');
      return;
    }
    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['heart_rate']
      });
      hrDeviceRef.current = device;
      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('heart_rate');
      const characteristic = await service?.getCharacteristic('heart_rate_measurement');
      if (!characteristic) throw new Error('Heart rate characteristic not found');
      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = event.target.value;
        const bpm = value.getUint8(1);
        setHeartRate(bpm);
      });
      alert('Heart rate monitor connected!');
      setIsHrConnected(true);
    } catch (err) {
      console.error('Bluetooth HR error:', err);
      alert('Could not connect to heart rate monitor.');
    }
  };

  const stopHrMonitoring = () => {
    if (hrIntervalRef.current) clearInterval(hrIntervalRef.current);
    setHeartRate(0);
    if (hrDeviceRef.current?.gatt?.disconnect) hrDeviceRef.current.gatt.disconnect();
  };

  // Start sampling HR every second (relative timestamp)
  useEffect(() => {
    if (isStartedRef.current && !isRestingRef.current && heartRate > 0) {
      if (hrIntervalRef.current) clearInterval(hrIntervalRef.current);
      hrIntervalRef.current = setInterval(() => {
        if (heartRate > 0) {
          const elapsedSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);
          hrSamplesRawRef.current.push({
            timestamp: elapsedSeconds,
            bpm: heartRate
          });
        }
      }, 1000);
    } else if (hrIntervalRef.current) {
      clearInterval(hrIntervalRef.current);
      hrIntervalRef.current = null;
    }
    return () => {
      if (hrIntervalRef.current) clearInterval(hrIntervalRef.current);
    };
  }, [isStarted, isResting, heartRate]);

  // --- GIF Helper Functions (FIXED) ---
  const getGifUrl = (exerciseKey: string): string => {
    const normalized = normalizeExerciseKey(exerciseKey);
    // Always return a valid path – fallback to bicep_curl.gif if normalization fails
    const safeKey = normalized ? normalized.replace(/[^a-z0-9_]/g, '') : 'bicep_curl';
    return `/gif/${safeKey}.gif`;
  };

  const showGif = (exerciseKey: string, autoLock: boolean = false) => {
    const url = getGifUrl(exerciseKey);
    setGifUrl(url);
    setGifVisible(true);
    if (autoLock) {
      setGifCloseLockRemaining(5);
      if (gifLockIntervalRef.current) clearInterval(gifLockIntervalRef.current);
      gifLockIntervalRef.current = setInterval(() => {
        setGifCloseLockRemaining((prev) => {
          if (prev <= 1) {
            if (gifLockIntervalRef.current) clearInterval(gifLockIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setGifCloseLockRemaining(0);
      if (gifLockIntervalRef.current) clearInterval(gifLockIntervalRef.current);
    }
  };

  const closeGif = () => {
    if (gifCloseLockRemaining > 0) return;
    setGifVisible(false);
    setGifUrl(null);
    if (gifLockIntervalRef.current) clearInterval(gifLockIntervalRef.current);
    setGifCloseLockRemaining(0);
  };

  // Auto‑show GIF when exercise changes (after rest or manual skip) – only after session start
  useEffect(() => {
    if (menu && menu.exercises && menu.exercises.length > 0 && !isStarted && !hasShownInitialGif) {
      const firstExercise = menu.exercises[0]?.name;
      if (firstExercise) {
        showGif(firstExercise, true);
        setHasShownInitialGif(true);
      }
    }
  }, [menu, isStarted, hasShownInitialGif]);

  // Track previous resting state for rest‑ending trigger
  const wasRestingRef = useRef(false);
  useEffect(() => {
    wasRestingRef.current = isResting;
  }, [isResting]);

  // Show GIF when rest period ends
  useEffect(() => {
    if (isStarted && !isResting && menu && menu.exercises[currentExerciseIndex]) {
      if (wasRestingRef.current === true) {
        const currentEx = menu.exercises[currentExerciseIndex]?.name;
        if (currentEx) {
          showGif(currentEx, true);
        }
      }
    }
  }, [isResting, currentExerciseIndex, isStarted, menu]);

  // ***** NEW: Show GIF when exercise index changes (handles zero‑rest transitions) *****
  useEffect(() => {
    if (!isStarted || isResting) return;
    if (menu && menu.exercises && currentExerciseIndex !== prevExerciseIndexRef.current) {
      // Avoid showing on the very first mount before workout starts
      if (prevExerciseIndexRef.current !== -1) {
        const newExercise = menu.exercises[currentExerciseIndex]?.name;
        if (newExercise) {
          showGif(newExercise, true);
        }
      }
      prevExerciseIndexRef.current = currentExerciseIndex;
    }
  }, [currentExerciseIndex, isStarted, isResting, menu]);

  // Cleanup GIF timer on unmount
  useEffect(() => {
    return () => {
      if (gifLockIntervalRef.current) clearInterval(gifLockIntervalRef.current);
    };
  }, []);

  // --- Initialisation ---
  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        await fetchMenu();
        const core = new HARCore();
        harRef.current = core;
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        if (!isMounted) return;
        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1
        });
        landmarkerRef.current = landmarker;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: "user" }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            try { await videoRef.current.play(); } catch (err) { }
            setIsLoading(false);
            requestRef.current = requestAnimationFrame(predictWebcam);
          }
        }
      } catch (e) {
        console.error("Init Error:", e);
        setIsLoading(false);
      }
    }
    init();
    return () => {
      isMounted = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      stopHrMonitoring();
    };
  }, [user, mode]);

  // Rest timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => setRestTimer((prev) => prev - 1), 1000);
    } else if (isResting && restTimer <= 0) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  // Update relevant joints when exercise changes
  useEffect(() => {
    if (menu && harRef.current) {
      const range = menu.exercises?.[currentExerciseIndex];
      if (range) {
        const currentExerciseKey = normalizeExerciseKey(range.name);
        harRef.current.setExercise(currentExerciseKey);
        const config = EXERCISE_CONFIGS[currentExerciseKey];
        if (config) {
          switch (config.category) {
            case 'upper_body':
              relevantJointsRef.current = ['shoulder_l', 'shoulder_r', 'elbow_l', 'elbow_r', 'wrist_l', 'wrist_r'];
              break;
            case 'lower_body':
              relevantJointsRef.current = ['hip_l', 'hip_r', 'knee_l', 'knee_r', 'ankle_l', 'ankle_r'];
              break;
            default:
              relevantJointsRef.current = ['shoulder_l', 'shoulder_r', 'elbow_l', 'elbow_r', 'wrist_l', 'wrist_r', 'hip_l', 'hip_r', 'knee_l', 'knee_r', 'ankle_l', 'ankle_r'];
          }
        } else {
          relevantJointsRef.current = ['shoulder_l', 'shoulder_r', 'elbow_l', 'elbow_r', 'wrist_l', 'wrist_r', 'hip_l', 'hip_r', 'knee_l', 'knee_r', 'ankle_l', 'ankle_r'];
        }
      }
    }
  }, [menu, currentExerciseIndex]);

  const lastVideoTimeRef = useRef(-1);

  const predictWebcam = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;
    const har = harRef.current;

    if (video && canvas && landmarker && har) {
      let startTimeMs = performance.now();

      if (lastVideoTimeRef.current !== video.currentTime && video.videoWidth > 0 && video.videoHeight > 0) {
        lastVideoTimeRef.current = video.currentTime;

        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const result = landmarker.detectForVideo(video, startTimeMs);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);

          if (result.landmarks) {
            const drawingUtils = new DrawingUtils(ctx);
            for (const lm of result.landmarks) {
              const connectors = PoseLandmarker.POSE_CONNECTIONS;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';

              for (const { start, end } of connectors) {
                const p1 = lm[start];
                const p2 = lm[end];
                if (!p1 || !p2 || (p1.visibility && p1.visibility < 0.5) || (p2.visibility && p2.visibility < 0.5)) continue;

                ctx.beginPath();
                ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
                ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
                ctx.shadowColor = '#00FFFF';
                ctx.shadowBlur = 15;
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 4;
                ctx.stroke();
              }

              for (let i = 0; i < lm.length; i++) {
                const p = lm[i];
                if (p.visibility && p.visibility < 0.5) continue;
                if (i < 11 && i !== 0) continue;

                ctx.beginPath();
                ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#FFFFFF';
                ctx.shadowColor = '#00FFFF';
                ctx.shadowBlur = 20;
                ctx.fill();
              }
              ctx.shadowBlur = 0;
            }
          }
          ctx.restore();
        }

        if (isStartedRef.current && !isRestingRef.current && result.landmarks && result.landmarks.length > 0) {
          const res = await har.process(
            result.landmarks[0] as any,
            result.worldLandmarks && result.worldLandmarks.length > 0 ? result.worldLandmarks[0] as any : []
          );

          if (res) {
            const currentTimestampMs = performance.now();

            if (currentTimestampMs - lastCaptureTime.current >= 100) {
              lastCaptureTime.current = currentTimestampMs;
              const lms = result.landmarks[0];

              const allAngles = {
                shoulder_l: Math.round(calculateAngle(lms[23], lms[11], lms[13])),
                shoulder_r: Math.round(calculateAngle(lms[24], lms[12], lms[14])),
                elbow_l: Math.round(calculateAngle(lms[11], lms[13], lms[15])),
                elbow_r: Math.round(calculateAngle(lms[12], lms[14], lms[16])),
                wrist_l: Math.round(calculateAngle(lms[13], lms[15], lms[17])),
                wrist_r: Math.round(calculateAngle(lms[14], lms[16], lms[18])),
                hip_l: Math.round(calculateAngle(lms[11], lms[23], lms[25])),
                hip_r: Math.round(calculateAngle(lms[12], lms[24], lms[26])),
                knee_l: Math.round(calculateAngle(lms[23], lms[25], lms[27])),
                knee_r: Math.round(calculateAngle(lms[24], lms[26], lms[28])),
                ankle_l: Math.round(calculateAngle(lms[25], lms[27], lms[29])),
                ankle_r: Math.round(calculateAngle(lms[26], lms[28], lms[30]))
              };

              const allPositions = {
                shoulder_l: { x: lms[11].x, y: lms[11].y, z: lms[11].z },
                shoulder_r: { x: lms[12].x, y: lms[12].y, z: lms[12].z },
                elbow_l: { x: lms[13].x, y: lms[13].y, z: lms[13].z },
                elbow_r: { x: lms[14].x, y: lms[14].y, z: lms[14].z },
                wrist_l: { x: lms[15].x, y: lms[15].y, z: lms[15].z },
                wrist_r: { x: lms[16].x, y: lms[16].y, z: lms[16].z },
                hip_l: { x: lms[23].x, y: lms[23].y, z: lms[23].z },
                hip_r: { x: lms[24].x, y: lms[24].y, z: lms[24].z },
                knee_l: { x: lms[25].x, y: lms[25].y, z: lms[25].z },
                knee_r: { x: lms[26].x, y: lms[26].y, z: lms[26].z },
                ankle_l: { x: lms[27].x, y: lms[27].y, z: lms[27].z },
                ankle_r: { x: lms[28].x, y: lms[28].y, z: lms[28].z }
              };

              const filteredAngles = Object.fromEntries(
                Object.entries(allAngles).filter(([key]) => relevantJointsRef.current.includes(key))
              );
              const filteredPositions = Object.fromEntries(
                Object.entries(allPositions).filter(([key]) => relevantJointsRef.current.includes(key))
              );

              const elapsedSeconds = parseFloat(((currentTimestampMs - sessionStartTime.current) / 1000).toFixed(1));
              currentSetReps.current.push({
                timestamp: elapsedSeconds,
                angles: filteredAngles,
                positions: filteredPositions
              });
            }

            const displayFeedback = String((res as any).orientationWarning || res.feedback || '').trim();
            const scoresData = getSafeScores((res as any).scores, displayFeedback);
            const warningFeedback = isWarningFeedback(displayFeedback, scoresData);

            if (!scoresData.isPending) {
              scoreBuffer.current.push(scoresData.overall);
              accuracyBuffer.current.push(scoresData.accuracy);
              if (scoresData.deductions > 0) {
                deductionsBuffer.current.push(scoresData.deductions);
              }
            }

            if (displayFeedback && !displayFeedback.includes("null")) {
              repFeedbackBuffer.current.push(displayFeedback);
            }

            if (res.reps > lastRepCount.current) {
              lastRepCount.current = res.reps;
            }

            setStats({
              status: res.status,
              exercise: res.exercise || 'Unknown',
              reps: res.reps,
              feedback: displayFeedback,
              score: scoresData.overall,
              isPending: scoresData.isPending,
              accuracy: scoresData.accuracy,
              deductions: scoresData.deductions
            });

            if (displayFeedback) {
              setFeedbackMsg(displayFeedback);
              setIsWarning(warningFeedback);
            } else {
              setFeedbackMsg("");
              setIsWarning(false);
            }
          }
        }
      }
    }
    requestRef.current = requestAnimationFrame(predictWebcam);
  };

  // Rep completion effect
  useEffect(() => {
    if (!menu || isWorkoutComplete) return;
    if (processingCompletionRef.current) return;
    const currentTarget = menu.exercises[currentExerciseIndex];
    if (!currentTarget) {
      finishWorkout();
      return;
    }
    const currentRepsInSet = Math.max(0, stats.reps - repsOffset);
    const isMatchingExercise = normalizeExerciseKey(stats.exercise) === normalizeExerciseKey(currentTarget.name);
    if (isMatchingExercise && currentRepsInSet >= currentTarget.reps) {
      processingCompletionRef.current = true;
      const validScores = scoreBuffer.current.filter(s => s >= 0);
      const avgScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 100;
      const validAcc = accuracyBuffer.current;
      const avgAccuracy = validAcc.length > 0 ? Math.round(validAcc.reduce((a, b) => a + b, 0) / validAcc.length) : 100;
      const validDed = deductionsBuffer.current;
      const avgDeductions = validDed.length > 0 ? Math.round(validDed.reduce((a, b) => a + b, 0) / validDed.length) : 0;
      const frameCount = currentSetReps.current.length;
      const duration = frameCount > 0 ? currentSetReps.current[frameCount - 1].timestamp - currentSetReps.current[0].timestamp : 0;
      const nextExIdx = currentExerciseIndex + 1;
      const restTime = (currentTarget as any).rest_time_seconds || 0;

      const completedSet = {
        name: currentTarget.name,
        set: currentTarget.set_index || 1,
        reps: currentRepsInSet,
        weight: currentTarget.weight,
        score: avgScore,
        scoringDetails: { accuracy: avgAccuracy, deductions: avgDeductions },
        ui_summary: { total_frames: frameCount, duration_seconds: duration.toFixed(1) },
        repDetails: [...currentSetReps.current]
      };

      setResults(prev => [...prev, completedSet]);
      allCompletedSetsRef.current.push(completedSet);

      // Clear buffers
      scoreBuffer.current = [];
      accuracyBuffer.current = [];
      deductionsBuffer.current = [];
      repFeedbackBuffer.current = [];
      currentSetReps.current = [];
      lastRepCount.current = 0;

      if (nextExIdx >= menu.exercises.length) {
        finishWorkout();
      } else {
        setRepsOffset(0);
        setCurrentExerciseIndex(nextExIdx);
        if (harRef.current) harRef.current.resetParams();
        if (restTime > 0) {
          setIsResting(true);
          setRestTimer(restTime);
        }
      }
      setTimeout(() => { processingCompletionRef.current = false; }, 500);
    }
  }, [stats.reps, stats.exercise, menu, currentExerciseIndex, repsOffset]);

  const saveRecap = async (summary: any, poseStreamData: any[], hrSamples?: any[], hrSummary?: any) => {
    if (!user) return null;
    try {
      const response = await fetch(`${API_BASE}/api/recap/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          menuId: menu?.id || null,
          sessionSummary: summary,
          rawPoseData: poseStreamData,
          hrSamples: hrSamples || [],
          hrSummary: hrSummary || null
        })
      });
      const data = await response.json();
      if (data.id) currentRecapIdRef.current = data.id;
      return data;
    } catch (e) {
      console.error("Network Error during fetch:", e);
      return null;
    }
  };

  const finishWorkout = async () => {
    if (isWorkoutComplete) return;
    processingCompletionRef.current = false;
    setIsWorkoutComplete(true);
    setIsSaving(true);
    setIsPoseRecording(false);
    stopHrMonitoring();

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }

    const totalSessionTime = (Date.now() - sessionStartTime.current) / 1000;
    let finalResults = [...allCompletedSetsRef.current];
    const currentRepsInSet = Math.max(0, stats.reps - repsOffset);

    if (menu && menu.exercises && menu.exercises[currentExerciseIndex] && currentRepsInSet > 0) {
      const currentTarget = menu.exercises[currentExerciseIndex];
      const alreadyCompleted = allCompletedSetsRef.current.some(
        set => normalizeExerciseKey(set.name) === normalizeExerciseKey(currentTarget.name) && set.set === (currentTarget.set_index || 1)
      );
      if (!alreadyCompleted) {
        const validScores = scoreBuffer.current.filter(s => s >= 0);
        const avgScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 100;
        const validAcc = accuracyBuffer.current;
        const avgAccuracy = validAcc.length > 0 ? Math.round(validAcc.reduce((a, b) => a + b, 0) / validAcc.length) : 100;
        const validDed = deductionsBuffer.current;
        const avgDeductions = validDed.length > 0 ? Math.round(validDed.reduce((a, b) => a + b, 0) / validDed.length) : 0;
        const frameCount = currentSetReps.current.length;
        const duration = frameCount > 0 ? currentSetReps.current[frameCount - 1].timestamp - currentSetReps.current[0].timestamp : 0;
        const partialSet = {
          name: currentTarget.name,
          set: currentTarget.set_index || 1,
          reps: currentRepsInSet,
          weight: currentTarget.weight,
          score: avgScore,
          scoringDetails: { accuracy: avgAccuracy, deductions: avgDeductions },
          ui_summary: { total_frames: frameCount, duration_seconds: duration.toFixed(1) },
          repDetails: [...currentSetReps.current]
        };
        finalResults.push(partialSet);
        setResults(prev => [...prev, partialSet]);
      }
    }

    const lightweightSummaryExercises = finalResults.map(ex => {
      const correctCount = Math.round((ex.score / 100) * ex.reps);
      const improveCount = Math.max(0, ex.reps - correctCount);
      const jointHistory: Record<string, number[]> = {};
      if (ex.repDetails) {
        ex.repDetails.forEach((frame: any) => {
          if (frame.angles) {
            Object.entries(frame.angles).forEach(([joint, angle]) => {
              const val = Number(angle);
              if (!isNaN(val) && val > 0) {
                if (!jointHistory[joint]) jointHistory[joint] = [];
                jointHistory[joint].push(val);
              }
            });
          }
        });
      }
      const jointStats: any[] = [];
      Object.entries(jointHistory).forEach(([joint, activeAngles]) => {
        if (activeAngles.length > 0) {
          const minAngle = Math.round(Math.min(...activeAngles));
          const maxAngle = Math.round(Math.max(...activeAngles));
          if (maxAngle - minAngle > 5) {
            const midPoint = minAngle + (maxAngle - minAngle) / 2;
            const upAngles = activeAngles.filter(a => a >= midPoint);
            const downAngles = activeAngles.filter(a => a < midPoint);
            const avgUpAngle = upAngles.length > 0 ? Math.round(upAngles.reduce((a, b) => a + b, 0) / upAngles.length) : maxAngle;
            const avgDownAngle = downAngles.length > 0 ? Math.round(downAngles.reduce((a, b) => a + b, 0) / downAngles.length) : minAngle;
            const parts = joint.split('_');
            let side = parts[1] === 'l' ? 'Left' : parts[1] === 'r' ? 'Right' : '';
            const prettyName = `${side} ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}`.trim();
            jointStats.push({ name: prettyName, min: minAngle, max: maxAngle, avgUp: avgUpAngle, avgDown: avgDownAngle });
          }
        }
      });
      return {
        exerciseName: ex.name,
        repsDone: ex.reps,
        correctReps: correctCount,
        repsImprovement: improveCount,
        weight: ex.weight,
        score: ex.score,
        ui_summary: ex.ui_summary,
        precalculatedMetrics: {
          avgScore: ex.score,
          avgAccuracy: ex.scoringDetails?.accuracy || ex.score,
          avgDeductions: ex.scoringDetails?.deductions || 0,
          jointStats: jointStats
        }
      };
    });

    const formattedRawPoseData = finalResults.map(ex => {
      const formattedFrames = ex.repDetails.map((frame: any) => {
        const allJointNames = Array.from(new Set([...Object.keys(frame.positions || {}), ...Object.keys(frame.angles || {})]));
        const keypointsArray = allJointNames.map(joint => ({
          name: joint,
          angle: frame.angles[joint] !== undefined ? frame.angles[joint] : null,
          position: frame.positions[joint] || { x: null, y: null, z: null }
        }));
        return { timestamp: frame.timestamp, keypoints: keypointsArray };
      });
      return { exerciseName: ex.name, repetitions: [{ repNumber: ex.set || 1, frames: formattedFrames }] };
    });

    // Compute HR summary from raw samples
    let hrSummary: { avg: number; max: number; min: number; sampleCount: number } | null = null;
    let hrSamples: { timestamp: number; bpm: number }[] = [];

    if (hrSamplesRawRef.current.length > 0) {
      hrSamples = hrSamplesRawRef.current;
      const bpmList = hrSamples.map(s => s.bpm);
      const avg = Math.round(bpmList.reduce((a, b) => a + b, 0) / bpmList.length);
      const max = Math.max(...bpmList);
      const min = Math.min(...bpmList);
      hrSummary = { avg, max, min, sampleCount: bpmList.length };
    }

    try {
      const roundedSessionTime = Math.round(totalSessionTime);
      const savedSession = await saveRecap({
        completed: true,
        session_duration: roundedSessionTime,
        exercises: lightweightSummaryExercises,
        timestamp: new Date().toISOString()
      }, formattedRawPoseData, hrSamples, hrSummary);

      if (savedSession && savedSession.id) {
        setSavedRecapId(savedSession.id);
        currentRecapIdRef.current = savedSession.id;
        if (menu?.id && menu.id !== 'free-mode') {
          const completedMenus = JSON.parse(localStorage.getItem('straps_completed_menus') || '[]');
          if (!completedMenus.includes(menu.id)) {
            completedMenus.push(menu.id);
            localStorage.setItem('straps_completed_menus', JSON.stringify(completedMenus));
          }
        }
        localStorage.removeItem('straps_free_mode_menu');
      }
    } catch (e) {
      console.error("Critical Error saving session:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { letter: 'S', color: 'text-purple-400', label: 'Elite' };
    if (score >= 75) return { letter: 'A', color: 'text-green-400', label: 'Good' };
    if (score >= 60) return { letter: 'B', color: 'text-yellow-400', label: 'Fair' };
    return { letter: 'C', color: 'text-red-400', label: 'Needs Work' };
  };

  if (isWorkoutComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }} />
        <div className="max-w-2xl w-full bg-zinc-950/80 backdrop-blur-sm rounded-3xl border border-zinc-800 p-8 shadow-2xl relative overflow-hidden z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"></div>
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold tracking-widest uppercase mb-4 border border-green-500/20">Session Complete</div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">TRAINING RECAP</h1>
            <p className="text-zinc-500 text-sm">Excellent work. Here is your performance breakdown.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 text-center">
              <div className="text-3xl font-black text-white">{results.length}</div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Sets Completed</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 text-center">
              <div className="text-3xl font-black text-blue-500">{results.reduce((a, b) => a + b.reps, 0)}</div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Total Reps</div>
            </div>
          </div>
          {savedRecapId && (
            <div className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-2xl mb-8 flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">AI Session Analysis</div>
                {!aiSummary && (
                  <button onClick={generateAISummary} disabled={isGeneratingLLM} className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-bold uppercase disabled:opacity-50 transition-colors">
                    {isGeneratingLLM ? 'Analyzing...' : 'Generate with AI'}
                  </button>
                )}
              </div>
              <div className="text-sm text-zinc-300 italic whitespace-pre-wrap leading-relaxed">
                {aiSummary || 'No AI analysis generated yet. Click generate above to analyze your spatio-temporal data.'}
              </div>
            </div>
          )}
          <div className="bg-zinc-900/30 rounded-2xl border border-zinc-800 overflow-hidden mb-8 max-h-[40vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Exercise</th>
                  <th className="px-4 py-3 text-center font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Set</th>
                  <th className="px-4 py-3 text-center font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Load</th>
                  <th className="px-4 py-3 text-right font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Form Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {results.map((res, i) => {
                  const grade = getGrade(res.score);
                  const isExpanded = expandedSet === i;
                  return (
                    <React.Fragment key={i}>
                      <tr onClick={() => setExpandedSet(isExpanded ? null : i)} className="hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                          {isExpanded ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                          {formatExerciseName(res.name)}
                          <span className="text-[8px] bg-zinc-800 px-1.5 py-0.5 rounded-full text-zinc-400">{getExerciseCategory(res.name)}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-zinc-400 font-mono">#{res.set}</td>
                        <td className="px-4 py-3 text-center text-zinc-400">{res.reps}x <span className="text-zinc-600">@</span> {res.weight}kg</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-black ${grade.color}`}>{grade.label}</span>
                              <span className="text-[10px] text-zinc-600 font-mono">Avg: {res.score.toFixed(1)}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-zinc-900/50">
                          <td colSpan={4} className="px-4 py-4">
                            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2">
                              <ActivityIcon className="w-6 h-6 text-blue-500 mb-1" />
                              <div className="text-sm font-bold text-white tracking-wide">Spatio-Temporal Data Captured</div>
                              <div className="text-xs text-zinc-500 font-mono">{res.ui_summary?.total_frames || res.repDetails?.length || 0} continuous frames recorded at 10 FPS</div>
                              <div className="text-[10px] text-zinc-600 mt-2 uppercase tracking-widest">Ready for 3D trajectory analysis</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4">
            <Link href="/client" className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors text-center text-sm shadow-lg">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentTarget = menu?.exercises?.[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 font-sans flex flex-col md:flex-row gap-4 md:gap-6 relative overflow-hidden selection:bg-blue-500/30">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }} />

      {/* Left Panel – Exercise list */}
      <div className="w-full md:w-80 bg-zinc-950/80 backdrop-blur-sm rounded-3xl border border-zinc-800 shadow-sm p-4 md:p-6 flex flex-col h-auto md:h-[calc(100vh-3rem)] overflow-y-auto relative z-10">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Link href="/client" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <div>
            <h2 className="font-bold text-lg text-white">Today's Protocol</h2>
            <div className="text-xs text-zinc-500 font-medium">{menu ? "Session Active" : "Select Program"}</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {showMenuPicker && !menu ? (
            <div className="space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Assigned Programs</div>
              {availableMenus.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 italic text-xs">No programs assigned.</div>
              ) : (
                availableMenus.map((m: any) => (
                  <button key={m.id} onClick={() => selectMenu(m.id)} className="w-full p-4 bg-zinc-900 hover:bg-blue-900/30 border border-zinc-800 hover:border-blue-500 rounded-2xl text-left transition-all group">
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors text-sm">{m.name || `Program #${m.id.substring(0, 6).toUpperCase()}`}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{m.exercises?.length || 0} exercises</div>
                  </button>
                ))
              )}
            </div>
          ) : (
            menu?.exercises?.map((ex: any, idx: number) => {
              const isCurrent = idx === currentExerciseIndex;
              const isCompleted = idx < currentExerciseIndex;
              const exerciseKey = ex.name;
              return (
                <div key={idx} className={`p-4 rounded-2xl border transition-all ${isCurrent ? 'bg-blue-600 border-blue-500 shadow-lg scale-100 text-white' : isCompleted ? 'bg-zinc-900/50 border-zinc-800 opacity-50' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Set {ex.set_index || 1}</div>
                      <div className="font-bold text-base md:text-lg mb-2 leading-tight flex items-center gap-2">
                        {formatExerciseName(ex.name)}
                        <span className="text-[8px] bg-zinc-800/50 px-1.5 py-0.5 rounded-full text-zinc-300">{getExerciseCategory(ex.name)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className={isCurrent ? "text-blue-100" : "text-zinc-500"}>Target: {ex.reps} reps</span>
                        <span className={isCurrent ? "text-blue-100" : "text-zinc-500"}>{ex.weight} kg</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (exerciseKey) {
                          showGif(exerciseKey, false);
                        }
                      }}
                      className="ml-3 p-3 rounded-full bg-zinc-800/50 hover:bg-white/20 transition-colors border border-zinc-700"
                      title="Show exercise animation"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Center Panel – Video Feed */}
      <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col z-10">
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-start justify-between gap-2 z-10">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-zinc-800 text-white">
            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Active Movement</div>
            <div className="font-bold tracking-wide flex items-center gap-2 text-sm md:text-base">
              {formatExerciseName(stats.exercise)}
              {stats.exercise && <span className="text-[8px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-300">{getExerciseCategory(stats.exercise)}</span>}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {heartRate > 0 && (
              <div className="bg-black/60 backdrop-blur-md px-2 py-1.5 md:px-3 md:py-2 rounded-xl border border-red-500 flex items-center gap-1 md:gap-2">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="font-mono font-bold text-white text-sm">{heartRate}</span>
                <span className="text-[10px] text-red-300 hidden sm:inline">BPM</span>
              </div>
            )}
            {!isHrConnected && heartRate === 0 && (
              <button onClick={connectHeartRateMonitor} className="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 md:gap-2">
                <Heart className="w-4 h-4" /> <span className="hidden sm:inline">Connect HR</span>
              </button>
            )}
            {!isStarted && !isLoading && menu && (
              <button onClick={() => { setIsStarted(true); sessionStartTime.current = Date.now(); }} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 md:px-8 md:py-3 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
                <PlayCircle className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Start Tracking</span>
              </button>
            )}
          </div>
        </div>

        {isResting && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white">
            <div className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-4">Rest Period</div>
            <div className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter mb-8">{restTimer}s</div>
            <button onClick={() => setIsResting(false)} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-bold uppercase tracking-widest transition-colors">Skip Rest</button>
          </div>
        )}

        {feedbackMsg && isStarted && !isResting && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
            <div className={`p-3 md:p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center justify-center text-center ${isWarning ? 'bg-red-900/80 border-red-500 text-white' : 'bg-green-900/80 border-green-500 text-white'}`}>
              <span className="font-bold text-sm md:text-lg">{feedbackMsg}</span>
            </div>
          </div>
        )}

        <div className="flex-1 relative bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
              <div className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-widest">Warming up AI Engine...</div>
            </div>
          )}
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-contain -scale-x-100 opacity-60" playsInline muted />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />
        </div>
      </div>

      {/* Right Panel – Stats and Score */}
      <div className="w-full md:w-80 flex flex-col gap-4 relative z-10 h-auto md:h-[calc(100vh-3rem)]">
        <div className="bg-zinc-950/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-zinc-800 shadow-sm text-center flex flex-col justify-center shrink-0">
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Current Reps</div>
          <div className="text-5xl md:text-7xl font-black text-blue-500 tracking-tighter leading-none mb-2">{Math.max(0, stats.reps - repsOffset)}</div>
          {currentTarget && <div className="text-zinc-400 font-bold uppercase tracking-widest text-xs md:text-sm">/ {currentTarget.reps} Target</div>}
        </div>

        <div className="bg-zinc-950/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-zinc-800 shadow-sm flex-1 flex flex-col min-h-0">
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 text-center">Live Form Analysis</div>
          {stats.isPending ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 opacity-70">
              <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mb-4 animate-pulse" />
              <div className="text-zinc-300 font-bold uppercase tracking-widest text-xs md:text-sm text-center">Score Pending</div>
              <div className="text-zinc-500 text-[10px] mt-2 uppercase tracking-widest text-center px-4">{stats.feedback || "Adjust Orientation to Begin"}</div>
            </div>
          ) : (
            (() => {
              const grade = getGrade(stats.score);
              return (
                <>
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <div className="relative flex items-center justify-center">
                      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full absolute animate-ping opacity-20 ${grade.color.replace('text-', 'bg-')}`}></div>
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center z-10 bg-zinc-900 shadow-xl ${grade.color.replace('text-', 'border-')} ${grade.color}`}>
                        <span className="text-xl md:text-2xl font-black">{grade.letter}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-3 md:p-4 overflow-hidden shrink-0">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold">Assessment</span><br />
                        <span className={`text-base md:text-lg uppercase font-black mt-1 ${grade.color}`}>{grade.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-black tabular-nums leading-none text-white tracking-tighter">{stats.score}</div>
                        <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold">Form Score</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 flex mt-auto rounded-full overflow-hidden mb-2">
                      <div className={`h-full transition-all duration-500 ${grade.color.replace('text-', 'bg-')}`} style={{ width: `${stats.score}%` }}></div>
                    </div>
                    {stats.deductions > 0 && (
                      <div className="text-[10px] text-red-400 font-bold text-right tracking-wide uppercase">-{stats.deductions} Pts Form Penalty</div>
                    )}
                  </div>
                </>
              );
            })()
          )}
        </div>

        {isStarted && (
          <button onClick={() => { if (window.confirm("Finish this session?")) finishWorkout(); }} disabled={isSaving} className="w-full shrink-0 group px-4 py-3 md:px-6 md:py-4 bg-zinc-950/80 hover:bg-red-900/40 border border-zinc-800 hover:border-red-500 rounded-3xl transition-all flex items-center justify-between backdrop-blur-sm shadow-sm disabled:opacity-50">
            <div className="text-left">
              <p className="text-[10px] font-bold text-zinc-500 group-hover:text-red-300 uppercase tracking-widest">End Session</p>
              <p className="text-xs md:text-sm font-black text-white group-hover:text-red-100">FINISH WORKOUT</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-zinc-900 group-hover:bg-red-500 flex items-center justify-center transition-colors">
              <RefreshCcw size={16} className="text-zinc-500 group-hover:text-white md:w-[18px] md:h-[18px]" />
            </div>
          </button>
        )}
      </div>

      {/* GIF Modal */}
      {gifVisible && gifUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-3xl w-full mx-4 bg-zinc-950 rounded-2xl border border-zinc-700 overflow-hidden shadow-2xl">
            <div className="p-4 flex justify-between items-center border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white">Exercise Animation</h3>
              <button
                onClick={closeGif}
                disabled={gifCloseLockRemaining > 0}
                className={`p-2 rounded-full transition-colors ${
                  gifCloseLockRemaining > 0
                    ? 'text-zinc-600 cursor-not-allowed'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
                title={gifCloseLockRemaining > 0 ? `Wait ${gifCloseLockRemaining}s` : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex justify-center">
              <img
                src={gifUrl}
                alt="Exercise demonstration"
                className="max-w-full max-h-[70vh] rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent && !parent.querySelector('.gif-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'gif-fallback text-center text-zinc-400 p-8';
                    fallback.innerText = 'Animation not available for this exercise.';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            {gifCloseLockRemaining > 0 && (
              <div className="p-4 text-center text-sm text-blue-400 border-t border-zinc-800">
                Close available in {gifCloseLockRemaining} seconds
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}