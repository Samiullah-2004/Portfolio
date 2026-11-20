// Work experience, newest first. Each entry also gets its own detail page at /<slug>.

import {
  Bug,
  CalendarCheck,
  CreditCard,
  FileCheck2,
  GitBranch,
  LayoutDashboard,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Clapperboard,
  TestTubes,
  Webcam,
  BadgeCheck,
  Puzzle,
} from 'lucide-react'

import jaytechV1Landing from '../assets/images/experience/jaytech-v1-landing.webp'
import jaytechV1Dashboard from '../assets/images/experience/jaytech-v1-dashboard.webp'
import jaytechV2PhotoToVideo from '../assets/images/experience/jaytech-v2-photo-to-video.webp'
import smokescreenStudio from '../assets/images/projects/smokescreen-1.webp'
import qwetrum1 from '../assets/images/experience/qwetrum-1.webp'
import decodelabs1 from '../assets/images/experience/decodelabs-1.webp'
import decodelabs2 from '../assets/images/experience/decodelabs-2.webp'
import decodelabs3 from '../assets/images/experience/decodelabs-3.webp'

export const experiences = [
  {
    slug: 'jaytech',
    company: 'JayTech Elite Firm',
    role: 'Full-Stack Developer',
    period: 'Sept 2026 – Present',
    current: true,
    summary:
      'Co-built SmokeScreen V2, a live AI video SaaS, with the Lead Developer: design system, 35+ page frontend, Express + Supabase backend, payments, admin panel, tests and deployment.',
    link: 'https://smokescreenapp.com/',
    linkLabel: 'SmokeScreen (live)',
    meta: [
      { label: 'Period', value: 'Sept 2026 – Present' },
      { label: 'Role', value: 'Full-Stack Developer' },
      { label: 'Product', value: 'SmokeScreen V1 & V2' },
      { label: 'Deployed', value: 'Railway · Hostinger' },
    ],
    stack: [
      'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express', 'Supabase (PostgreSQL)', 'Row Level Security', 'JWT',
      'Google OAuth', 'Flutterwave', 'Squad', 'Google Gemini', 'fal.ai', 'MiniMax', 'Decart', 'WebSockets',
      'Web Audio API', 'WebAssembly', 'Web Workers', 'Resend', 'Jest', 'Supertest', 'GitHub Actions', 'Railway', 'Hostinger', 'OBS',
    ],
    about: [
      "I'm a Full-Stack Developer on SmokeScreen, a live AI video streaming SaaS operated by JayTech Elite Firm. SmokeScreen transforms a creator's live webcam feed with AI and lets them broadcast it into WhatsApp, Telegram, Zoom and Meet through OBS, with credit-based billing and tiered plans.",
      "I work alongside the company's Lead Developer on both V1 and the V2 rebuild, shipping through feature branches and pull requests. On V2 I designed the design system and co-built the product with the Lead Developer: the UI, backend, payments, admin tools, tests and deployment. Today I handle daily production fixes, monitoring and client feedback on the live V2.",
    ],
    groups: [
      {
        title: 'V1',
        items: [
          { icon: Bug, title: 'Server Crash Fix', desc: 'Diagnosed and fixed a recurring WebSocket / Node.js server crash by adding a WebSocket transport for Supabase Realtime and pinning the Node engine.' },
          { icon: Webcam, title: 'Live Camera Pipeline', desc: 'Fixed a stretched-face rendering bug in the AI live portrait mode of the camera pipeline.' },
          { icon: Smartphone, title: 'Portrait Mode Dashboard', desc: 'Shipped a portrait-mode dashboard alongside landscape, with an OBS / theatre capture mode and true 9:16 snapshot export.' },
          { icon: CreditCard, title: 'Payment Sync Fix', desc: 'Fixed a Flutterwave bug where paid users were not upgraded (for example Creator to Pro) by correcting the sync between payment confirmation and account state.' },
        ],
      },
      {
        title: 'V2 · Full rebuild',
        items: [
          { icon: Palette, title: 'Design System & 35+ Page Frontend', desc: 'Designed the full UI and design system (a dark, professional creative-software direction approved by the client) and built every page responsive, from small phones to large screens.' },
          { icon: Clapperboard, title: 'Live Studio', desc: 'Webcam capture, real-time AI scene transformation (16 scenes by plan), editable prompts, MP4 recording, screenshots and OBS capture of the AI output, and a hardened Go Live flow with retries and a photo fallback.' },
          { icon: Server, title: 'Express + Supabase Backend', desc: 'Accounts, plans, license keys, a credit ledger, referrals, notifications, uploads, plan expiry jobs and Naira (NGN) pricing, all wired to the frontend through a REST API.' },
          { icon: CreditCard, title: 'Payments & Billing', desc: 'Flutterwave card payments with signed webhook verification and idempotent fulfillment, Squad as a backup gateway, and per-second credit metering during live sessions.' },
          { icon: Sparkles, title: 'AI Creative Tools', desc: 'Gemini photo editing, photo-to-video via fal.ai, and MiniMax voice cloning with line-by-line emotion, Gemini auto-pacing and a WebAssembly video-to-MP3 converter running in Web Workers.' },
          { icon: LayoutDashboard, title: 'Admin Control Center', desc: 'Today screen, customer search and activity, credits, license keys, payment-problem tools, bulk actions with undo, audit log, support tickets, mass email, team roles and maintenance mode.' },
          { icon: ShieldCheck, title: 'Security & Accounts', desc: 'JWT sessions, Google sign-in, password change and reset by email, Supabase Row Level Security, consent records and upload consent with real storage deletion, plus Resend transactional emails.' },
          { icon: TestTubes, title: 'Testing & CI', desc: 'Jest + Supertest suites for the API, payments and pages, run automatically on every pull request with GitHub Actions.' },
          { icon: Rocket, title: 'Deployment & Daily Support', desc: 'Deployed the API on Railway and the website on Hostinger, and handle daily production fixes and client feedback on the live platform.' },
        ],
      },
    ],
    related: { label: 'SmokeScreen case study', to: '/smokescreen' },
    images: [smokescreenStudio, jaytechV2PhotoToVideo, jaytechV1Dashboard, jaytechV1Landing],
    imageCaption: 'SmokeScreen V2 (live studio, photo to video) and V1 (dashboard, landing page).',
  },
  {
    slug: 'qwetrum',
    company: 'Qwetrum Technologies',
    role: 'Web Development Intern',
    period: 'June 2026',
    summary: 'Weekly tasks under supervisor review, ending in the Movie Browser capstone and certification.',
    meta: [
      { label: 'Period', value: 'June 2026' },
      { label: 'Role', value: 'Web Development Intern' },
      { label: 'Type', value: 'Internship' },
      { label: 'Capstone', value: 'Movie Browser' },
    ],
    stack: ['React', 'JavaScript', 'Custom Hooks', 'Tailwind CSS', 'TMDB API', 'Git', 'GitHub'],
    about: [
      "A web development internship at Qwetrum Technologies, a startup. The internship ran on weekly tasks: each week's work was submitted for review with supervisor feedback, and the program ended with a capstone project, Movie Browser.",
      'The code was reviewed and the internship certificate was issued after final approval.',
    ],
    groups: [
      {
        items: [
          { icon: CalendarCheck, title: 'Weekly Tasks and Reviews', desc: 'Submitted structured tasks every week and revised them based on written reviewer feedback.' },
          { icon: Clapperboard, title: 'Capstone: Movie Browser', desc: 'Built Movie Browser, a full-featured React app using custom hooks and the TMDB API for live movie data, with authentication flows and dynamic data rendering.' },
          { icon: BadgeCheck, title: 'Reviewed and Certified', desc: 'Delivered the capstone after iterative revisions from weekly supervisor review, ending in final approval and certification.' },
        ],
      },
    ],
    related: { label: 'View Movie Browser', to: '/moviebrowser' },
    images: [qwetrum1],
  },
  {
    slug: 'decodelabs',
    company: 'Decode Labs',
    role: 'Web Development Intern',
    period: 'July 2026',
    summary: 'Weekly remote assignments and a vanilla JS DOM curriculum, certified after GitHub review.',
    meta: [
      { label: 'Period', value: 'July 2026' },
      { label: 'Role', value: 'Web Development Intern' },
      { label: 'Type', value: 'Internship · Remote' },
      { label: 'Review', value: 'GitHub-based' },
    ],
    stack: ['JavaScript', 'DOM', 'HTML5', 'CSS3', 'Git', 'GitHub'],
    about: [
      'A remote web development internship at Decode Labs, run as structured weekly assignments in an asynchronous environment.',
      'All work was submitted through GitHub, reviewed by supervisors and certified after approval.',
    ],
    groups: [
      {
        items: [
          { icon: FileCheck2, title: 'Weekly Assignments', desc: 'Delivered structured weekly frontend assignments in a remote, asynchronous environment.' },
          { icon: GitBranch, title: 'Clean Git History', desc: 'Maintained clean GitHub commit histories across concurrent deliverables.' },
          { icon: Puzzle, title: 'Vanilla JS DOM Curriculum', desc: 'Completed a vanilla JavaScript DOM manipulation curriculum, approved and certified by supervisors after GitHub-based review.' },
        ],
      },
    ],
    images: [decodelabs1, decodelabs2, decodelabs3],
  },
]

export const getExperience = (slug) => experiences.find((e) => e.slug === slug)
