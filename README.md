<!-- markdownlint-disable MD033 -->
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/TensorFlow.js-AI-FF6F00?style=for-the-badge&logo=tensorflow" alt="TensorFlow.js" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/Beasty350/straps?style=social" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/Beasty350/straps?style=social" alt="GitHub forks" />
  <img src="https://img.shields.io/github/license/Beasty350/straps?style=flat-square" alt="License" />
</p>

<br />

<div align="center">
  <h1>🏋️‍♂️ STRAPS</h1>
  <p><strong>Strength Training & Rehabilitation Assessment Platform</strong></p>
  <p>AI‑powered movement analysis for clients and coaches</p>
  <br />
</div>

## 📖 About

**STRAPS** is a modern web application that helps physical therapists, coaches, and individuals track strength training and rehabilitation progress. Using **real‑time AI pose detection** (MediaPipe + TensorFlow.js), it analyzes movement patterns, detects imbalances, and provides data‑driven insights — all in your browser.

> 🔥 **Why STRAPS?**  
> No expensive hardware, no manual logging. Just a webcam and a few seconds to get actionable feedback.

## ✨ Key Features

| Feature | What it does |
|---------|---------------|
| 🤖 **AI Pose Analysis** | Real‑time joint tracking and movement assessment |
| 👥 **Dual Roles** | Separate dashboards for **clients** (track progress) and **coaches** (manage patients) |
| 📈 **Progress Over Time** | Visual charts and history of rehabilitation metrics |
| 🔐 **Secure Auth** | NextAuth.js with session management and protected routes |
| 📲 **QR Code Access** | Instantly share patient data or join a session |
| 🗄️ **Database Ready** | Prisma ORM with migrations – works with PostgreSQL, MySQL, SQLite |
| 🐳 **Container First** | Dockerfile included for easy deployment anywhere |

## 🛠️ Tech Stack

<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs,ts,tailwind,prisma,docker,vercel" />
</p>

- **Framework:** Next.js 16 (App Router) + TypeScript  
- **Styling:** Tailwind CSS 4, Framer Motion, Lucide React  
- **AI/ML:** TensorFlow.js, MediaPipe Pose Detection  
- **Database:** Prisma ORM (PostgreSQL / MySQL / SQLite)  
- **Authentication:** NextAuth.js  
- **Email/SMS:** Nodemailer, Twilio  
- **Validation:** Zod  
- **Deployment:** Docker, Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (or Bun / pnpm / yarn)
- (Optional) Docker

### Local Development (3 minutes)

```bash
# 1. Clone the repo
git clone https://github.com/Beasty350/straps.git
cd straps

# 2. Install dependencies
npm install

# 3. Set up environment (edit .env.local with your DB)
cp .env.example .env.local

# 4. Run database migrations
npx prisma migrate dev

# 5. Start everything (Next.js + Prisma Studio)
npm run dev