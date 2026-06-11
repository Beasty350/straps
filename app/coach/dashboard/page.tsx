'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, User, Clock, ShieldAlert, Plus, Users, UserPlus, LogOut, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { AuthProvider, useAuth } from '@/lib/auth';

export default function DashboardPageWrap() {
    return (
        <AuthProvider>
            <DashboardPage />
        </AuthProvider>
    );
}

function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [greeting, setGreeting] = useState('');
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [stats, setStats] = useState({
        totalMenus: 0,
        totalSessions: 0, 
        sessionsToday: 0,
        recentMenus: [] as any[],
        recentRecaps: [] as any[],
        linkedClients: [] as any[]
    });

    const [isAddingClient, setIsAddingClient] = useState(false);
    const [clientIdToAdd, setClientIdToAdd] = useState('');
    const [addClientStatus, setAddClientStatus] = useState('');

    useEffect(() => {
        if (user) {
            setIsAuthLoading(false);
        } else {
            const timer = setTimeout(() => {
                if (!user) router.replace('/');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [user, router]);

    const loadData = React.useCallback(async () => {
        if (!user) return;
        
        if (user.role !== 'COACH') {
            window.location.href = '/'; 
            return;
        }

        try {
            const headers = { 'x-user-id': user.id };
            const resRecaps = await fetch('/api/recap', { headers });
            const recaps = await resRecaps.json();
            const resMenus = await fetch('/api/menus', { headers });
            const menus = await resMenus.json();
            const resClients = await fetch(`/api/users?coachId=${user.id}`);
            const clients = await resClients.json();
            
            if (Array.isArray(recaps) && Array.isArray(menus)) {
                const today = new Date().toDateString();
                const todaysRecaps = recaps.filter((r: any) => new Date(r.completedAt).toDateString() === today);
                
                const validClients = Array.isArray(clients) ? clients : [];

                // 🚀 NEW FEATURE: Hide completed programs from the dashboard
                const pendingMenus = menus.filter((m: any) => {
                    if (m.clientId) {
                        // Assigned to ONE specific client: check if they did it
                        const isCompleted = recaps.some((r: any) => r.menuId === m.id && r.userId === m.clientId);
                        return !isCompleted; 
                    } else {
                        // Assigned to ALL clients: wait until EVERY linked client has done it
                        if (validClients.length === 0) return true; // Keep visible if coach has no clients yet
                        const allCompleted = validClients.every((c: any) => 
                            recaps.some((r: any) => r.menuId === m.id && r.userId === c.id)
                        );
                        return !allCompleted;
                    }
                });
                
                setStats({
                    totalMenus: menus.length, // Keep absolute total for the stats counter
                    totalSessions: recaps.length,
                    sessionsToday: todaysRecaps.length,
                    // Use pendingMenus instead of menus for the table
                    recentMenus: pendingMenus.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
                    recentRecaps: recaps.sort((a: any, b: any) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()).slice(0, 5),
                    linkedClients: validClients
                });
            }
        } catch (e) {
            console.error("Failed to load dashboard stats", e);
        }
    }, [user]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
        
        loadData();
    }, [user, loadData]);

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !clientIdToAdd) return;
        setAddClientStatus('Linking...');

        try {
            const res = await fetch('/api/coach/link-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coachId: user.id, clientId: clientIdToAdd })
            });
            const data = await res.json();
            if (res.ok) {
                setAddClientStatus('Client Linked!');
                setClientIdToAdd('');
                setIsAddingClient(false);
                await loadData();
            } else {
                setAddClientStatus(data.error || 'Failed to link');
            }
        } catch (e) {
            setAddClientStatus('Error linking client');
        }
    };

    const handleUnlinkClient = async (clientId: string) => {
        if (!confirm("Are you sure you want to unbind this client?")) return;

        try {
            const res = await fetch('/api/coach/unlink-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coachId: user?.id, clientId })
            });

            const data = await res.json();
            if (res.ok) {
                await loadData(); // refresh the list
            } else {
                alert(data.error || "Failed to unlink client. Please try again.");
            }
        } catch (e) {
            console.error("Failed to unlink client", e);
            alert("Network error while trying to unlink.");
        }
    };

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
    
    const handleDeleteMenu = async (id: string) => {
        if (!window.confirm('Delete this program? This cannot be undone.')) return;
        try {
            await fetch(`/api/menus?id=${id}`, { method: 'DELETE' });
            await loadData();
        } catch (e) {
            console.error('Failed to delete menu', e);
        }
    };

    const handleDeleteRecap = async (id: string) => {
        if (!window.confirm('Delete this activity report? This cannot be undone.')) return;
        try {
            await fetch(`/api/recap?id=${id}`, { method: 'DELETE' });
            await loadData();
        } catch (e) {
            console.error('Failed to delete recap', e);
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

    return (
        <div className="min-h-screen bg-black text-white p-10 font-sans selection:bg-blue-500/30 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)' }} />
            
            <div className="absolute top-8 left-8 z-50">
                <button 
                    onClick={handleLogout} 
                    className="p-3 bg-zinc-950/80 backdrop-blur-sm hover:bg-red-900/20 text-zinc-400 hover:text-red-400 rounded-full transition-colors border border-zinc-800 shadow-sm"
                    title="Log Out"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pl-16">
                <header className="mb-16 border-b border-zinc-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-5xl font-light tracking-tight text-white mb-2">
                            {greeting}, <span className="font-bold text-blue-500">{user?.name || 'Coach'}</span>.
                        </h1>
                        <p className="text-zinc-400 text-sm tracking-wide mt-2 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            SYSTEM ACTIVE
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/coach/menu/new" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] flex items-center gap-2 text-sm tracking-wide">
                                <Plus className="w-4 h-4" /> NEW PROGRAM
                        </Link>
                    </div>
                </header>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={container} initial="hidden" animate="show">
                    <StatsCard title="Total Training Menus" value={stats.totalMenus.toString()} icon={<Activity className="text-blue-500/20" />} variant={item} />
                    <StatsCard title="Total Sessions (All Time)" value={stats.totalSessions.toString()} icon={<User className="text-purple-500/20" />} variant={item} />
                    <StatsCard title="Sessions Today" value={stats.sessionsToday.toString()} icon={<ShieldAlert className="text-green-500/20" />} variant={item} />
                </motion.div>

                <motion.div className="mt-12 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <h2 className="text-xl font-bold mb-4 text-white">Live Activity Feed</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <span className="w-16">Now</span>
                            <span className="text-zinc-300">System monitoring active...</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="mt-6 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">My Clients</h2>
                        <button onClick={() => setIsAddingClient(!isAddingClient)} className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1 bg-blue-900/20 px-3 py-1 rounded-full transition-colors border border-blue-900/30">
                            <UserPlus className="w-4 h-4" /> Add Client
                        </button>
                    </div>

                    {isAddingClient && (
                        <form onSubmit={handleAddClient} className="mb-6 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 animate-in fade-in slide-in-from-top-2 flex items-center gap-4">
                            <input type="text" placeholder="Enter Client ID" value={clientIdToAdd} onChange={(e) => setClientIdToAdd(e.target.value)} className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm w-48 font-mono text-white focus:border-blue-500/50 outline-none" />
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-500">Link</button>
                            {addClientStatus && <span className="text-xs font-bold text-blue-400">{addClientStatus}</span>}
                        </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {stats.linkedClients.map((client: any) => (
                            <div key={client.id} className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-900/50">
                                    {client.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{client.name}</div>
                                    <div className="text-xs text-zinc-500">ID: {client.id}</div>
                                </div>
                                <button 
                                    onClick={() => handleUnlinkClient(client.id)}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-900/30"
                                >
                                    Unbind
                                </button>
                            </div>
                        ))}
                        {stats.linkedClients.length === 0 && <div className="col-span-3 text-center py-8 text-zinc-500 italic">No clients linked yet. Add one above.</div>}
                    </div>
                </motion.div>

                <motion.div className="mt-6 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <h2 className="text-xl font-bold mb-4 text-white">Active & Pending Programs</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-500 text-sm uppercase tracking-wider">
                                    <th className="pb-3 font-medium">Program Name</th>
                                    <th className="pb-3 font-medium">Client Access</th>
                                    <th className="pb-3 font-medium">Created At</th>
                                    <th className="pb-3 font-medium">Exercises</th>
                                    <th className="pb-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {stats.recentMenus.map((menu: any) => (
                                    <tr key={menu.id} className="group hover:bg-zinc-900/50 transition-colors">
                                        <td className="py-4 font-medium text-zinc-200">{menu.name || `Program #${menu.id.substring(0,6).toUpperCase()}`}</td>
                                        <td className="py-4 text-zinc-400 font-medium">
                                            {menu.clientId ? (
                                                <span className="bg-blue-900/20 text-blue-400 px-2 py-1 rounded-md text-xs border border-blue-900/30">
                                                    Client: {menu.clientId.substring(0, 6).toUpperCase()}
                                                </span>
                                            ) : (
                                                <span className="bg-purple-900/20 text-purple-400 px-2 py-1 rounded-md text-xs border border-purple-900/30">
                                                    Available to All Clients
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 text-zinc-500 text-sm">{new Date(menu.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 text-zinc-500 text-sm">{(() => { if (!menu.exerciseList) return 0; if (Array.isArray(menu.exerciseList)) return menu.exerciseList.length; try { return JSON.parse(menu.exerciseList as string).length; } catch { return 0; } })()} exercises</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/coach/menu/${menu.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteMenu(menu.id)}
                                                    className="text-zinc-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-900/20"
                                                    title="Delete program"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {stats.recentMenus.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-zinc-500 italic">All assigned programs have been completed!</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <motion.div className="mt-6 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 shadow-sm mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <h2 className="text-xl font-bold mb-4 text-white">Recent Activity Reports</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-500 text-sm uppercase tracking-wider">
                                    <th className="pb-3 font-medium">Date</th>
                                    <th className="pb-3 font-medium">Client</th>
                                    <th className="pb-3 font-medium">Program</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {stats.recentRecaps.map((recap: any) => (
                                    <tr key={recap.id} className="group hover:bg-zinc-900/50 transition-colors">
                                        <td className="py-4 text-zinc-500 text-sm">{new Date(recap.completedAt).toLocaleString()}</td>
                                        <td className="py-4 font-medium text-white">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 text-xs font-bold border border-blue-900/50">
                                                    {recap.user?.name ? recap.user.name[0] : '?'}
                                                </div>
                                                {recap.user?.name || 'Unknown Client'}
                                            </div>
                                        </td>
                                        <td className="py-4 text-zinc-400 text-sm">Program #{recap.menuId ? recap.menuId.substring(0,6).toUpperCase() : 'CUSTOM'}</td>
                                        <td className="py-4">
                                            <span className="bg-green-900/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-900/30">COMPLETED</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/coach/recap/${recap.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-bold">
                                                    View Report
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteRecap(recap.id)}
                                                    className="text-zinc-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-900/20"
                                                    title="Delete report"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {stats.recentRecaps.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-zinc-500 italic">No activity recorded yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, variant }: any) {
    return (
        <motion.div variants={variant} className="p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 hover:border-blue-500/50 transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0">{icon}</div>
            <div className="relative z-10">
                <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">{title}</h3>
                <div className="text-5xl font-light text-white tracking-tighter">{value}</div>
            </div>
        </motion.div>
    );
}