'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Eye, ArrowRight, Activity as ActivityIcon, LogOut, X, UserCheck, UserPlus, Calendar, User, Activity } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, AuthProvider } from '@/lib/auth';

export default function ClientHubWrap() {
    return (
        <AuthProvider>
            <ClientHub />
        </AuthProvider>
    );
}

function ClientHub() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Coach linking/unlinking states
    const [coachIdInput, setCoachIdInput] = useState('');
    const [isLinking, setIsLinking] = useState(false);
    const [isUnlinking, setIsUnlinking] = useState(false);
    const [linkError, setLinkError] = useState('');

    // Local coach status
    const [isLinked, setIsLinked] = useState(false);
    const [coachName, setCoachName] = useState('');

    useEffect(() => {
        if (user) {
            setIsAuthLoading(false);
            const activeCoachId = (user as any).coachId || (user as any).coach_id || (user as any).coach?.id;
            setIsLinked(!!activeCoachId);
            if (activeCoachId) {
                setCoachName((user as any).coach?.name || `ID: ${activeCoachId.substring(0, 8)}...`);
            }
        } else {
            const timer = setTimeout(() => {
                if (!user) router.replace('/');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    const handleLinkCoach = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !coachIdInput) return;
        
        setIsLinking(true);
        setLinkError('');

        try {
            const res = await fetch('/api/coach/link-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coachId: coachIdInput, clientId: user.id })
            });
            const data = await res.json();
            
            if (res.ok) {
                setIsLinked(true);
                setCoachName(`ID: ${coachIdInput.substring(0, 8)}...`);
                setCoachIdInput('');
            } else {
                setLinkError(data.error || 'Failed to link coach');
            }
        } catch (err) {
            setLinkError('Network error');
        } finally {
            setIsLinking(false);
        }
    };

    const handleUnlinkCoach = async () => {
        if (!user) return;
        if (!confirm("Are you sure you want to disconnect from your coach?")) return;
        setIsUnlinking(true);

        try {
            const res = await fetch('/api/coach/unlink-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientId: user.id })
            });

            const data = await res.json();
            if (res.ok) {
                setIsLinked(false);
                setCoachName('');
                alert("Coach disconnected successfully.");
            } else {
                alert(data.error || "Failed to unlink coach.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error while trying to unlink.");
        } finally {
            setIsUnlinking(false);
        }
    };

    if (isAuthLoading || !user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest animate-pulse">Authenticating...</div>
            </div>
        );
    }

    const isConnectedToCoach = isLinked;
    const displayCoachName = coachName || (user.coach?.name || `ID: ${(user as any).coachId?.substring(0, 8)}...`);

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-blue-500/30 flex flex-col items-center relative pb-32 overflow-hidden">
            
            <div 
                className="fixed inset-0 z-0 pointer-events-none opacity-20" 
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }}
            />
            
            <div className="absolute top-8 left-4 md:left-8 z-50">
                <button 
                    onClick={handleLogout} 
                    className="p-3 bg-zinc-950/80 backdrop-blur-sm hover:bg-red-900/20 text-zinc-400 hover:text-red-400 rounded-full transition-colors border border-zinc-800 shadow-sm"
                    title="Log Out"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            <div className="absolute top-8 right-4 md:right-8 z-50 flex flex-col items-end gap-2">
                {isConnectedToCoach ? (
                    <div className="bg-zinc-950/90 backdrop-blur-md border border-blue-900/50 p-3 rounded-2xl shadow-xl flex items-center gap-4 transition-all">
                        <div className="flex items-center gap-3 hidden md:flex">
                            <div className="w-10 h-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30 shadow-inner">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <div className="text-left pr-2">
                                <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mb-0.5">Connected Coach</p>
                                <p className="text-sm font-bold text-white leading-tight">{displayCoachName}</p>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-zinc-800 mx-1 hidden md:block"></div>
                        <button 
                            onClick={handleUnlinkCoach} 
                            disabled={isUnlinking} 
                            className="p-2 hover:bg-red-900/20 text-zinc-500 hover:text-red-400 rounded-xl transition-colors group flex items-center gap-2" 
                            title="Disconnect Coach"
                        >
                            <span className="text-[10px] uppercase font-bold text-zinc-500 group-hover:text-red-400 md:hidden">Disconnect</span>
                            {isUnlinking ? <div className="w-4 h-4 border-2 border-zinc-600 border-t-red-500 rounded-full animate-spin"></div> : <X size={18} className="group-hover:scale-110 transition-transform" />}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLinkCoach} className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 p-4 rounded-2xl shadow-sm flex flex-col gap-3 items-end w-64">
                        <div className="w-full flex items-center gap-2 mb-1">
                            <UserPlus className="w-4 h-4 text-zinc-500" />
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">No Coach Connected</p>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <input 
                                type="text" 
                                placeholder="Enter Coach ID" 
                                value={coachIdInput}
                                onChange={(e) => setCoachIdInput(e.target.value)}
                                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/80 w-full transition-colors font-mono"
                            />
                            <button 
                                type="submit" 
                                disabled={isLinking || !coachIdInput} 
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:hover:bg-blue-600 shrink-0 shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]"
                            >
                                {isLinking ? '...' : 'Link'}
                            </button>
                        </div>
                        {linkError && <span className="text-[10px] text-red-400 font-medium w-full text-left">{linkError}</span>}
                    </form>
                )}
            </div>

            <div className="max-w-5xl w-full relative z-10 py-24 md:py-16">
                <header className="mb-16 text-center mt-12 md:mt-0">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <h1 className="text-4xl md:text-5xl font-light tracking-widest text-zinc-100">
                             Hello, <span className="font-bold text-blue-500">{user?.name || 'Client'}</span>.
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-zinc-400 mt-2 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-800">
                            <span>ID: <strong className="text-zinc-200">{user?.id}</strong></span>
                            {isConnectedToCoach && (
                                <>
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                    <span className="flex items-center gap-1">Status: <span className="text-green-400 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Managed</span></span>
                                </>
                            )}
                        </div>
                     </div>
                     <p className="text-zinc-400 text-base md:text-lg">What would you like to focus on today?</p>
                </header>

                {/* 2x2 Grid Layout: Top 2 buttons, Bottom 2 buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Button 1: Start Training */}
                    <Link href="/client/training" className="group">
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-950/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-zinc-800 shadow-xl group-hover:border-blue-500/50 transition-all h-full flex flex-col items-start relative overflow-hidden group-hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.15)]">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500"><PlayCircle className="w-32 h-32 text-blue-500" /></div>
                            <div className="w-16 h-16 rounded-2xl bg-blue-900/20 text-blue-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-blue-500/20 relative z-10">
                                <PlayCircle className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">Start Training</h2>
                            <p className="text-zinc-400 mb-8 flex-1 relative z-10 text-sm md:text-base">Execute your assigned rehabilitation program. Follow real-time guidance and track your reps.</p>
                            <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all relative z-10">
                                Begin Session <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Button 2: Free Style */}
                    <Link href="/client/free" className="group">
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-950/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-zinc-800 shadow-xl group-hover:border-purple-500/50 transition-all h-full flex flex-col items-start relative overflow-hidden group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500"><ActivityIcon className="w-32 h-32 text-purple-500" /></div>
                            <div className="w-16 h-16 rounded-2xl bg-purple-900/20 text-purple-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-purple-500/20 relative z-10">
                                <ActivityIcon className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">Free Style</h2>
                            <p className="text-zinc-400 mb-8 flex-1 relative z-10 text-sm md:text-base">Build a custom workout session on the fly. Select exercises, sets, and reps at your own pace.</p>
                            <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all relative z-10">
                                Build Workout <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Button 3: Gait Rehab (Yellow) */}
                    <Link href="/client/rehab" className="group">
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-950/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-zinc-800 shadow-xl group-hover:border-yellow-500/50 transition-all h-full flex flex-col items-start relative overflow-hidden group-hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)]">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500"><Activity className="w-32 h-32 text-yellow-500" /></div>
                            <div className="w-16 h-16 rounded-2xl bg-yellow-900/20 text-yellow-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-yellow-500/20 relative z-10">
                                <Activity className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">Rehabilitation</h2>
                            <p className="text-zinc-400 mb-8 flex-1 relative z-10 text-sm md:text-base">Upload walking videos for side or rear view gait analysis. Get step width, symmetry, stability scores and more.</p>
                            <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all relative z-10">
                                Analyze Gait <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Button 4: Live Monitor */}
                    <Link href="/client/monitor" className="group">
                        <motion.div whileHover={{ y: -5 }} className="bg-zinc-950/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-zinc-800 shadow-xl group-hover:border-green-500/50 transition-all h-full flex flex-col items-start relative overflow-hidden group-hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)]">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500"><Eye className="w-32 h-32 text-green-500" /></div>
                            <div className="w-16 h-16 rounded-2xl bg-green-900/20 text-green-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-green-500/20 relative z-10">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">Live Monitor</h2>
                            <p className="text-zinc-400 mb-8 flex-1 relative z-10 text-sm md:text-base">Continuous activity recognition. Monitors posture (Sitting/Standing) and detects falls in real-time.</p>
                            <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all relative z-10">
                                Launch Monitor <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>
                </div>

                <div className="mt-16 bg-zinc-950/80 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-zinc-800 shadow-sm">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <ActivityIcon className="w-5 h-5 text-blue-500" />
                        Workout History & Reports
                    </h3>
                    <ActivityList />
                </div>
            </div>
        </div>
    );
}

