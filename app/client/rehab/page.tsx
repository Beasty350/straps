'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Move, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RehabHubPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-blue-500/30">
      {/* Background pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(37, 99, 235, 0.08) 10px, rgba(37, 99, 235, 0.08) 20px)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link
            href="/client"
            className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-500" />
              Rehab & Movement Analysis
            </h1>
            <p className="text-zinc-400 mt-1">
              Select an assessment tool to begin real‑time motion tracking
            </p>
          </div>
        </div>

        {/* Two main cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Gait Analysis Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative bg-zinc-950/80 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden hover:border-blue-500/50 transition-all"
          >
            <Link href="/client/rehab/gait" className="block p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Activity className="w-7 h-7" />
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Gait Analysis</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Analyze walking pattern, step length, cadence, symmetry, and stability. 
                Perfect for post‑injury rehabilitation and performance assessment.
              </p>
              <div className="mt-6 flex gap-2 text-xs text-blue-400">
                <span className="px-2 py-1 bg-blue-500/10 rounded-full">Side View</span>
                <span className="px-2 py-1 bg-blue-500/10 rounded-full">Rear View</span>
                <span className="px-2 py-1 bg-blue-500/10 rounded-full">Real‑time metrics</span>
              </div>
            </Link>
          </motion.div>

          {/* ROM Analysis Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group relative bg-zinc-950/80 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden hover:border-green-500/50 transition-all"
          >
            <Link href="/client/rehab/rom" className="block p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                  <Move className="w-7 h-7" />
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-green-400 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Range of Motion (ROM)</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Measure active joint angles for shoulders, elbows, hips, knees, and ankles. 
                Track min/max ROM to assess flexibility and progress.
              </p>
              <div className="mt-6 flex gap-2 text-xs text-green-400">
                <span className="px-2 py-1 bg-green-500/10 rounded-full">Upper body</span>
                <span className="px-2 py-1 bg-green-500/10 rounded-full">Lower body</span>
                <span className="px-2 py-1 bg-green-500/10 rounded-full">Joint‑specific</span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Info footer */}
        <div className="mt-12 text-center text-xs text-zinc-600 border-t border-zinc-800 pt-6">
        </div>
      </div>
    </div>
  );
}