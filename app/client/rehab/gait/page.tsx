'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { ArrowLeft, Activity, Camera, RefreshCcw, Heart } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { GaitAnalyzer, ViewType, GaitMetrics } from '@/lib/rehab/gaitAnalyzer';

export default function GaitAnalysisPage() {
  const router = useRouter();
  const { user } = useAuth(); // get authenticated user
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState<ViewType>('side');
  const [metrics, setMetrics] = useState<GaitMetrics | null>(null);
  const [fps, setFps] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);
  const analyzerRef = useRef<GaitAnalyzer>(new GaitAnalyzer('side', 170));
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
  
  useEffect(() => {
    if (analyzerRef.current) {
      analyzerRef.current.setViewType(viewType);
      analyzerRef.current.reset();
    }
  }, [viewType]);
  
  const predictWebcam = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;
    const analyzer = analyzerRef.current;
    
    if (video && canvas && landmarker && analyzer) {
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
            const landmarks = result.landmarks[0];
            for (const conn of PoseLandmarker.POSE_CONNECTIONS) {
              const p1 = landmarks[conn.start];
              const p2 = landmarks[conn.end];
              if (p1 && p2 && p1.visibility > 0.5 && p2.visibility > 0.5) {
                ctx.beginPath();
                ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
                ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 3;
                ctx.stroke();
              }
            }
            
            const now = performance.now();
            const gaitMetrics = analyzer.update(landmarks, canvas.width, canvas.height, now);
            (gaitMetrics as any).dgiGaitScore = analyzer.getDgiScore();
            setMetrics(gaitMetrics);
            
            frameCountRef.current++;
            if (now - lastFrameTimeRef.current >= 1000) {
              setFps(frameCountRef.current);
              frameCountRef.current = 0;
              lastFrameTimeRef.current = now;
            }
          }
          ctx.restore();
        }
      }
    }
    requestRef.current = requestAnimationFrame(predictWebcam);
  };
  
  const startRecording = () => {
    setIsRecording(true);
    analyzerRef.current.reset();
  };
  
  const stopRecording = async () => {
    if (!isRecording) return;
    setIsRecording(false);
    if (!metrics || !user?.id) {
      alert("Missing user or metrics data");
      return;
    }
    try {
      // Prepare data for the unified /api/recap/session endpoint
      const gaitSummary = {
        stepCount: metrics.stepCount,
        leftSteps: metrics.leftSteps,
        rightSteps: metrics.rightSteps,
        cadence: metrics.cadence,
        stepLengthCm: metrics.stepLengthCm,
        velocityMs: metrics.velocityMs,
        totalDistanceM: metrics.distanceM,
        symmetryIndex: metrics.symmetryIndex,
        stabilityScore: metrics.stabilityScore,
        dgiGaitScore: (metrics as any).dgiGaitScore,
        viewType: viewType
      };
      
      const res = await fetch('/api/recap/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          // No menuId, sessionSummary, rawPoseData, hr data for this rehab session
          gaitData: metrics,        // full raw metrics
          gaitSummary: gaitSummary  // simplified summary for quick display
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Gait session saved successfully!');
      } else {
        alert('Failed to save gait session: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Save failed', err);
      alert('Network error while saving session');
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }} />
      
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
                <Activity className="w-6 h-6 text-blue-500" />
                Real‑Time Gait Analysis
              </h1>
              <p className="text-zinc-400 text-sm">Stand in front of the camera and walk naturally</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setViewType('side')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewType === 'side' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              Side View
            </button>
            <button
              onClick={() => setViewType('rear')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewType === 'rear' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              Rear View
            </button>
            {!isRecording ? (
              <button onClick={startRecording} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold">
                Start Recording
              </button>
            ) : (
              <button onClick={stopRecording} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold">
                Stop & Save
              </button>
            )}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}
            <video ref={videoRef} className="w-full h-auto -scale-x-100" playsInline muted />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -scale-x-100" />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-zinc-400">
              FPS: {fps}
            </div>
          </div>
          
          <div className="bg-zinc-950/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-5 space-y-4 max-h-[600px] overflow-y-auto">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-500" />
              Live Metrics
            </h3>
            {metrics ? (
              <div className="space-y-4">
                {viewType === 'side' ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <MetricCard label="Step Count" value={metrics.stepCount?.toString() || '0'} />
                      <MetricCard label="Cadence" value={metrics.cadence?.toFixed(1) + ' spm' || '-'} />
                      <MetricCard label="Step Length" value={metrics.stepLengthCm?.toFixed(1) + ' cm' || '-'} />
                      <MetricCard label="Velocity" value={metrics.velocityMs?.toFixed(2) + ' m/s' || '-'} />
                      <MetricCard label="Distance" value={metrics.distanceM?.toFixed(2) + ' m' || '-'} />
                      <MetricCard label="L/R Steps" value={`${metrics.leftSteps || 0} / ${metrics.rightSteps || 0}`} />
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl">
                      <p className="text-xs text-zinc-500 mb-1">Knee Angles (L/R)</p>
                      <p className="text-lg font-mono text-blue-400">
                        {metrics.kneeAngleL?.toFixed(0) || '—'}° / {metrics.kneeAngleR?.toFixed(0) || '—'}°
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <MetricCard label="Step Width" value={metrics.stepWidthCm?.toFixed(1) + ' cm' || '-'} />
                      <MetricCard label="Norm. Base" value={metrics.normalizedBaseSupport?.toFixed(3) || '-'} />
                      <MetricCard label="Symmetry" value={metrics.symmetryIndex?.toFixed(1) + '%' || '-'} />
                      <MetricCard label="Lateral Sway" value={metrics.lateralSwayCm?.toFixed(2) + ' cm' || '-'} />
                      <MetricCard label="Trunk Sway" value={metrics.trunkSwayCm?.toFixed(2) + ' cm' || '-'} />
                      <MetricCard label="Stability" value={metrics.stabilityScore?.toFixed(0) + '/100' || '-'} />
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl">
                      <p className="text-xs text-zinc-500 mb-1">Shoulder / Pelvic</p>
                      <p className="text-sm font-mono">
                        {metrics.shoulderAlignmentDeg?.toFixed(1) || '—'}° / {metrics.pelvicObliquityDeg?.toFixed(1) || '—'}°
                      </p>
                    </div>
                  </>
                )}
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-3 border border-blue-500/30">
                  <p className="text-xs text-zinc-400">DGI Gait Score</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {(metrics as any).dgiGaitScore?.toFixed(1) || '—'} <span className="text-sm text-zinc-500">/ 3</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-zinc-500 py-12">Waiting for pose detection...</div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-zinc-600">
          <Heart className="w-3 h-3 inline mr-1 text-blue-500" />
          Real‑time analysis uses MediaPipe Pose – works entirely in your browser. No video is uploaded.
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-3 text-center">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-white mt-1">{value}</p>
    </div>
  );
}