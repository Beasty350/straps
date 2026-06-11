'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Dumbbell, Clock, Repeat } from 'lucide-react';
import Link from 'next/link';

export default function MenuDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [menu, setMenu] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;

        async function fetchMenu() {
            try {
                const res = await fetch(`/api/menus/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                
                // ✅ FIXED: Look for exerciseList instead of exercises
                if (typeof data.exerciseList === 'string') {
                    data.exerciseList = JSON.parse(data.exerciseList);
                }
                setMenu(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMenu();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!menu) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500">
                <p className="mb-4">Program not found.</p>
                <Link href="/coach/dashboard" className="text-blue-500 hover:underline">Return to Dashboard</Link>
            </div>
        );
    }

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
                            {/* ✅ FIXED: Generate Title dynamically since 'name' is gone */}
                            <h1 className="text-4xl font-light text-white tracking-tight mb-2">
                            {menu.name || `Program #${menu.id.substring(0,6).toUpperCase()}`}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-zinc-500 font-medium">
                                {/* ✅ FIXED: changed created_at to createdAt */}
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(menu.createdAt).toLocaleDateString()}</span>
                                {/* ✅ FIXED: changed exercises.length to exerciseList.length */}
                                <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4 text-blue-500" />{menu.exerciseList?.length || 0} Exercises</span>
                            </div>
                        </div>
                        <button onClick={() => window.print()} className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-800 text-sm font-bold shadow-sm transition-all uppercase tracking-widest">
                            Print Program
                        </button>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto">
                    <div className="bg-zinc-950/80 backdrop-blur-sm rounded-2xl shadow-xl border border-zinc-800 overflow-hidden">
                        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                            <h2 className="font-bold text-zinc-400 uppercase text-xs tracking-widest">Exercise Schedule</h2>
                            <span className="bg-green-900/20 text-green-400 border border-green-900/50 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">ACTIVE</span>
                        </div>
                        
                        <div className="divide-y divide-zinc-800/50">
                            {/* ✅ FIXED: Mapping over exerciseList instead of exercises */}
                            {menu.exerciseList?.map((ex: any, idx: number) => (
                                <div key={idx} className="p-6 hover:bg-zinc-900/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 border border-blue-900/50 flex items-center justify-center font-bold text-lg shrink-0">{idx + 1}</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{ex.name}</h3>
                                            <p className="text-sm text-zinc-500 mt-1 uppercase tracking-wider text-[10px] font-bold">Target Muscles: General</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 text-sm">
                                        <div className="flex flex-col items-center"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Sets</span><span className="text-xl font-light text-zinc-300">{ex.sets || ex.total_sets || 1}</span></div>
                                        <div className="flex flex-col items-center"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Reps</span><span className="text-xl font-light text-zinc-300">{ex.reps}</span></div>
                                        <div className="flex flex-col items-center"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">Load</span><span className="text-xl font-light text-zinc-300">{ex.weight}kg</span></div>
                                        <div className="flex flex-col items-center w-20"><span className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Rest</span><span className="text-xl font-light text-blue-400">{ex.rest_time_seconds || ex.rest || 0}s</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}