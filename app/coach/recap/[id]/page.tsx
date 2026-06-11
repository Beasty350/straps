'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, CheckCircle, Download, Loader2, Sparkles, Activity, Heart } from 'lucide-react';
import Link from 'next/link';

export default function RecapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recap, setRecap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingLLM, setIsGeneratingLLM] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const formatExerciseName = (key: string) => {
    if (!key) return "Unknown";
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    if (!params.id) return;
    async function fetchRecap() {
      try {
        const res = await fetch(`/api/recap/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRecap(data);
        const feedback = data.sessionSummary?.llmOverallFeedback || data.summary?.llmOverallFeedback;
        if (feedback) setAiSummary(feedback);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecap();
  }, [params.id]);

  const generateAISummary = async () => {
    if (!recap) return;
    setIsGeneratingLLM(true);
    try {
      const res = await fetch('/api/recap/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recapId: recap.id })
      });
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      if (data.success) setAiSummary(data.summary);
      else alert(data.error || "Failed to generate summary.");
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setIsGeneratingLLM(false);
    }
  };

  const downloadReport = async () => {
    if (!recap) return;
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/recap/${recap.id}?telemetry=true`);
      const fullData = await res.json();
      const exercisesList = fullData.exerciseSummary || fullData.sessionSummary?.exercises || fullData.summary?.exercises || [];
      const mongoData = fullData.exercise_data || [];
      const date = new Date(recap.completedAt || new Date()).toLocaleString();

      let reportContent = `=======================================\n`;
      reportContent += `     OFFICIAL COACHING REPORT\n`;
      reportContent += `=======================================\n`;
      reportContent += `Patient/User ID : ${recap.userId || 'Unknown'}\n`;
      reportContent += `Session Date    : ${date}\n`;
      reportContent += `Session ID      : ${recap.id}\n`;
      reportContent += `---------------------------------------\n\n`;

      if (aiSummary) {
        reportContent += `AI SESSION ANALYSIS:\n${aiSummary}\n\n`;
        reportContent += `---------------------------------------\n\n`;
      }

      const hrSummary = fullData.heart_rate_summary || fullData.heartRateSummary;
      if (hrSummary) {
        reportContent += `HEART RATE SUMMARY:\n`;
        reportContent += `Average BPM : ${hrSummary.avg}\n`;
        reportContent += `Maximum BPM : ${hrSummary.max}\n`;
        reportContent += `Minimum BPM : ${hrSummary.min}\n`;
        reportContent += `Samples     : ${hrSummary.sampleCount}\n`;
        reportContent += `---------------------------------------\n\n`;

        // Zone analysis (if available)
        if (hrSummary.zoneAnalysis && hrSummary.zoneAnalysis.length > 0) {
          reportContent += `HEART RATE ZONES:\n`;
          hrSummary.zoneAnalysis.forEach((zone: any) => {
            reportContent += `- ${zone.name}: ${zone.durationMinutes} min\n`;
          });
          if (hrSummary.sensorWarning) {
            reportContent += `\n⚠️ Sensor warning: Prolonged very low heart rate detected. Check device placement.\n`;
          }
          reportContent += `---------------------------------------\n\n`;
        }
      }

      if (exercisesList && exercisesList.length > 0) {
        reportContent += `SET | EXERCISE | REPS DONE | CORRECT | IMPROVE | WEIGHT | SCORE | FRAMES | DURATION\n`;
        reportContent += `------------------------------------------------------------------------------------------------------\n`;
        exercisesList.forEach((ex: any) => {
          const rawName = ex.name || ex.exerciseName || 'UNKNOWN';
          const exerciseName = formatExerciseName(rawName);
          const framesCount = ex.ui_summary?.total_frames || 0;
          const estDuration = ex.ui_summary?.duration_seconds || (framesCount / 10).toFixed(1);
          const repsDone = ex.repsDone || ex.reps || 0;
          const correctReps = ex.correctReps || 0;
          const repsImprovement = ex.repsImprovement || 0;
          reportContent += `${ex.set || ex.set_index || 1} | ${exerciseName.toUpperCase()} | ${repsDone} | ${correctReps} | ${repsImprovement} | ${ex.weight || 0}kg | ${Number(ex.score || 0).toFixed(1)}/100 | ${framesCount} | ${estDuration}s\n`;
        });
      }

      reportContent += `\n\n=================================================================================\n`;
      reportContent += `RAW TELEMETRY DATA (CSV FORMAT)\n`;
      reportContent += `Can be directly copied and saved as a .csv file for Excel/Python biomechanical analysis\n`;
      reportContent += `=================================================================================\n`;
      reportContent += `Exercise,Set,Rep,Timestamp_Sec,Joint_Name,Angle_Degrees,Position_X,Position_Y,Position_Z\n`;

      if (mongoData && mongoData.length > 0) {
        mongoData.forEach((ex: any) => {
          const rawExName = ex.name || ex.exerciseName || 'Unknown';
          const exName = formatExerciseName(rawExName).replace(/,/g, '');
          const setNum = ex.set || ex.set_index || 1;
          if (ex.repetitions) {
            ex.repetitions.forEach((rep: any) => {
              const repNum = rep.repNumber || 1;
              if (rep.frames) {
                rep.frames.forEach((frame: any) => {
                  if (frame.keypoints) {
                    frame.keypoints.forEach((kp: any) => {
                      const angle = kp.angle !== null && kp.angle !== undefined ? kp.angle : '';
                      const px = kp.position?.x !== null && kp.position?.x !== undefined ? kp.position.x : '';
                      const py = kp.position?.y !== null && kp.position?.y !== undefined ? kp.position.y : '';
                      const pz = kp.position?.z !== null && kp.position?.z !== undefined ? kp.position.z : '';
                      reportContent += `${exName},${setNum},${repNum},${frame.timestamp},${kp.name},${angle},${px},${py},${pz}\n`;
                    });
                  }
                });
              }
            });
          } else if (ex.repDetails) {
            ex.repDetails.forEach((frame: any) => {
              const joints = Array.from(new Set([...Object.keys(frame.positions || {}), ...Object.keys(frame.angles || {})]));
              joints.forEach(joint => {
                const angle = frame.angles?.[joint] ?? '';
                const pos = frame.positions?.[joint] || { x: '', y: '', z: '' };
                reportContent += `${exName},${setNum},1,${frame.timestamp},${joint},${angle},${pos.x},${pos.y},${pos.z}\n`;
              });
            });
          }
        });
      } else {
        reportContent += `No MongoDB raw telemetry data available for this session.\n`;
      }

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Coach_Report_${new Date(recap.completedAt || new Date()).toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to download heavy telemetry data. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!recap) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500">
        <p className="mb-4">Report not found.</p>
        <Link href="/coach/dashboard" className="text-blue-500 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const { summary, sessionSummary, menu } = recap;
  const exercises = recap.exerciseSummary || sessionSummary?.exercises || summary?.exercises || [];
  const hrSummary = recap.heart_rate_summary || recap.heartRateSummary;
  const isCompleted = sessionSummary?.completed ?? recap.isCompleted ?? true;
  const durationSecs = sessionSummary?.session_duration ?? recap.sessionDuration ?? 0;
  const durationMins = Math.floor(durationSecs / 60);
  const durationRemainder = durationSecs % 60;
  const durationDisplay = durationMins > 0 ? `${durationMins}m ${durationRemainder}s` : `${durationRemainder}s`;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }} />
      <div className="relative z-10">
        <header className="max-w-4xl mx-auto mb-10">
          <Link href="/coach/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 group text-sm uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-light text-white tracking-tight mb-2">
                Session Report <span className="text-blue-500 font-bold">#{recap.id.substring(0,6).toUpperCase()}</span>
              </h1>
              <div className="flex items-center flex-wrap gap-4 text-sm text-zinc-500 font-medium">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(recap.completedAt || recap.created_at || new Date()).toLocaleDateString()}</span>
                <span className="flex items-center gap-1 text-white bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full"><User className="w-4 h-4 text-blue-500" />{menu ? menu.name : `Menu #${recap.menuId || 'Free Mode'}`}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(recap.completedAt || recap.created_at || new Date()).toLocaleTimeString()}</span>
                <span className="flex items-center gap-1"><Activity className="w-4 h-4" />{durationDisplay}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-zinc-800">
              <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">Completion Status</h2>
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-10 h-10 text-green-500" />
                    <div><div className="text-2xl font-bold text-white tracking-tight">Completed</div><div className="text-sm text-green-500/80 font-medium">All exercises finished</div></div>
                  </>
                ) : (
                  <>
                    <Activity className="w-10 h-10 text-orange-500" />
                    <div><div className="text-2xl font-bold text-white tracking-tight">Incomplete</div><div className="text-sm text-orange-500/80 font-medium">Session ended early</div></div>
                  </>
                )}
              </div>
            </div>
            <button onClick={downloadReport} disabled={isDownloading} className="bg-blue-600/10 hover:bg-blue-600/20 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-blue-500/30 flex items-center justify-between group transition-all text-left disabled:opacity-50">
              <div>
                <h2 className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">Export Data</h2>
                <div className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{isDownloading ? 'Fetching Data...' : 'Download Detailed TXT'}</div>
                <div className="text-sm text-zinc-400 font-medium">Includes tracking telemetry & AI summary</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50 group-hover:scale-110 transition-transform">
                {isDownloading ? <Loader2 className="w-6 h-6 text-blue-400 animate-spin" /> : <Download className="w-6 h-6 text-blue-400" />}
              </div>
            </button>
          </div>

          {/* AI SECTION */}
          <div className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-2xl shadow-xl flex flex-col gap-4 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-500" /><h2 className="text-blue-400 text-[12px] font-bold uppercase tracking-widest">AI Session Analysis</h2></div>
              {!aiSummary && (
                <button onClick={generateAISummary} disabled={isGeneratingLLM} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg">
                  {isGeneratingLLM ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isGeneratingLLM ? 'Analyzing Telemetry...' : 'Generate AI Report'}
                </button>
              )}
            </div>
            <div className="text-zinc-300 text-sm leading-relaxed">
              {aiSummary ? (
                <div className="p-4 bg-zinc-950/50 rounded-xl border border-blue-900/20 whitespace-pre-wrap">{aiSummary}</div>
              ) : (
                <p className="text-zinc-500 italic">No AI summary generated for this session yet. Click the button above to run the AI analysis on the spatio-temporal telemetry.</p>
              )}
            </div>
          </div>

          {/* HEART RATE SECTION */}
          {hrSummary && (
            <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-2xl shadow-xl flex flex-col gap-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h2 className="text-red-400 text-[12px] font-bold uppercase tracking-widest">Heart Rate Analysis</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-950/50 rounded-xl p-4 text-center border border-red-900/20">
                  <div className="text-[10px] uppercase tracking-widest text-red-500/70">Avg BPM</div>
                  <div className="text-2xl font-bold text-white mt-1">{hrSummary.avg || '—'}</div>
                </div>
                <div className="bg-zinc-950/50 rounded-xl p-4 text-center border border-red-900/20">
                  <div className="text-[10px] uppercase tracking-widest text-red-500/70">Max BPM</div>
                  <div className="text-2xl font-bold text-white mt-1">{hrSummary.max || '—'}</div>
                </div>
                <div className="bg-zinc-950/50 rounded-xl p-4 text-center border border-red-900/20">
                  <div className="text-[10px] uppercase tracking-widest text-red-500/70">Min BPM</div>
                  <div className="text-2xl font-bold text-white mt-1">{hrSummary.min || '—'}</div>
                </div>
              </div>
              {hrSummary.sampleCount && (
                <div className="text-center text-xs text-zinc-500">Based on {hrSummary.sampleCount} samples</div>
              )}

              {/* Zone Analysis */}
              {hrSummary.zoneAnalysis && hrSummary.zoneAnalysis.length > 0 && (
                <div className="bg-zinc-950/50 rounded-xl p-4 border border-red-900/20 mt-2">
                  <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Heart Rate Zones</h3>
                  <div className="space-y-1">
                    {hrSummary.zoneAnalysis.map((zone: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-zinc-400">{zone.name}</span>
                        <span className="font-mono text-white">{zone.durationMinutes} min</span>
                      </div>
                    ))}
                  </div>
                  {hrSummary.sensorWarning && (
                    <p className="text-xs text-yellow-500 mt-3">
                      ⚠️ Sensor warning: Heart rate below 40% detected. Check device placement.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* EXERCISE LOG */}
          <div className="bg-zinc-950/80 backdrop-blur-sm rounded-2xl shadow-xl border border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-zinc-800 bg-zinc-900/50"><h2 className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest">Detailed Exercise Log</h2></div>
            <div className="divide-y divide-zinc-800/50">
              {exercises.map((ex: any, idx: number) => {
                const rawName = ex.name || ex.exerciseName || 'Unknown Exercise';
                const exerciseName = formatExerciseName(rawName);
                const jointStats = ex.precalculatedMetrics?.jointStats || [];
                const estDuration = ex.ui_summary?.duration_seconds || "0.0";
                const frameCount = ex.ui_summary?.total_frames || 0;
                const displayScore = Number(ex.score || ex.precalculatedMetrics?.avgScore || 0).toFixed(1);
                const displayWeight = ex.weight || 0;
                const repsDone = ex.repsDone || ex.reps || 0;
                const correctReps = ex.correctReps || 0;
                const repsImprovement = ex.repsImprovement || 0;
                return (
                  <div key={idx} className="p-6 flex flex-col gap-4 group hover:bg-zinc-900/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-sm shrink-0">{idx + 1}</div>
                        <div>
                          <div className="flex items-center gap-2"><h3 className="text-lg font-bold text-white">{exerciseName}</h3><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/20 text-blue-400 border border-blue-900/50 uppercase tracking-wide">Set {ex.set || ex.set_index || 1}</span></div>
                          <div className="flex gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500 mt-1"><span>{displayWeight} kg</span></div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2"><span className="text-blue-400 text-sm font-bold bg-blue-950/30 px-3 py-1 rounded-lg border border-blue-900/50">Form Score: {displayScore}/100</span></div>
                    </div>
                    <div className="ml-12 grid grid-cols-3 gap-3">
                      <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/50 flex flex-col items-center justify-center text-center"><span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Total Reps</span><span className="text-xl font-bold text-white">{repsDone}</span></div>
                      <div className="bg-green-950/10 p-3 rounded-xl border border-green-900/30 flex flex-col items-center justify-center text-center"><span className="text-[10px] uppercase tracking-widest text-green-500/70 mb-1">Correct</span><span className="text-xl font-bold text-green-500">{correctReps}</span></div>
                      <div className="bg-orange-950/10 p-3 rounded-xl border border-orange-900/30 flex flex-col items-center justify-center text-center"><span className="text-[10px] uppercase tracking-widest text-orange-500/70 mb-1">To Improve</span><span className="text-xl font-bold text-orange-500">{repsImprovement}</span></div>
                    </div>
                    {jointStats.length > 0 ? (
                      <div className="ml-12 mt-2"><div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 border-b border-zinc-800/50 pb-2">Joint Kinematics</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{jointStats.map((js: any, jIdx: number) => (<div key={jIdx} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/50"><div className="text-[11px] font-bold text-blue-400 mb-2">{js.name}</div><div className="grid grid-cols-4 gap-2"><div className="text-center"><div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Min</div><div className="text-xs font-mono text-zinc-300">{js.min}°</div></div><div className="text-center border-l border-zinc-800/50"><div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Max</div><div className="text-xs font-mono text-zinc-300">{js.max}°</div></div><div className="text-center border-l border-zinc-800/50"><div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Avg Up</div><div className="text-xs font-mono text-zinc-300">{js.avgUp}°</div></div><div className="text-center border-l border-zinc-800/50"><div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1">Avg Dn</div><div className="text-xs font-mono text-zinc-300">{js.avgDown}°</div></div></div></div>))}</div></div>
                    ) : <div className="ml-12 mt-2 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50 text-center"><span className="text-xs text-zinc-500 italic">Detailed spatial kinematics unavailable for this set.</span></div>}
                    <div className="ml-12 mt-2 bg-blue-950/10 border border-blue-900/30 p-3 rounded-lg"><div className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">Telemetry Summary</div><div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2"><div className="bg-zinc-950 p-2 rounded flex flex-col items-center border border-zinc-800/30"><span className="text-[9px] uppercase tracking-wider text-zinc-500">Duration</span><span className="font-mono text-blue-400 mt-1">{estDuration}s</span></div><div className="bg-zinc-950 p-2 rounded flex flex-col items-center border border-zinc-800/30"><span className="text-[9px] uppercase tracking-wider text-zinc-500">Capture Rate</span><span className="font-mono text-blue-400 mt-1">10 FPS</span></div><div className="bg-zinc-950 p-2 rounded flex flex-col items-center border border-zinc-800/30"><span className="text-[9px] uppercase tracking-wider text-zinc-500">Spatial Data</span><span className="font-mono text-blue-400 mt-1">{frameCount} Frames</span></div><div className="bg-zinc-950 p-2 rounded flex flex-col items-center border border-zinc-800/30"><span className="text-[9px] uppercase tracking-wider text-zinc-500">LLM Analysis</span><span className="font-mono text-blue-400 mt-1">{aiSummary ? 'Generated' : 'Pending'}</span></div></div></div>
                  </div>
                );
              })}
              {exercises.length === 0 && <div className="p-8 text-center text-zinc-500 italic">No exercise details available.</div>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}