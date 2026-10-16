// Every project shown on the site. The order here is the order on the All Projects page.
// `featured: true` projects also appear in "Selected Projects" on the home page.
// `ai: true` counts toward the "AI products" stat in the hero.

import {
  Bot,
  BrainCircuit,
  ChartLine,
  Clapperboard,
  Cloud,
  Code,
  CreditCard,
  Database,
  Gamepad2,
  Gauge,
  History,
  Images,
  KeyRound,
  LayoutDashboard,
  MapPin,
  MonitorSmartphone,
  Package,
  Palette,
  PlugZap,
  Radio,
  Receipt,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  SunMedium,
  TestTubes,
  Users,
  Video,
  Wallet,
  Webcam,
  Zap,
} from 'lucide-react'

import smokescreen1 from '../assets/images/projects/smokescreen-1.webp'
import smokescreen2 from '../assets/images/projects/smokescreen-2.webp'
import smokescreen3 from '../assets/images/projects/smokescreen-3.webp'
import smokescreen4 from '../assets/images/projects/smokescreen-4.webp'
import smokescreen5 from '../assets/images/projects/smokescreen-5.webp'
import smokescreen6 from '../assets/images/projects/smokescreen-6.webp'
import smokescreen7 from '../assets/images/projects/smokescreen-7.webp'
import smokescreen8 from '../assets/images/projects/smokescreen-8.webp'
import chatspark1 from '../assets/images/projects/chatspark-1.webp'
import chatspark2 from '../assets/images/projects/chatspark-2.webp'
import chatspark3 from '../assets/images/projects/chatspark-3.webp'
import codemeet1 from '../assets/images/projects/codemeet-1.webp'
import codemeet2 from '../assets/images/projects/codemeet-2.webp'
import codemeet3 from '../assets/images/projects/codemeet-3.webp'
import comptoir1 from '../assets/images/projects/comptoir-1.webp'
import comptoir2 from '../assets/images/projects/comptoir-2.webp'
import comptoir3 from '../assets/images/projects/comptoir-3.webp'
import comptoir4 from '../assets/images/projects/comptoir-4.webp'
import comptoir5 from '../assets/images/projects/comptoir-5.webp'
import comptoir6 from '../assets/images/projects/comptoir-6.webp'
import billmate from '../assets/images/projects/billmate.webp'
import resumeforge from '../assets/images/projects/resumeforge.webp'
import stowe from '../assets/images/projects/stowe.webp'
import onyxchess from '../assets/images/projects/onyxchess.webp'
import livepin from '../assets/images/projects/livepin.webp'
import moviebrowser from '../assets/images/projects/moviebrowser.webp'
import pasteapp from '../assets/images/projects/pasteapp.webp'
import cryptotracker from '../assets/images/projects/cryptotracker.webp'
import skycast from '../assets/images/projects/skycast.webp'