function ActivityList() {
    const { user } = useAuth();
    const router = useRouter();
    const [sessions, setSessions] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            fetch('/api/recap', { headers: { 'x-user-id': user.id } })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setSessions(data);
                })
                .catch(err => console.error("Failed to fetch history", err));
        }
    }, [user]);

    if (sessions.length === 0) {
        return <div className="text-zinc-500 italic py-8 text-center">No previous workouts found. Time to start training!</div>;
    }

    return (
        <div className="overflow-x-auto pb-4">
            <table className="w-full text-left min-w-[600px]">
                <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 text-sm uppercase tracking-wider">
                        <th className="pb-3 font-medium pl-4">Date</th>
                        <th className="pb-3 font-medium">Program Name</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                    {sessions.map((session, i) => (
                        <tr 
                            key={session.id || i} 
                            className="group hover:bg-zinc-900/50 transition-colors cursor-pointer" 
                            onClick={() => router.push(`/client/recap?id=${session.id}`)}
                        >
                            <td className="py-4 pl-4 text-zinc-300 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                                    {new Date(session.completedAt || session.created_at || new Date()).toLocaleString()}
                                </div>
                            </td>
                            <td className="py-4 text-zinc-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                                    {session.menu?.name || `Program #${session.menuId ? session.menuId.substring(0,6).toUpperCase() : 'CUSTOM'}`}
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="bg-green-900/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-900/30">
                                    COMPLETED
                                </span>
                            </td>
                            <td className="py-4">
                                <button className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1 uppercase tracking-widest">
                                    View Report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}