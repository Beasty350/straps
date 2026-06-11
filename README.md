STRAPS - Web-Based Strength Training and Rehabilitation Assessment App

STRAPS is a web application designed to assist with strength training and rehabilitation assessments. It leverages AI pose detection technology to analyze movement patterns, track progress, and provide data-driven insights for clients and coaches.

✨ Features
AI-Powered Pose Analysis: Real-time movement assessment using MediaPipe and TensorFlow.js

Dual User Roles: Separate interfaces for clients and coaches

Progress Tracking: Monitor rehabilitation progress over time

Secure Authentication: NextAuth.js with session management

QR Code Integration: Quick access to patient data and sessions

Database Persistence: Prisma ORM with scalable database management

Container Ready: Docker support for easy deployment

🛠️ Tech Stack
Framework: Next.js 16 (App Router) with TypeScript

UI: Tailwind CSS 4, Framer Motion, Lucide React

AI/ML: TensorFlow.js, MediaPipe Pose Detection

Database: Prisma ORM

Authentication: NextAuth.js

Email/SMS: Nodemailer, Twilio

Validation: Zod

Deployment: Docker, Vercel

📋 Prerequisites
Node.js 20+

npm / yarn / pnpm / bun

(Optional) Docker

🚀 Getting Started
Local Development

Clone the repository:
git clone https://github.com/Beasty350/straps.git
cd straps

Install dependencies:
npm install

Set up environment variables:
cp .env.example .env.local

Run database migrations:
npx prisma migrate dev

Start the development server:
npm run dev

The Next.js development server and Prisma Studio will run concurrently.

Open http://localhost:3000 to view the app.

Docker Deployment
docker build -t straps .
docker run -p 3000:3000 straps

🔧 Available Scripts
Command	Description
npm run dev	Starts Next.js dev server + Prisma Studio
npm run build	Generates Prisma client and builds Next.js
npm run start	Starts production server
npm run lint	Runs ESLint
npm run db:studio	Opens Prisma Studio

🌍 Environment Variables
Create a .env.local file with the following variables:

env
DATABASE_URL="your_database_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

📁 Project Structure
text
straps/
├── app/                # Next.js App Router pages and layouts
│   ├── api/           # API routes
│   ├── client/        # Client dashboard and interfaces
│   └── coach/         # Coach dashboard and management
├── lib/               # Utility functions and shared logic
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── scripts/           # Utility scripts
└── debug_menu.js      # Development debugging utility
📚 Learn More
Next.js Documentation

Prisma Documentation

TensorFlow.js Pose Detection

MediaPipe

🚢 Deployment
The easiest way to deploy is using Vercel:

bash
npm run build
For containerized deployment, use the included Dockerfile.