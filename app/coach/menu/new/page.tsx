'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, Copy, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/lib/auth';

interface ExerciseItem {
    id: string;
    name: string;
    categoryFilter: 'all' | 'upper_body' | 'lower_body' | 'full_body'; // NEW
    reps: number;
    weight: number;
    rest_time_seconds: number;
}

interface RoundData {
    id: string;
    exercises: ExerciseItem[];
}

// Exercise data with category (using labels as stored in DB)
const EXERCISE_OPTIONS_ALL = [
    // Upper body
    { value: "Bicep Curl", category: "upper_body" },
    { value: "Hammer Curl", category: "upper_body" },
    { value: "Overhead Press", category: "upper_body" },
    { value: "Lateral Raises", category: "upper_body" },
    { value: "Front Raise", category: "upper_body" },
    { value: "Up Right", category: "upper_body" },
    { value: "High Pull", category: "upper_body" },
    // Lower body
    { value: "Squat", category: "lower_body" },
    { value: "Sumo Squat", category: "lower_body" },
    { value: "Lunges", category: "lower_body" },
    { value: "Side Lunges", category: "lower_body" },
    // Full body
    { value: "Deadlift", category: "full_body" },
    { value: "Sumo Deadlift", category: "full_body" },
    { value: "Dumbbell Thruster", category: "full_body" },
    { value: "Dumbbell Push Clean and Jerk", category: "full_body" },
    { value: "Dumbbell Push Jerk", category: "full_body" }
];

const CATEGORY_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'upper_body', label: 'Upper' },
    { id: 'lower_body', label: 'Lower' },
    { id: 'full_body', label: 'Full' }
];

export default function CreateMenuPageWrap() { return <AuthProvider><CreateMenuPage /></AuthProvider>; }

function CreateMenuPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [menuName, setMenuName] = useState('');
    const [rounds, setRounds] = useState<RoundData[]>([{
        id: 'round-1',
        exercises: [{ id: 'ex-1', name: 'Squat', categoryFilter: 'all', reps: 10, weight: 20, rest_time_seconds: 30 }]
    }]);
    const [clients, setClients] = useState<any[]>([]);
    const [selectedClient, setSelectedClient] = useState('');

    useEffect(() => {
        if (user) {
            fetch(`/api/users?coachId=${encodeURIComponent(user.id)}`).then(res => res.json()).then(data => { if (Array.isArray(data)) setClients(data); });
        }
    }, [user]);

    const addRound = () => setRounds([...rounds, { id: Math.random().toString(36).substr(2, 9), exercises: [] }]);
    const duplicateRound = (sourceIndex: number) => {
        const source = rounds[sourceIndex];
        const newExercises = source.exercises.map(ex => ({ ...ex, id: Math.random().toString(36).substr(2, 9) }));
        setRounds([...rounds, { id: Math.random().toString(36).substr(2, 9), exercises: newExercises }]);
    };
    const removeRound = (index: number) => setRounds(rounds.filter((_, i) => i !== index));
    const addExerciseToRound = (roundIndex: number) => {
        const newRounds = [...rounds];
        newRounds[roundIndex].exercises.push({
            id: Math.random().toString(36).substr(2, 9),
            name: 'Squat',
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
        newRounds[roundIndex].exercises[exIndex] = { ...newRounds[roundIndex].exercises[exIndex], [field]: value };
        setRounds(newRounds);
    };

    const getFilteredOptions = (filter: string) => {
        if (filter === 'all') return EXERCISE_OPTIONS_ALL;
        return EXERCISE_OPTIONS_ALL.filter(opt => opt.category === filter);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const flatList: any[] = [];
            const counts: Record<string, number> = {};
            const totals: Record<string, number> = {};
            rounds.forEach(round => round.exercises.forEach(ex => totals[ex.name] = (totals[ex.name] || 0) + 1));
            rounds.forEach((round, roundIndex) => {
                round.exercises.forEach(ex => {
                    counts[ex.name] = (counts[ex.name] || 0) + 1;
                    flatList.push({ name: ex.name, reps: ex.reps, weight: ex.weight, rest_time_seconds: ex.rest_time_seconds, set_index: counts[ex.name], total_sets: totals[ex.name] });
                });
            });

            const res = await fetch('/api/menus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-user-id': user?.id || '' },
                body: JSON.stringify({ name: menuName, exerciseList: flatList, clientId: selectedClient })
            });
            if (!res.ok) throw new Error('Failed');
            router.push('/coach/dashboard');
        } catch (error) {
            alert('Error creating menu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans pb-32 relative overflow-hidden selection:bg-blue-500/30">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }} />

            <div className="relative z-10">
                <header className="max-w-4xl mx-auto mb-10 flex items-center gap-6">
                    <Link href="/coach/dashboard" className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800 shadow-sm"><ArrowLeft className="w-5 h-5 text-zinc-400" /></Link>
                    <div><h1 className="text-3xl font-light text-white tracking-wide">Program <span className="font-bold text-blue-500">Composer</span></h1></div>
                </header>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-zinc-950/80 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Program Name</label>
                                <input type="text" placeholder="e.g. Hypertrophy A" value={menuName} onChange={(e) => setMenuName(e.target.value)} className="w-full text-xl font-bold bg-transparent border-b-2 border-zinc-800 focus:border-blue-500 outline-none py-3 transition-colors placeholder:text-zinc-700 text-white" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Assign To Client</label>
                                <div className="relative">
                                    <select
                                        value={selectedClient}
                                        onChange={(e) => setSelectedClient(e.target.value)}
                                        className="w-full text-lg bg-blue-500 border border-transparent rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-400 transition-colors appearance-none text-black font-bold shadow-md cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-zinc-900 text-white font-medium">Select a client...</option>
                                        {clients.map(c => <option key={c.id} value={c.id} className="bg-zinc-900 text-white font-medium">{c.name}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                        <ChevronDown className="w-5 h-5 text-black" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {rounds.map((round, roundIndex) => (
                            <motion.div key={round.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-6 md:p-8 relative shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black text-zinc-500 uppercase tracking-tighter flex items-center gap-2"><span className="text-4xl text-white">#{ (roundIndex + 1).toString().padStart(2, '0') }</span> SET</h3>
                                    <div className="flex items-center gap-2">
                                        <button type="button" onClick={() => duplicateRound(roundIndex)} className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-xl transition-all"><Copy className="w-5 h-5" /></button>
                                        <button type="button" onClick={() => removeRound(roundIndex)} disabled={rounds.length === 1} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all disabled:opacity-0"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {round.exercises.map((ex, exIndex) => {
                                        const filteredOptions = getFilteredOptions(ex.categoryFilter);
                                        return (
                                            <div key={ex.id} className="bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-800 flex flex-col md:flex-row gap-4 items-center">
                                                {/* Per‑row category filter buttons */}
                                                <div className="flex flex-wrap gap-1">
                                                    {CATEGORY_FILTERS.map(cat => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => updateExercise(roundIndex, exIndex, 'categoryFilter', cat.id)}
                                                            className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                                                                ex.categoryFilter === cat.id
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                                            }`}
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 md:hidden">Exercise</label>
                                                    <div className="relative">
                                                        <select
                                                            value={ex.name}
                                                            onChange={(e) => updateExercise(roundIndex, exIndex, 'name', e.target.value)}
                                                            className="w-full bg-blue-500 border border-transparent rounded-lg py-3 px-4 font-bold text-black focus:outline-none cursor-pointer appearance-none shadow-md"
                                                        >
                                                            {filteredOptions.map(opt => (
                                                                <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white font-medium">{opt.value}</option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                                                            <ChevronDown className="w-4 h-4 text-black" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 w-full md:w-auto">
                                                    <div><label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 text-center">Reps</label><input type="number" value={isNaN(ex.reps) ? '' : ex.reps} onChange={(e) => updateExercise(roundIndex, exIndex, 'reps', parseInt(e.target.value))} className="w-full md:w-16 bg-black border border-zinc-800 rounded-lg px-2 py-2.5 text-center font-mono text-sm focus:border-blue-500 outline-none text-white" /></div>
                                                    <div><label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 text-center">Kg</label><input type="number" value={isNaN(ex.weight) ? '' : ex.weight} onChange={(e) => updateExercise(roundIndex, exIndex, 'weight', parseFloat(e.target.value))} className="w-full md:w-16 bg-black border border-zinc-800 rounded-lg px-2 py-2.5 text-center font-mono text-sm focus:border-blue-500 outline-none text-white" /></div>
                                                    <div><label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 text-center">Rest</label><input type="number" value={isNaN(ex.rest_time_seconds) ? '' : ex.rest_time_seconds} onChange={(e) => updateExercise(roundIndex, exIndex, 'rest_time_seconds', parseFloat(e.target.value))} className="w-full md:w-16 bg-black border border-zinc-800 rounded-lg px-2 py-2.5 text-center font-mono text-sm focus:border-blue-500 outline-none text-blue-400" /></div>
                                                </div>
                                                <button type="button" onClick={() => removeExerciseFromRound(roundIndex, exIndex)} className="p-2 text-zinc-600 hover:text-red-400 transition-colors mt-4 md:mt-0"><Trash2 className="w-5 h-5 md:w-4 md:h-4" /></button>
                                            </div>
                                        );
                                    })}
                                    <button type="button" onClick={() => addExerciseToRound(roundIndex)} className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Exercise</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center py-6">
                        <button type="button" onClick={addRound} className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white px-8 py-3 rounded-full font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-2 tracking-widest text-sm uppercase">
                            <Plus className="w-5 h-5 text-blue-500" /> ADD NEW SET
                        </button>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-lg border-t border-zinc-800 flex justify-center z-50">
                         <button type="submit" disabled={isSubmitting} className="w-full max-w-md bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] transform transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3">
                            {isSubmitting ? 'Saving...' : 'Deploy Program'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}