'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, PlayCircle, ArrowLeft, Copy } from 'lucide-react';
import Link from 'next/link';

interface ExerciseItem {
    id: string;
    name: string;
    categoryFilter: 'all' | 'upper_body' | 'lower_body' | 'full_body'; // NEW per-row filter
    reps: number;
    weight: number;
    rest_time_seconds: number;
}

interface RoundData {
    id: string;
    exercises: ExerciseItem[];
}

// Exercise data with category
const EXERCISE_OPTIONS_ALL = [
    // Upper body
    { value: "bicep_curl", label: "Bicep Curl", category: "upper_body" },
    { value: "hammer_curl", label: "Hammer Curl", category: "upper_body" },
    { value: "overhead_press", label: "Overhead Press", category: "upper_body" },
    { value: "lateral_raises", label: "Lateral Raises", category: "upper_body" },
    { value: "front_raise", label: "Front Raise", category: "upper_body" },
    { value: "up_right", label: "Up Right", category: "upper_body" },
    { value: "high_pull", label: "High Pull", category: "upper_body" },
    // Lower body
    { value: "squat", label: "Squat", category: "lower_body" },
    { value: "sumo_squat", label: "Sumo Squat", category: "lower_body" },
    { value: "lunges", label: "Lunges", category: "lower_body" },
    { value: "side_lunges", label: "Side Lunges", category: "lower_body" },
    // Full body
    { value: "deadlift", label: "Deadlift", category: "full_body" },
    { value: "sumo_deadlift", label: "Sumo Deadlift", category: "full_body" },
    { value: "dumbbell_thruster", label: "Dumbbell Thruster", category: "full_body" },
    { value: "dumbbell_push_clean_jerk", label: "Dumbbell Push Clean and Jerk", category: "full_body" },
    { value: "dumbbell_push_jerk", label: "Dumbbell Push Jerk", category: "full_body" }
];

const CATEGORY_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'upper_body', label: 'Upper' },
    { id: 'lower_body', label: 'Lower' },
    { id: 'full_body', label: 'Full' }
];

