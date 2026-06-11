'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Download, FileText, Sparkles, Clock, Dumbbell, Target, Loader2, ArrowLeft, Activity as ActivityIcon, Heart } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

function ReportContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { user } = useAuth();

  const [detailedSession, setDetailedSession] = useState<any | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isGeneratingLLM, setIsGeneratingLLM] = useState(false);
  const [llmSummary, setLlmSummary] = useState<string | null>(null);

  const formatExerciseName = (key: string) => {
    if (!key) return "Unknown";
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    if (!id) {
      setIsLoadingDetail(false);
      return;
    }
    setIsLoadingDetail(true);
    fetch(`/api/recap/${id}`)
      .then(res => res.json())
      .then(data => {
        setDetailedSession(data);
      })
      .catch(err => {
        console.error("Failed to fetch details:", err);
      })
      .finally(() => {
        setIsLoadingDetail(false);
      });
  }, [id]);

  const generateAISummary = async () => {
    setIsGeneratingLLM(true);
    try {
      const res = await fetch('/api/recap/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recapId: id })
      });
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      if (data.success) setLlmSummary(data.summary);
      else alert(data.error || "Failed to generate summary.");
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    } finally {
      setIsGeneratingLLM(false);
    }
  };

  const getSafeExercises = (session: any) => {
    if (!session) return [];
    if (session.exerciseSummary?.length > 0) return session.exerciseSummary;
    if (session.exercise_summary?.length > 0) return session.exercise_summary;
    if (session.sessionSummary?.exercises?.length > 0) return session.sessionSummary.exercises;
    if (session.summary?.exercises?.length > 0) return session.summary.exercises;
    if (session.exercise_data?.length > 0) return session.exercise_data;
    return [];
  };

  const downloadReport = () => {
    if (!detailedSession) return;
    const rawDate = detailedSession.completedAt || detailedSession.created_at;
    const dateObj = rawDate ? new Date(rawDate) : new Date();
    const dateString = dateObj.toLocaleString();

    let reportContent = `=======================================\n`;
    reportContent += `       OFFICIAL WORKOUT REPORT\n`;
    reportContent += `=======================================\n`;
    reportContent += `Patient/User ID : ${user?.id || 'Unknown'}\n`;
    reportContent += `Session Date    : ${dateString}\n`;
    reportContent += `Session ID      : ${detailedSession.id || 'N/A'}\n`;
    reportContent += `---------------------------------------\n\n`;

    const finalAnalysis = llmSummary || detailedSession.sessionSummary?.llmOverallFeedback || detailedSession.summary?.llmOverallFeedback || detailedSession.sessionSummary?.llm_analysis;
    if (finalAnalysis) {
      reportContent += `AI SESSION ANALYSIS:\n${finalAnalysis}\n\n`;
      reportContent += `---------------------------------------\n\n`;
    }

    const hrSummary = detailedSession.heart_rate_summary || detailedSession.heartRateSummary;
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
          reportContent += `\nSensor warning: Prolonged very low heart rate detected. Check device placement.\n`;
        }
        reportContent += `---------------------------------------\n\n`;
      }
    }

    const exercises = getSafeExercises(detailedSession);
    if (exercises.length > 0) {
      reportContent += `SET | EXERCISE | REPS DONE | CORRECT | IMPROVE | WEIGHT | SCORE | DURATION\n`;
      reportContent += `------------------------------------------------------------------------------------------------------\n`;
      exercises.forEach((ex: any) => {
        const estDuration = ex.ui_summary?.duration_seconds || "0.0";
        const repsDone = ex.repsDone || ex.reps || 0;
        const correctReps = ex.correctReps || 0;
        const repsImprovement = ex.repsImprovement || 0;
        const rawExerciseName = ex.exerciseName || ex.name || 'UNKNOWN';
        const exerciseName = formatExerciseName(rawExerciseName);
        reportContent += `${ex.set || ex.set_index || 1} | ${exerciseName.toUpperCase()} | ${repsDone} | ${correctReps} | ${repsImprovement} | ${ex.weight || 0}kg | ${Number(ex.score || ex.precalculatedMetrics?.avgScore || 0).toFixed(1)}/100 | ${estDuration}s\n`;
      });
    } else {
      reportContent += `No specific exercise data recorded for this session.\n`;
    }

    reportContent += `\n=======================================\n`;
    reportContent += `Generated by HARCore AI Monitoring\n`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeDateISO = dateObj.toISOString().split('T')[0];
    link.href = url;
    link.download = `Workout_Report_${safeDateISO}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoadingDetail) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Telemetry Data...</div>
      </div>
    );
  }

  if (!detailedSession) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <p className="text-zinc-400 mb-4">Report not found or failed to load.</p>
        <Link href="/client" className="text-blue-500 hover:text-blue-400 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const displayExercises = getSafeExercises(detailedSession);
  const displayLLM = llmSummary || detailedSession.sessionSummary?.llmOverallFeedback || detailedSession.summary?.llmOverallFeedback || detailedSession.sessionSummary?.llm_analysis;
  const hrSummary = detailedSession.heart_rate_summary || detailedSession.heartRateSummary;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/client" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/30 shadow-inner shrink-0">
                <FileText className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Session Report</h1>
                <p className="text-zinc-400 text-sm mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {new Date(detailedSession.completedAt || detailedSession.created_at || new Date()).toLocaleString()}
                </p>
              </div>
            </div>
            <button onClick={downloadReport} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-5 py-2.5 rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm">
              <Download className="w-4 h-4" /> Export TXT
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* AI SECTION */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-[24px] relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.15em] text-blue-400 font-bold flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  AI Session Analysis
                </div>
                <div className="text-sm text-zinc-400/90 italic leading-relaxed whitespace-pre-wrap">
                  {displayLLM || 'No AI summary generated for this session yet. Click the button to run the AI analysis on the spatio-temporal telemetry.'}
                </div>
              </div>
              {!displayLLM && (
                <button onClick={generateAISummary} disabled={isGeneratingLLM} className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wide disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                  {isGeneratingLLM ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                  {isGeneratingLLM ? 'Generating Analysis...' : 'Generate AI Report'}
                </button>
              )}
            </div>
          </div>

          {/* HEART RATE SECTION */}
          {hrSummary && (
            <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-[24px] shadow-xl flex flex-col gap-4 backdrop-blur-sm">
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

          {/* EXERCISE DETAILS */}
          <div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-[0.15em] mb-4 px-1">
              Detailed Exercise Log
            </div>
            <div className="space-y-4">
              {displayExercises.map((ex: any, idx: number) => {
                const rawExerciseName = ex.exerciseName || ex.name || 'Unknown Exercise';
                const exerciseName = formatExerciseName(rawExerciseName);
                const repsDone = ex.repsDone || ex.reps || 0;
                const correctReps = ex.correctReps || 0;
                const repsImprovement = ex.repsImprovement || 0;
                const weight = ex.weight || 0;
                const score = Number(ex.score || ex.precalculatedMetrics?.avgScore || 0).toFixed(1);
                const frameCount = ex.ui_summary?.total_frames || (Array.isArray(ex.repetitions) ? ex.repetitions.flatMap((r: any) => r.frames || []).length : 0);
                const duration = ex.ui_summary?.duration_seconds || (frameCount > 0 ? (frameCount / 10).toFixed(1) : "0.0");
                return (
                  <div key={idx} className="bg-zinc-950 rounded-[24px] p-5 md:p-6 border border-zinc-800/60 shadow-md relative overflow-hidden transition-all hover:border-zinc-700/80">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-sm font-bold shrink-0 shadow-inner">{idx + 1}</div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-bold text-xl">{exerciseName}</h4>
                        <span className="bg-blue-950/40 text-blue-400 border border-blue-900/60 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          Set {ex.set || ex.set_index || 1}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="bg-[#0f0f0f] rounded-2xl p-4 border border-zinc-800/50 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.1em] text-zinc-500 mb-1.5"><Clock className="w-3.5 h-3.5" /> Duration</div>
                        <div className="font-mono text-white text-lg md:text-xl">{duration}s</div>
                      </div>
                      <div className="bg-[#0f0f0f] rounded-2xl p-4 border border-zinc-800/50 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.1em] text-zinc-500 mb-1.5"><Dumbbell className="w-3.5 h-3.5" /> Weight</div>
                        <div className="font-mono text-white text-lg md:text-xl">{weight} <span className="text-xs text-zinc-500">kg</span></div>
                      </div>
                      <div className="bg-blue-950/10 rounded-2xl p-4 border border-blue-900/30 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.1em] text-blue-500/80 mb-1.5 font-medium"><Target className="w-3.5 h-3.5" /> Score</div>
                        <div className="font-mono text-blue-400 text-lg md:text-xl font-bold">{score}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      <div className="bg-[#0f0f0f] rounded-2xl p-4 md:p-5 border border-zinc-800/50 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.1em] text-zinc-500 mb-2"><ActivityIcon className="w-3.5 h-3.5" /> Total Reps</div>
                        <div className="font-bold text-white text-2xl md:text-3xl">{repsDone}</div>
                      </div>
                      <div className="bg-[#05130a] rounded-2xl p-4 md:p-5 border border-[#0a2915] text-center flex flex-col items-center justify-center">
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#22c55e] mb-2 font-medium">Correct</div>
                        <div className="font-bold text-[#22c55e] text-2xl md:text-3xl">{correctReps}</div>
                      </div>
                      <div className="bg-[#1a0c05] rounded-2xl p-4 md:p-5 border border-[#33180a] text-center flex flex-col items-center justify-center">
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#f97316] mb-2 font-medium">To Improve</div>
                        <div className="font-bold text-[#f97316] text-2xl md:text-3xl">{repsImprovement}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {displayExercises.length === 0 && (
                <div className="text-center text-zinc-600 py-12 bg-zinc-950 rounded-[24px] border border-zinc-800/50 border-dashed text-sm">
                  No specific exercise metrics saved for this session.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Report...</div>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}