export const projects = [
  {
    slug: 'smokescreen',
    title: 'SmokeScreen',
    subtitle: 'Live AI video transformation SaaS',
    label: 'Client project · JayTech Elite Firm',
    type: 'Client project',
    featuresTitle: 'What I built',
    featured: true,
    ai: true,
    year: '2026',
    role: 'Full-Stack Developer',
    deployed: 'Railway · Hostinger',
    status: 'V1 live · V2 in pre-launch',
    live: 'https://smokescreenapp.com/',
    liveLabel: 'Live site (V1)',
    tags: ['Node.js', 'Express', 'Supabase', 'Live AI Video', 'Flutterwave', 'Jest'],
    stack: [
      'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'Supabase (PostgreSQL)', 'Row Level Security',
      'Flutterwave', 'Squad', 'Google Gemini', 'fal.ai', 'MiniMax', 'Decart', 'Web Audio API', 'WebAssembly',
      'Resend', 'Google OAuth', 'Jest', 'Supertest', 'GitHub Actions', 'Railway', 'Hostinger',
    ],
    stats: [
      { value: '35+', label: 'Pages designed & built' },
      { value: '16', label: 'Live AI scenes' },
      { value: '3', label: 'AI creative tools' },
      { value: 'USD · NGN', label: 'Two-currency billing' },
    ],
    about: [
      'SmokeScreen is a live AI video SaaS. A creator turns on their webcam, picks a scene, and an AI model transforms how they look and where they are in real time. The output is captured through OBS straight into WhatsApp, Telegram, Zoom and Meet, with credit-based billing and tiered plans.',
      "I work on SmokeScreen with the company's Lead Developer through a pull-request based Git workflow. On V1, the live product, I fixed production bugs and shipped a portrait-mode dashboard. V2 is a complete rebuild that I designed and built most of: the design system and 35+ page frontend, the Express + Supabase backend, card payments and credit billing, AI creative tools, the admin panel, automated tests and deployment to Railway and Hostinger.",
    ],
    features: [
      {
        icon: Webcam,
        title: 'Live AI Studio',
        desc: 'Webcam capture and real-time AI scene transformation (16 scenes by plan) with editable, debounced prompts, plus recording as MP4, screenshots and OBS capture of the AI output. A hardened Go Live flow uses short-lived provider tokens, connection retries and a photo fallback.',
      },
      {
        icon: CreditCard,
        title: 'Payments & Credit Billing',
        desc: 'Flutterwave card payments with signed webhook verification and idempotent fulfillment, Squad as a backup gateway, USD and Naira pricing, per-second credit metering during live sessions, plan expiry, license keys and referral rewards.',
      },
      {
        icon: Sparkles,
        title: 'AI Creative Tools',
        desc: 'AI photo editing with Google Gemini, photo-to-video through fal.ai, and voice cloning with MiniMax: line-by-line emotion, Gemini auto-pacing, and an in-browser video-to-MP3 converter that runs WebAssembly in background Web Workers.',
      },
      {
        icon: LayoutDashboard,
        title: 'Admin Control Center',
        desc: 'A full operations console: a Today screen, customer search and activity, credit grants, license keys, payment-problem tools, bulk actions with typed confirms and undo, an audit log, support tickets, mass email, team roles, maintenance mode and CSV exports.',
      },
      {
        icon: ShieldCheck,
        title: 'Accounts & Security',
        desc: 'JWT sessions, Google sign-in, password change and reset by email, Supabase Row Level Security, recorded consent, upload consent with real storage deletion, and transactional emails (welcome, receipts, plan expiry) sent through Resend.',
      },
      {
        icon: TestTubes,
        title: 'Design, Testing & Deployment',
        desc: 'A dark creative-software design system, responsive from small phones to large screens. API and pages covered by Jest + Supertest suites that run on GitHub Actions. API deployed on Railway, website on Hostinger.',
      },
    ],
    images: [smokescreen1, smokescreen2, smokescreen3, smokescreen4, smokescreen5, smokescreen6, smokescreen7, smokescreen8],
    imageCaption: 'SmokeScreen V2 screens: the live studio, sign-in, photo editing, voice cloning, plans, credits, rewards and upgrades.',
    related: { label: 'My role at JayTech', to: '/jaytech' },
  },
  {
    slug: 'chatspark',
    title: 'ChatSpark AI',
    subtitle: 'RAG-based AI chatbot SaaS',
    featured: true,
    ai: true,
    year: '2026',
    role: 'Full-Stack Developer',
    deployed: 'Vercel',
    live: 'https://chatspark-ai-9hwh.vercel.app/',
    repo: 'https://github.com/Samiullah-2004/Chatspark-ai',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'pgvector', 'Groq', 'NextAuth.js'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'pgvector', 'Hugging Face', 'Groq (Llama 3.3)', 'NextAuth.js v5', 'Tailwind CSS', 'Vercel'],
    about: [
      'A full-stack AI chatbot SaaS. Users upload their documents, create custom chatbots trained on that content, and embed them on any website with a single script tag.',
      'Under the hood is a complete RAG pipeline I built from scratch: PDF text extraction, chunking, vector embeddings with Hugging Face, pgvector similarity search on PostgreSQL, and live answers generated by Groq (Llama 3.3). Built end to end with Next.js and TypeScript, from database schema to production deployment.',
    ],
    features: [
      { icon: BrainCircuit, title: 'Full RAG Pipeline', desc: 'PDF extraction, chunking, Hugging Face embeddings, pgvector similarity search and live LLM inference via Groq, wired together end to end.' },
      { icon: PlugZap, title: 'Embeddable Widget', desc: 'One script tag embeds a custom chatbot on any external website. The widget loads and answers in real time.' },
      { icon: KeyRound, title: 'Authentication', desc: 'GitHub OAuth and email/password sign-in with NextAuth.js v5.' },
      { icon: Users, title: 'Multi-Tenant Isolation', desc: "Every user's chatbots, documents and embeddings are scoped to their account, with Prisma connection pooling configured for serverless." },
    ],
    images: [chatspark2, chatspark3, chatspark1],
  },
  {
    slug: 'codemeet',
    title: 'CodeMeet AI',
    subtitle: 'Real-time technical interview platform',
    featured: true,
    ai: true,
    year: '2026',
    role: 'Full-Stack Developer',
    deployed: 'AWS EC2 (signaling server)',
    repo: 'https://github.com/Samiullah-2004/codemeet-ai',
    tags: ['Next.js', 'TypeScript', 'WebRTC', 'Socket.IO', 'DynamoDB', 'Gemini AI'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebRTC', 'Socket.IO', 'DynamoDB', 'AWS EC2', 'NextAuth.js', 'Monaco Editor', 'Google Gemini', 'Web Audio API', 'GitHub Actions'],
    about: [
      'A real-time technical interview platform built from scratch: peer-to-peer WebRTC video, a live shared Monaco code editor, real-time chat and AI code review powered by Google Gemini.',
      'Built with Next.js, TypeScript and Tailwind CSS. Socket.IO handles signaling on AWS EC2, DynamoDB stores interview sessions and NextAuth handles authentication. CI/CD ran from day one through GitHub Actions with OIDC, on a branch-protected Git workflow.',
    ],
    features: [
      { icon: Video, title: 'Peer-to-Peer Video', desc: 'WebRTC video calls with Socket.IO signaling and automatic peer negotiation. I fixed a race condition where signaling listeners were not attached until camera permission resolved.' },
      { icon: Code, title: 'Live Shared Code Editor', desc: 'A synchronized Monaco Editor, so the interviewer and candidate see every change in real time.' },
      { icon: Bot, title: 'AI Code Review', desc: 'Google Gemini reviews the submitted code and returns a summary, strengths, improvements and a score.' },
      { icon: Clapperboard, title: 'Client-Side Recording', desc: 'Call recording through canvas compositing and Web Audio mixing saves both participants to one file, with zero server storage cost.' },
    ],
    images: [codemeet2, codemeet1, codemeet3],
  },
  {
    slug: 'comptoir',
    title: 'Comptoir',
    subtitle: 'Full-stack restaurant ordering platform',
    featured: true,
    year: '2026',
    role: 'Full-Stack Developer',
    deployed: 'Vercel · Supabase',
    live: 'https://comptoir-food.vercel.app',
    repo: 'https://github.com/Samiullah-2004/comptoir',
    tags: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Socket.IO', 'Stripe'],
    stack: ['React', 'TypeScript', 'Apollo Client', 'Apollo Server v5', 'GraphQL', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Stripe', 'Socket.IO', 'Cloudinary', 'Recharts', 'Docker', 'Kubernetes', 'Vitest', 'Supertest', 'Playwright', 'GitHub Actions'],
    about: [
      'A full-stack restaurant and pizza ordering platform built with production-grade engineering. Customers browse a live GraphQL menu without needing an account, check out through Stripe and follow their order in real time over Socket.IO.',
      'Owners get an admin dashboard with full menu management, Cloudinary image uploads, role-based authentication and Recharts sales analytics. An embedded AI concierge powered by my own RAG pipeline (ChatSpark AI) helps customers order. The project is Dockerized, has Kubernetes manifests, is covered by Vitest, Supertest and Playwright tests, and ships through GitHub Actions CI/CD across 50 pull requests.',
    ],
    features: [
      { icon: Zap, title: 'Live GraphQL Menu', desc: 'Apollo Client and Apollo Server v5 drive real-time menu browsing, with instant cart updates and no sign-up needed to order.' },
      { icon: CreditCard, title: 'Stripe Checkout & Live Tracking', desc: 'Secure card payments through Stripe, with order states (preparing, baking, out for delivery) pushed live over Socket.IO.' },
      { icon: ChartLine, title: 'Admin Dashboard & Analytics', desc: 'Menu CRUD with Cloudinary uploads, role-based owner authentication, and sales and revenue analytics built with Recharts.' },
      { icon: TestTubes, title: 'Production Engineering', desc: 'Docker and Kubernetes (Minikube), 21 Vitest/Supertest tests plus Playwright E2E, and a GitHub Actions pipeline on a main/dev/feature-branch workflow.' },
    ],
    images: [comptoir1, comptoir2, comptoir3, comptoir4, comptoir5, comptoir6],
  },
  {
    slug: 'billmate',
    title: 'BillMate',
    subtitle: 'Freelance invoicing SaaS',
    featured: true,
    year: '2025',
    role: 'Full-Stack Developer',
    deployed: 'Vercel · Railway',
    live: 'https://bill-mate-three.vercel.app/',
    repo: 'https://github.com/Samiullah-2004/BillMate',
    tags: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma'],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'JWT', 'Vercel', 'Railway'],
    about: [
      'A full-stack invoicing SaaS for freelancers. BillMate handles client management, invoice creation with automatic numbering, payment status tracking and a live earnings dashboard.',
      'The REST API is built with Express and TypeScript following an MVC architecture, with Prisma on PostgreSQL for the data layer, JWT-protected multi-user routes and a clean React + Tailwind CSS frontend.',
    ],
    features: [
      { icon: Receipt, title: 'Invoice Management', desc: 'Create, edit and track invoices with automatic invoice numbers, due dates and payment status updates.' },
      { icon: Gauge, title: 'Live Earnings Dashboard', desc: 'An overview of total earnings, pending payments and paid invoices, with a breakdown per client.' },
      { icon: ShieldCheck, title: 'JWT Multi-User Auth', desc: 'Secure registration and login with JWT sessions. Every user has fully isolated client and invoice data.' },
    ],
    images: [billmate],
  },
  {
    slug: 'resumeforge',
    title: 'ResumeForge AI',
    subtitle: 'AI resume tailoring platform',
    featured: true,
    ai: true,
    year: '2026',
    role: 'Full-Stack Developer',
    deployed: 'Vercel',
    live: 'https://resumeforge-puce.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Groq', 'JWT'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Groq (Llama 3.3)', 'JWT', 'Tailwind CSS', 'Vercel'],
    about: [
      'An AI-powered resume tailoring platform. Paste a job description and ResumeForge rewrites your resume to match it, using live LLM inference through Groq.',
      'Built end to end with Next.js and TypeScript, from the PostgreSQL schema with Prisma to production deployment on Vercel, with JWT authentication, per-user resume history and a clean dashboard for managing tailored resumes.',
    ],
    features: [
      { icon: Sparkles, title: 'AI Resume Tailoring', desc: 'Rewrites a resume to match any job description using live inference through Groq (Llama 3.3).' },
      { icon: History, title: 'Resume History', desc: 'Every tailored resume is saved with its original job description, so past applications are easy to revisit.' },
      { icon: KeyRound, title: 'JWT Authentication', desc: 'Secure sign-up and login with JWT sessions. All resume data is isolated per account.' },
    ],
    images: [resumeforge],
  },
  {
    slug: 'stowe',
    title: 'Stowe',
    subtitle: 'Full-stack e-commerce store',
    year: '2025',
    role: 'Full-Stack Developer',
    deployed: 'Railway',
    live: 'https://stowe-bags.up.railway.app/',
    tags: ['MongoDB', 'Express', 'Node.js', 'JWT', 'Multer'],
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'EJS', 'JWT', 'bcrypt', 'Multer', 'Railway'],
    about: [
      'A full-featured e-commerce store built end to end with Node.js, Express and MongoDB, rendered with EJS and deployed on Railway with a bold black-and-lime brand identity.',
      'Stowe covers the complete shopping lifecycle: product listings, image uploads, user authentication, cart and order management, all served by a RESTful Express API.',
    ],
    features: [
      { icon: KeyRound, title: 'JWT Authentication', desc: 'Secure registration and login with bcrypt-hashed passwords and token-based sessions.' },
      { icon: Package, title: 'Product & Image Management', desc: 'Full product CRUD, with Multer handling multipart image uploads.' },
      { icon: ShoppingCart, title: 'End-to-End Shopping Flow', desc: 'Cart management, order placement and order history: the full purchase lifecycle handled server-side.' },
    ],
    images: [stowe],
  },
  {
    slug: 'onyxchess',
    title: 'OnyxChess',
    subtitle: 'Real-time multiplayer chess',
    year: '2025',
    role: 'Full-Stack Developer',
    deployed: 'Railway',
    repo: 'https://github.com/Samiullah-2004/OnyxChess',
    tags: ['Socket.IO', 'chess.js', 'Node.js', 'Tailwind CSS'],
    stack: ['Node.js', 'Express', 'Socket.IO', 'chess.js', 'EJS', 'Tailwind CSS'],
    about: [
      'A real-time multiplayer chess game where two players share a room and play live against each other.',
      "Socket.IO handles two-way event communication and chess.js handles move validation and game state, with full turn enforcement and a board that flips automatically to each player's color.",
    ],
    features: [
      { icon: Radio, title: 'Real-Time Multiplayer', desc: 'Socket.IO rooms sync moves instantly between both players, with no polling or page refresh.' },
      { icon: Gamepad2, title: 'Full Chess Logic', desc: 'chess.js validates every move and detects check and checkmate, enforcing legal moves only.' },
      { icon: RefreshCw, title: 'Dynamic Board Orientation', desc: 'The board flips automatically for the Black player, so each side sees the game from their own perspective.' },
    ],
    images: [onyxchess],
  },
  {
    slug: 'livepin',
    title: 'LivePin',
    subtitle: 'Real-time location tracking',
    year: '2025',
    role: 'Full-Stack Developer',
    repo: 'https://github.com/Samiullah-2004/LivePin',
    tags: ['Socket.IO', 'Leaflet.js', 'Node.js', 'Express'],
    stack: ['Node.js', 'Express', 'Socket.IO', 'Leaflet.js', 'Geolocation API', 'EJS'],
    about: [
      "A real-time, multi-user location tracking app that shows every connected user's live position on an interactive map.",
      'Socket.IO broadcasts location events and Leaflet.js renders the map. Each user appears as a marker that moves in real time and disappears automatically when they disconnect.',
    ],
    features: [
      { icon: MapPin, title: 'Live Location Broadcasting', desc: "The Geolocation API streams each user's coordinates to the server, which broadcasts them to every connected client instantly." },
      { icon: Images, title: 'Interactive Map', desc: 'Leaflet.js renders a live map with a marker per user, updating positions smoothly without a page reload.' },
      { icon: PlugZap, title: 'Automatic Disconnect Cleanup', desc: "When a user disconnects, their marker is removed from everyone else's map in real time." },
    ],
    images: [livepin],
  },
  {
    slug: 'moviebrowser',
    title: 'Movie Browser',
    subtitle: 'Movie discovery app · Internship capstone',
    type: 'Internship capstone',
    year: '2026',
    role: 'Frontend Developer',
    deployed: 'Vercel',
    live: 'https://movie-browser-khaki-seven.vercel.app/',
    tags: ['React', 'JavaScript', 'TMDB API', 'Tailwind CSS'],
    stack: ['React', 'JavaScript', 'Custom Hooks', 'TMDB API', 'Tailwind CSS', 'Vercel'],
    about: [
      'A full-featured movie discovery app built as my capstone project during the Qwetrum Technologies internship.',
      'Movie Browser connects to the TMDB API for real-time movie data: trending titles, search results and detailed film pages. It is built with custom React hooks, localStorage persistence and a dark and light theme toggle.',
    ],
    features: [
      { icon: Clapperboard, title: 'TMDB API Integration', desc: 'Live movie data (trending, top-rated and search results) fetched from the TMDB REST API through custom React hooks.' },
      { icon: Search, title: 'Search & Discovery', desc: 'Debounced real-time search, genre filtering and detailed pages with cast, ratings and overviews.' },
      { icon: SunMedium, title: 'Dark & Light Theme', desc: 'A fully responsive UI with a theme toggle that is remembered across sessions using localStorage.' },
    ],
    images: [moviebrowser],
    related: { label: 'Qwetrum internship', to: '/qwetrum' },
  },
  {
    slug: 'pasteapp',
    title: 'Paste App',
    subtitle: 'Snippet manager built with Redux',
    year: '2026',
    role: 'Frontend Developer',
    deployed: 'Vercel',
    live: 'https://paste-app-pied-iota.vercel.app/',
    tags: ['React', 'Redux', 'Tailwind CSS'],
    stack: ['React', 'Redux Toolkit', 'React Router', 'Tailwind CSS', 'Vercel'],
    about: [
      'A clean paste manager for creating, organizing and storing text snippets.',
      'Every paste lives in a single Redux store, so creating, editing or deleting a paste updates every view instantly. Live word counts and instant search are built into the content views.',
    ],
    features: [
      { icon: Database, title: 'Centralized Redux State', desc: 'One Redux store manages every paste, keeping create, edit and delete actions consistent across all views.' },
      { icon: Search, title: 'Live Word Count & Search', desc: 'Word counts update as you type, and saved pastes can be searched instantly.' },
      { icon: MonitorSmartphone, title: 'Responsive Layout', desc: 'A flexible layout that adapts cleanly from phones to desktops.' },
    ],
    images: [pasteapp],
  },
  {
    slug: 'cryptotracker',
    title: 'Crypto Tracker',
    subtitle: 'Live cryptocurrency dashboard',
    year: '2025',
    role: 'Frontend Developer',
    deployed: 'GitHub Pages',
    live: 'https://samiullah-2004.github.io/Crypto-Price-Tracker/',
    tags: ['JavaScript', 'CSS', 'CoinGecko API'],
    stack: ['JavaScript', 'HTML5', 'CSS3', 'CoinGecko API', 'GitHub Pages'],
    about: [
      'A real-time cryptocurrency dashboard tracking live prices, market caps, 24-hour changes and trading volume for the top 10 coins.',
      'Data comes straight from the CoinGecko API and refreshes automatically every 60 seconds.',
    ],
    features: [
      { icon: ChartLine, title: 'Live Price Tracking', desc: 'Real-time prices for the top 10 coins from the CoinGecko API, updated every 60 seconds.' },
      { icon: Wallet, title: 'Watchlist & Portfolio', desc: 'Save favourite coins to a personal watchlist and track portfolio performance.' },
      { icon: Gauge, title: 'Market Overview', desc: 'Global market cap, 24-hour volume, BTC dominance and per-coin 24-hour change at a glance.' },
    ],
    images: [cryptotracker],
  },
  {
    slug: 'skycast',
    title: 'Skycast',
    subtitle: 'Minimal weather app',
    year: '2025',
    role: 'Frontend Developer',
    deployed: 'GitHub Pages',
    live: 'https://samiullah-2004.github.io/Skycast-Weather-App/',
    tags: ['JavaScript', 'CSS', 'Open-Meteo API'],
    stack: ['JavaScript', 'HTML5', 'CSS3', 'Open-Meteo API', 'GitHub Pages'],
    about: [
      'A clean, minimal weather app that delivers real-time conditions for any city in the world.',
      'Powered by the Open-Meteo API and built with plain JavaScript and CSS: no frameworks, just search a city and go.',
    ],
    features: [
      { icon: Search, title: 'Global City Search', desc: 'Search any city worldwide and get its live weather conditions instantly.' },
      { icon: Cloud, title: 'Real-Time Conditions', desc: 'Temperature, humidity, wind speed and conditions powered by the Open-Meteo API.' },
      { icon: Palette, title: 'Minimal UI', desc: 'A clean, distraction-free interface built with pure CSS: fast and lightweight.' },
    ],
    images: [skycast],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug) => projects.find((p) => p.slug === slug)

/** Shape a project for the editorial HoverList (home + All Projects). */
export const toListItem = (p) => ({
  key: p.slug,
  to: `/${p.slug}`,
  title: p.title,
  meta: p.tags,
  image: p.images[0],
  badge: p.label ? p.label.split(' · ')[0] : undefined,
})