export default function FreeModeBuilder() {
    const router = useRouter();

    const [rounds, setRounds] = useState<RoundData[]>([
        {
            id: 'round-1',
            exercises: [
                { id: 'ex-1', name: 'squat', categoryFilter: 'all', reps: 10, weight: 20, rest_time_seconds: 30 }
            ]
        }
    ]);

    const addRound = () => {
        setRounds([...rounds, {
            id: Math.random().toString(36).substr(2, 9),
            exercises: []
        }]);
    };

    const duplicateRound = (sourceIndex: number) => {
        const source = rounds[sourceIndex];
        const newExercises = source.exercises.map(ex => ({
            ...ex,
            id: Math.random().toString(36).substr(2, 9)
        }));
        const newRounds = [...rounds];
        newRounds.splice(sourceIndex + 1, 0, {
            id: Math.random().toString(36).substr(2, 9),
            exercises: newExercises
        });
        setRounds(newRounds);
    };

    const removeRound = (index: number) => {
        setRounds(rounds.filter((_, i) => i !== index));
    };

    const addExerciseToRound = (roundIndex: number) => {
        const newRounds = [...rounds];
        newRounds[roundIndex].exercises.push({
            id: Math.random().toString(36).substr(2, 9),
            name: 'squat',
            categoryFilter: 'all',
            reps: 10,
            weight: 10,
            rest_time_seconds: 30
        });
        setRounds(newRounds);
    };

    const removeExerciseFromRound = (roundIndex: number, exIndex: number) => {
        const newRounds = [...rounds];
        newRounds[roundIndex].exercises = newRounds[roundIndex].exercises.filter((_, i) => i !== exIndex);
        setRounds(newRounds);
    };

    const updateExercise = (roundIndex: number, exIndex: number, field: keyof ExerciseItem, value: any) => {
        const newRounds = [...rounds];
        newRounds[roundIndex].exercises[exIndex] = {
            ...newRounds[roundIndex].exercises[exIndex],
            [field]: value
        };
        setRounds(newRounds);
    };

    const startTraining = () => {
        if (rounds.length === 0) return;
        if (rounds.every(r => r.exercises.length === 0)) return;

        const flatList: any[] = [];
        const counts: Record<string, number> = {};
        const totals: Record<string, number> = {};

        rounds.forEach(round => {
            round.exercises.forEach(ex => {
                totals[ex.name] = (totals[ex.name] || 0) + 1;
            });
        });

        rounds.forEach((round) => {
            round.exercises.forEach(ex => {
                counts[ex.name] = (counts[ex.name] || 0) + 1;
                flatList.push({
                    name: ex.name,
                    reps: ex.reps,
                    weight: ex.weight,
                    rest_time_seconds: ex.rest_time_seconds,
                    set_index: counts[ex.name],
                    total_sets: totals[ex.name]
                });
            });
        });

        const freeMenu = {
            id: 'free-mode',
            name: 'Free Session',
            exercises: flatList
        };
        localStorage.setItem('straps_free_mode_menu', JSON.stringify(freeMenu));
        router.push('/client/training?mode=free');
    };

    // Helper to get filtered options for a given categoryFilter
    const getFilteredOptions = (filter: string) => {
        if (filter === 'all') return EXERCISE_OPTIONS_ALL;
        return EXERCISE_OPTIONS_ALL.filter(opt => opt.category === filter);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans pb-32 relative selection:bg-blue-500/30">
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }}
            />

            <div className="relative z-10">
                <header className="max-w-3xl mx-auto mb-10 flex items-center gap-4">
                    <Link href="/client" className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800 shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                            Free Style <span className="font-bold text-blue-500">Composer</span>
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-bold">Design training blocks set-by-set.</p>
                    </div>
                </header>

                <div className="max-w-3xl mx-auto space-y-6">
                    <AnimatePresence mode="popLayout">
                        {rounds.map((round, roundIndex) => (
                            <motion.div
                                key={round.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-6 md:p-8 relative shadow-sm group/round"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black text-zinc-500 uppercase tracking-tighter flex items-center gap-2">
                                        <span className="text-4xl text-white">#{ (roundIndex + 1).toString().padStart(2, '0') }</span>
                                        SET / GROUP
                                    </h3>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => duplicateRound(roundIndex)}
                                            className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-xl transition-all"
                                            title="Duplicate this Round"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeRound(roundIndex)}
                                            disabled={rounds.length === 1}
                                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all disabled:opacity-0"
                                            title="Remove Round"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {round.exercises.map((ex, exIndex) => {
                                            const filteredOptions = getFilteredOptions(ex.categoryFilter);
                                            return (
                                                <motion.div
                                                    key={ex.id}
                                                    layout
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-800 flex flex-col md:flex-row gap-4 items-center group/ex relative overflow-hidden"
                                                >
                                                    {/* Category filter buttons for this row */}
                                                    <div className="flex flex-wrap gap-1">
                                                        {CATEGORY_FILTERS.map(cat => (
                                                            <button
                                                                key={cat.id}
                                                                type="button"
                                                                onClick={() => updateExercise(roundIndex, exIndex, 'categoryFilter', cat.id)}
                                                                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full transition-all ${
                                                                    ex.categoryFilter === cat.id
                                                                        ? 'bg-blue-600 text-white'
                                                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                                                }`}
                                                            >
                                                                {cat.label}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="flex-1 w-full md:w-auto">
                                                        <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 md:hidden">Exercise</label>
                                                        <div className="relative">
                                                            <select
                                                                value={ex.name}
                                                                onChange={(e) => updateExercise(roundIndex, exIndex, 'name', e.target.value)}
                                                                className="w-full bg-blue-500 border border-transparent rounded-lg py-4 px-6 text-lg outline-none focus:ring-2 focus:ring-blue-400 transition-colors appearance-none text-black font-bold shadow-md cursor-pointer"
                                                            >
                                                                {filteredOptions.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 w-full md:w-auto">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 text-center">Reps</label>
                                                            <input
                                                                type="number"
                                                                value={isNaN(ex.reps) ? '' : ex.reps}
                                                                onChange={(e) => updateExercise(roundIndex, exIndex, 'reps', parseInt(e.target.value))}
                                                                className="w-full md:w-16 bg-black border border-zinc-800 rounded-lg px-2 py-1.5 text-center font-mono text-sm focus:border-blue-500 outline-none text-white"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 text-center">Kg</label>
                                                            <input
                                                                type="number"
                                                                value={isNaN(ex.weight) ? '' : ex.weight}
                                                                onChange={(e) => updateExercise(roundIndex, exIndex, 'weight', parseFloat(e.target.value))}
                                                                className="w-full md:w-16 bg-black border border-zinc-800 rounded-lg px-2 py-1.5 text-center font-mono text-sm focus:border-blue-500 outline-none text-white"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 text-center">Rest(s)</label>
                                                            <input
                                                                type="number"
                                                                value={isNaN(ex.rest_time_seconds) ? '' : ex.rest_time_seconds}
                                                                onChange={(e) => updateExercise(roundIndex, exIndex, 'rest_time_seconds', parseFloat(e.target.value))}
                                                                className="w-full md:w-16 bg-black border border-zinc-800 rounded-lg px-2 py-1.5 text-center font-mono text-sm focus:border-blue-500 outline-none text-blue-400"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeExerciseFromRound(roundIndex, exIndex)}
                                                        className="absolute top-2 right-2 p-2 md:relative md:top-auto md:right-auto md:p-2 text-zinc-600 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>

                                    <motion.button
                                        layout
                                        type="button"
                                        onClick={() => addExerciseToRound(roundIndex)}
                                        className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" /> Add Exercise
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="flex justify-center pt-2 pb-6">
                        <button
                            type="button"
                            onClick={addRound}
                            className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white px-8 py-3 rounded-full font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-2 tracking-widest text-sm uppercase"
                        >
                            <Plus className="w-5 h-5 text-blue-500" /> Add New Set
                        </button>
                    </div>

                    <div className="h-32 md:h-40 w-full shrink-0"></div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-lg border-t border-zinc-800 flex justify-center z-50">
                    <button
                        type="button"
                        onClick={startTraining}
                        disabled={rounds.length === 0}
                        className="w-full max-w-md bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] transform transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        <PlayCircle className="w-6 h-6" /> START SESSION
                    </button>
                </div>
            </div>
        </div>
    );
}