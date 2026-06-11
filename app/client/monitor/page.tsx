'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HARCore } from '@/lib/pose/HARCore';
// Import from the official tasks-vision package
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { ArrowLeft, Activity, ShieldAlert, Ban, CheckCircle, Edit3, Trash2, MousePointerClick, BellRing } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Added Router Import

import { AuthProvider, useAuth } from '@/lib/auth';

export default function MonitorPageWrap() {
    return (
        <AuthProvider>
            <MonitorPage />
        </AuthProvider>
    );
}

function MonitorPage() {
    const router = useRouter(); // <-- Initialized Router
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // State
    const [stats, setStats] = useState({ status: 'Initializing...', confidence: 0 });

    // Safety Zone State (Normalized 0-1)
    const [safetyZone, setSafetyZone] = useState<{x: number, y: number, w: number, h: number} | null>(null);
    const [isEditingZone, setIsEditingZone] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<{x: number, y: number} | null>(null);
    const zoneRef = useRef<{x: number, y: number, w: number, h: number} | null>(null);

    // Alarm State
    const [alarmTriggered, setAlarmTriggered] = useState(false);
    const fallStartTimeRef = useRef<number | null>(null);
    const [timeToAlarm, setTimeToAlarm] = useState<number | null>(null);

    // Sync ref for loop access
    useEffect(() => {
        zoneRef.current = safetyZone;
    }, [safetyZone]);

    // Refs
    const harRef = useRef<HARCore | null>(null);
    const landmarkerRef = useRef<PoseLandmarker | null>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function init() {
            try {
                // 1. Init Core
                const core = new HARCore();
                harRef.current = core;

                // 2. Init Vision
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

                // 3. Init Camera
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: 640, height: 480 }
                    });
                    
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        await videoRef.current.play();
                        
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
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
            }
        };
    }, []);

    // Logging
    const { user } = useAuth();
    const userRef = useRef(user);
    
    // Keep userRef synced
    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const lastLogRef = useRef(Date.now());
    const alarmLoggedRef = useRef(false);

    const sendLog = async (data: any) => {
        if (!userRef.current) return;
        try {
            await fetch('/api/logs', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-user-id': userRef.current.id 
                },
                body: JSON.stringify(data)
            });
        } catch (e) { console.error("Log failed", e); }
    };

    // Loop
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
                
                const result = landmarker.detectForVideo(video, startTimeMs);
                
                // Draw
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.save();
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Mirror
                    ctx.scale(-1, 1);
                    ctx.translate(-canvas.width, 0);

                    // Draw Video Frame
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    if (result.landmarks) {
                        const drawingUtils = new DrawingUtils(ctx);
                        for (const lm of result.landmarks) {
                            drawingUtils.drawLandmarks(lm, { radius: 1, color: '#00FF00' });
                            drawingUtils.drawConnectors(lm, PoseLandmarker.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
                        }
                    }
                    ctx.restore();
                }

                // Process Logic
                if (result.landmarks && result.landmarks.length > 0) {
                     const lm = result.landmarks[0];
                     
                     // 1. Run HAR first (Always detect status)
                     const res = await har.process(lm as any);
                     
                     if (res) {
                        // 2. Check Safety Zone
                        let isUnsafe = false;
                        if (zoneRef.current) {
                             const z = zoneRef.current;
                             const inZone = (p: {x:number, y:number}) => 
                                p.x >= z.x && p.x <= (z.x + z.w) &&
                                p.y >= z.y && p.y <= (z.y + z.h);

                             let outsideCount = 0;
                             for (const point of lm) {
                                  // Convert to Screen Coords (Mirrored)
                                  const screenPoint = { x: 1 - point.x, y: point.y };
                                  if (!inZone(screenPoint)) {
                                      outsideCount++;
                                  }
                             }

                             // Threshold: > 70% of points outside triggers Unsafe
                             if ((outsideCount / lm.length) > 0.7) {
                                 isUnsafe = true;
                             }
                        }

                        // Update Status
                        setStats({
                            status: res.status,
                            confidence: res.confidence || 0
                        });
                        
                        // 3. Check Alarm Condition
                        let currentAlarmState = false;
                        if (res.status === 'Fall Detected' && isUnsafe) {
                            const now = Date.now();
                            if (!fallStartTimeRef.current) {
                                fallStartTimeRef.current = now;
                            }
                            
                            const elapsed = now - fallStartTimeRef.current;
                            if (elapsed > 10000) {
                                // Trigger Alarm
                                setAlarmTriggered(true);
                                currentAlarmState = true;
                            } else {
                                // Update countdown for UI
                                setTimeToAlarm(Math.ceil((10000 - elapsed) / 1000));
                            }
                        } else {
                            // Reset
                            fallStartTimeRef.current = null;
                            setTimeToAlarm(null);
                        }

                        // 4. Logging Logic
                        const now = Date.now();
                        
                        // A. Check for Alarm Log (Immediate)
                        // If alarm just triggered (transition) or is buzzing
                        if (currentAlarmState && !alarmLoggedRef.current) {
                            sendLog({
                                status: 'ALARM: Fall Outside Zone',
                                confidence: '1.0',
                                details: { reason: 'Fall detected outside safe zone > 10s' }
                            });
                            alarmLoggedRef.current = true; // Prevent spamming per frame
                        }
                        
                        // B. Periodic Log (Every 1 min)
                        if (now - lastLogRef.current > 60000) {
                            sendLog({
                                status: res.status,
                                confidence: String(res.confidence),
                                details: { isUnsafe, zoneConfigured: !!zoneRef.current }
                            });
                            lastLogRef.current = now;
                        }
                     }
                }
            }
        }
        requestRef.current = requestAnimationFrame(predictWebcam);
    };

    // Drawing Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isEditingZone || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setIsDrawing(true);
        setStartPoint({x, y});
        setSafetyZone({x, y, w: 0, h: 0});
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing || !startPoint || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const currentX = (e.clientX - rect.left) / rect.width;
        const currentY = (e.clientY - rect.top) / rect.height;
        const w = Math.abs(currentX - startPoint.x);
        const h = Math.abs(currentY - startPoint.y);
        const x = Math.min(currentX, startPoint.x);
        const y = Math.min(currentY, startPoint.y);
        setSafetyZone({x, y, w, h});
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Smart Exit Function <-- Added This
    const handleExit = async () => {
        // Force a final save log before leaving
        await sendLog({
            status: 'Session Ended',
            confidence: '1.0',
            details: { event: 'User safely exited live monitoring' }
        });

        // Manually kill the camera & AI loop so Next.js doesn't freeze
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        }

        // Route safely back to the previous page
        router.back(); 
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-blue-500/30 relative overflow-hidden">
            {/* Subtle Blue Stripes Background */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-20" 
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }}
            />
            
            <div className="relative z-10 max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        {/* Replaced Link with smart Exit button */}
                        <button onClick={handleExit} className="p-2 z-50 relative bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800 cursor-pointer">
                            <ArrowLeft className="w-5 h-5 text-zinc-400" />
                        </button>
                        <h1 className="text-3xl font-light tracking-widest text-zinc-100">LIVE<span className="font-bold text-blue-500">.MONITOR</span></h1>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest">
                        <Activity className="w-4 h-4 animate-pulse text-green-500" /> System Active
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Main Camera View */}
                    <div className="md:col-span-3 bg-zinc-950/80 backdrop-blur-sm p-6 rounded-3xl border border-zinc-800 shadow-xl relative flex flex-col">
                        <div 
                            className={`w-full aspect-video bg-black rounded-2xl relative overflow-hidden border ${isEditingZone ? 'border-blue-500 ring-4 ring-blue-500/20 cursor-crosshair' : 'border-zinc-800'}`}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {isLoading && (
                                <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center z-10">
                                    <div className="w-8 h-8 border-4 border-zinc-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                                    <span className="text-zinc-500 text-sm tracking-widest uppercase font-bold">Initializing Camera</span>
                                </div>
                            )}
                            <video 
                                ref={videoRef} 
                                className="absolute inset-0 w-full h-full object-cover -scale-x-100" 
                                playsInline 
                                muted 
                            />
                            <canvas 
                                ref={canvasRef} 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />

                            {/* Safety Zone Overlay */}
                            {safetyZone && (
                                <div 
                                    className={`absolute border-2 transition-colors ${
                                        isEditingZone ? 'border-blue-500 bg-blue-500/10' : 'border-green-500/50 bg-green-500/5'
                                    }`}
                                    style={{
                                        left: `${safetyZone.x * 100}%`,
                                        top: `${safetyZone.y * 100}%`,
                                        width: `${safetyZone.w * 100}%`,
                                        height: `${safetyZone.h * 100}%`
                                    }}
                                >
                                    {!isEditingZone && (
                                        <div className="absolute -top-6 left-0 bg-green-500/20 backdrop-blur-sm text-green-400 text-[10px] uppercase font-bold px-2 py-1 rounded-t-md border border-green-500/30">
                                            Safe Zone
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* UI Overlays */}
                            <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                                <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold border border-zinc-800 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    LIVE
                                </div>
                                {isEditingZone && (
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg animate-pulse">
                                        Draw to define Safe Zone
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Alarms Overlay */}
                        {alarmTriggered && (
                            <div className="absolute top-6 left-6 right-6 bg-red-600 text-white p-4 rounded-xl flex items-center justify-between shadow-2xl animate-pulse z-30">
                                <div className="flex items-center gap-3">
                                    <BellRing className="w-6 h-6" />
                                    <div>
                                        <div className="font-bold uppercase tracking-widest text-sm">Critical Alert</div>
                                        <div className="text-xs text-red-200">Patient fall detected outside safe zone.</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        setAlarmTriggered(false);
                                        fallStartTimeRef.current = null;
                                        alarmLoggedRef.current = false;
                                    }}
                                    className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                                >
                                    Acknowledge
                                </button>
                            </div>
                        )}

                        {timeToAlarm !== null && !alarmTriggered && (
                            <div className="absolute top-6 left-6 right-6 bg-red-900/80 border border-red-500 backdrop-blur-md text-red-400 p-4 rounded-xl flex items-center justify-between shadow-lg z-30">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                                    <div>
                                        <div className="font-bold uppercase tracking-widest text-sm">Fall Warning</div>
                                        <div className="text-xs">Patient down. Alarm triggering in <span className="font-black text-lg">{timeToAlarm}s</span></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Controls */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-zinc-950/80 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 shadow-sm flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white text-xs font-bold uppercase tracking-widest">Safety Zone</h3>
                                {safetyZone ? (
                                    <ShieldAlert className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Ban className="w-5 h-5 text-zinc-600" />
                                )}
                            </div>

                            {isEditingZone ? (
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setIsEditingZone(false)}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors"
                                    >
                                        Save Zone
                                    </button>
                                    <button 
                                        onClick={() => { setSafetyZone(null); setIsEditingZone(false); }}
                                        className="w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : safetyZone ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase mb-4 bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                                        <CheckCircle className="w-4 h-4" /> Zone Active
                                    </div>
                                    <button 
                                        onClick={() => setIsEditingZone(true)}
                                        className="w-full py-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit3 className="w-4 h-4" /> Edit Zone
                                    </button>
                                    <button 
                                        onClick={() => setSafetyZone(null)}
                                        className="w-full py-3 bg-red-900/30 border border-red-900/50 text-red-400 rounded-xl text-sm font-bold hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" /> Clear Zone
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                        <MousePointerClick className="w-6 h-6 text-zinc-500" />
                                    </div>
                                    <button 
                                        onClick={() => setIsEditingZone(true)}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors mb-4"
                                    >
                                        Setup Zone
                                    </button>
                                    <p className="text-zinc-500 text-xs leading-relaxed">
                                        Click "Setup Zone" and draw a box on the camera to define the safe area.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-zinc-950/80 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 shadow-sm flex-1">
                            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Stats</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Current State</div>
                                    <div className="text-2xl font-bold text-white">{stats.status}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">AI Confidence</div>
                                    <div className="text-xl font-mono text-blue-500">{(stats.confidence * 100).toFixed(1)}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}