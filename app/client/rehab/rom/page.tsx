'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { ArrowLeft, Move, RefreshCcw, Heart, RotateCcw } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { calculateAngle } from '@/lib/pose/MathUtils';

type Joint = 'shoulder' | 'elbow' | 'hip' | 'knee' | 'ankle';
type Side = 'left' | 'right';

interface ROMData {
  current: number;
  min: number;
  max: number;
}

export default function ROMAnalysisPage() {
  const router = useRouter();
  const { user } = useAuth(); // get authenticated user
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fps, setFps] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [romData, setRomData] = useState<Record<Joint, Record<Side, ROMData>>>({
    shoulder: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
    elbow: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
    hip: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
    knee: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
    ankle: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
  });
  
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  
  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1
        });
        landmarkerRef.current = landmarker;
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsLoading(false);
          requestRef.current = requestAnimationFrame(predictWebcam);
        }
      } catch (err) {
        console.error("Init error:", err);
        setIsLoading(false);
      }
    }
    init();
    return () => {
      isMounted = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);
  
  const resetROM = () => {
    setRomData({
      shoulder: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
      elbow: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
      hip: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
      knee: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
      ankle: { left: { current: 0, min: 180, max: 0 }, right: { current: 0, min: 180, max: 0 } },
    });
  };
  
  const updateROM = (joint: Joint, side: Side, angle: number) => {
    setRomData(prev => {
      const current = prev[joint][side];
      return {
        ...prev,
        [joint]: {
          ...prev[joint],
          [side]: {
            current: angle,
            min: Math.min(current.min, angle),
            max: Math.max(current.max, angle),
          }
        }
      };
    });
  };
  
  const predictWebcam = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;
    
    if (video && canvas && landmarker) {
      const startTimeMs = performance.now();
      if (video.videoWidth > 0 && video.videoHeight > 0) {
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
          
          if (result.landmarks && result.landmarks.length > 0) {
            const lm = result.landmarks[0];
            for (const conn of PoseLandmarker.POSE_CONNECTIONS) {
              const p1 = lm[conn.start];
              const p2 = lm[conn.end];
              if (p1 && p2 && p1.visibility > 0.5 && p2.visibility > 0.5) {
                ctx.beginPath();
                ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
                ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 3;
                ctx.stroke();
              }
            }
            
            const w = canvas.width, h = canvas.height;
            
            const leftShoulder = { x: lm[11].x * w, y: lm[11].y * h };
            const leftElbow = { x: lm[13].x * w, y: lm[13].y * h };
            const leftWrist = { x: lm[15].x * w, y: lm[15].y * h };
            const leftHip = { x: lm[23].x * w, y: lm[23].y * h };
            const leftKnee = { x: lm[25].x * w, y: lm[25].y * h };
            const leftAnkle = { x: lm[27].x * w, y: lm[27].y * h };
            
            const rightShoulder = { x: lm[12].x * w, y: lm[12].y * h };
            const rightElbow = { x: lm[14].x * w, y: lm[14].y * h };
            const rightWrist = { x: lm[16].x * w, y: lm[16].y * h };
            const rightHip = { x: lm[24].x * w, y: lm[24].y * h };
            const rightKnee = { x: lm[26].x * w, y: lm[26].y * h };
            const rightAnkle = { x: lm[28].x * w, y: lm[28].y * h };
            
            const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
            const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
            const leftShoulderAngle = calculateAngle(leftShoulder, leftHip, leftElbow);
            const rightShoulderAngle = calculateAngle(rightShoulder, rightHip, rightElbow);
            const leftHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
            const rightHipAngle = calculateAngle(rightShoulder, rightHip, rightKnee);
            const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
            const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
            const leftAnkleAngle = calculateAngle(leftKnee, leftAnkle, { x: lm[29].x * w, y: lm[29].y * h });
            const rightAnkleAngle = calculateAngle(rightKnee, rightAnkle, { x: lm[30].x * w, y: lm[30].y * h });
            
            updateROM('shoulder', 'left', leftShoulderAngle);
            updateROM('shoulder', 'right', rightShoulderAngle);
            updateROM('elbow', 'left', leftElbowAngle);
            updateROM('elbow', 'right', rightElbowAngle);
            updateROM('hip', 'left', leftHipAngle);
            updateROM('hip', 'right', rightHipAngle);
            updateROM('knee', 'left', leftKneeAngle);
            updateROM('knee', 'right', rightKneeAngle);
            updateROM('ankle', 'left', leftAnkleAngle);
            updateROM('ankle', 'right', rightAnkleAngle);
            
            frameCountRef.current++;
            if (performance.now() - lastFrameTimeRef.current >= 1000) {
              setFps(frameCountRef.current);
              frameCountRef.current = 0;
              lastFrameTimeRef.current = performance.now();
            }
          }
          ctx.restore();
        }
      }
    }
    requestRef.current = requestAnimationFrame(predictWebcam);
  };
  
  const saveSession = async () => {
    if (!isRecording) return;
    setIsRecording(false);
    if (!user?.id) {
      alert("User not authenticated");
      return;
    }
    
    // Prepare summary for quick display (optional)
    const romSummary: Record<string, any> = {};
    for (const [joint, sides] of Object.entries(romData)) {
      romSummary[joint] = {
        left: { min: (sides as any).left.min, max: (sides as any).left.max },
        right: { min: (sides as any).right.min, max: (sides as any).right.max }
      };
    }
    
    try {
      const res = await fetch('/api/recap/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          romData: romData,           // full data
          romSummary: romSummary      // simplified
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('ROM session saved successfully!');
      } else {
        alert('Failed to save ROM session: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Save failed', err);
      alert('Network error while saving session');
    }
  };
  
  const startRecording = () => {
    resetROM();
    setIsRecording(true);
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-green-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(34, 197, 94, 0.08) 10px, rgba(34, 197, 94, 0.08) 20px)' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Move className="w-6 h-6 text-green-500" />
                Range of Motion (ROM) Analysis
              </h1>
              <p className="text-zinc-400 text-sm">Move each joint to measure your active range of motion</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={resetROM} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Reset ROM
            </button>
            {!isRecording ? (
              <button onClick={startRecording} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold">
                Start Recording
              </button>
            ) : (
              <button onClick={saveSession} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold">
                Stop & Save
              </button>
            )}
          </div>
        </div>
        
        {/* Single column – only video feed */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <RefreshCcw className="w-8 h-8 text-green-500 animate-spin" />
            </div>
          )}
          <video ref={videoRef} className="w-full h-auto -scale-x-100" playsInline muted />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -scale-x-100" />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-zinc-400">
            FPS: {fps}
          </div>
          {isRecording && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              🔴 RECORDING
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center text-xs text-zinc-600">
          <Heart className="w-3 h-3 inline mr-1 text-green-500" />
          Perform each movement slowly to capture full range. The system records minimum and maximum angles achieved.
        </div>
      </div>
    </div>
  );
}