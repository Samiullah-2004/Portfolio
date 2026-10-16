// "My Stack" section. Each item has either a `logo` (image) or an `icon` (lucide component).
// `mono: true` renders a dark single-colour logo in white so it stays visible on the dark theme.

import {
  AudioWaveform,
  Blocks,
  Boxes,
  Brain,
  Binary,
  ChartLine,
  Component,
  Container,
  CreditCard,
  Cpu,
  Database,
  Film,
  FlaskConical,
  KeyRound,
  Layers,
  MonitorSmartphone,
  Mic,
  PenTool,
  Route,
  ShieldCheck,
  Sparkles,
  SquareCode,
  Upload,
  Video,
  Wand,
  Waypoints,
  Webhook,
  Wind,
} from 'lucide-react'

// Languages
import js from '../logo/Languages/js.svg'
import ts from '../logo/Languages/typescript.svg'
// Frontend
import nextjs from '../logo/Frontend/nextjs.svg'
import react from '../logo/Frontend/react.svg'
import redux from '../logo/Frontend/redux.svg'
import tailwind from '../logo/Frontend/tailwind.svg'
import vite from '../logo/Frontend/vite.svg'
import html5 from '../logo/Frontend/html5.svg'
import css from '../logo/Frontend/css3.svg'
import reacthookform from '../logo/Frontend/reacthookform.svg'
import reactrouter from '../logo/Frontend/reactrouter.svg'
import webassembly from '../logo/Frontend/webassembly.svg'
// Backend
import nodejs from '../logo/Backend/nodejs.svg'
import express from '../logo/Backend/express.svg'
import socketio from '../logo/Backend/socketio.svg'
import webrtc from '../logo/Backend/webrtc.svg'
import jwt from '../logo/Backend/jwt.svg'
import zod from '../logo/Backend/zod.svg'
import ejs from '../logo/Backend/ejs.svg'
import flutterwave from '../logo/Backend/flutterwave.svg'
import stripe from '../logo/Backend/stripe.svg'
import oauth from '../logo/Backend/oauth.svg'
import graphql from '../logo/Backend/graphql.svg'
import apollo from '../logo/Backend/apollo.svg'
import nextauth from '../logo/Backend/nextauth.png'
import resend from '../logo/Backend/resend.svg'
// Databases
import postgresql from '../logo/Databases/postgresql.svg'
import mongodb from '../logo/Databases/mongodb.svg'
import mongoose from '../logo/Databases/mongoose.svg'
import mysql from '../logo/Databases/mysql.svg'
import sqlite from '../logo/Databases/sqlite.svg'
import sqldeveloper from '../logo/Databases/sqldeveloper.svg'
import prisma from '../logo/Databases/prisma.svg'
import dynamodb from '../logo/Databases/dynamodb.svg'
import supabase from '../logo/Databases/supabase.svg'
// AI
import gemini from '../logo/AI And RAG/gemini.svg'
import huggingface from '../logo/AI And RAG/huggingface.svg'
import groq from '../logo/AI And RAG/groq.svg'
import claude from '../logo/AI And RAG/claude.svg'
// Animation
import gsap from '../logo/Animation/gsap.svg'
import framermotion from '../logo/Animation/framermotion.svg'
// Version control & CI/CD
import git from '../logo/Version Control/git.svg'
import github from '../logo/Version Control/github.svg'
import githubactions from '../logo/CICD/githubactions.svg'
// Cloud & containers
import docker from '../logo/Cloud & Containers/docker.svg'
import kubernetes from '../logo/Cloud & Containers/kubernetes.svg'
import aws from '../logo/Cloud & Containers/aws.svg'
import awsec2 from '../logo/Cloud & Containers/awsec2.svg'
import awsecs from '../logo/Cloud & Containers/awsecs.svg'
import openshift from '../logo/Cloud & Containers/openshift.svg'
import serverless from '../logo/Cloud & Containers/serverless.svg'
import nginx from '../logo/Cloud & Containers/nginx.svg'
// Deployment
import vercel from '../logo/Deployment/vercel.svg'
import railway from '../logo/Deployment/railway.svg'
import render from '../logo/Deployment/render.svg'
import hostinger from '../logo/Deployment/hostinger.svg'
// Tools
import postman from '../logo/Tools/postman.svg'
import vscode from '../logo/Tools/vscode.svg'
import cloudinary from '../logo/Tools/cloudinary.svg'
// Testing
import jest from '../logo/Testing/jest.svg'
import playwright from '../logo/Testing/playwright.svg'
import vitest from '../logo/Testing/vitest.svg'

export const skillCategories = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', logo: js },
      { name: 'TypeScript', logo: ts },
      { name: 'SQL', icon: Database },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', logo: nextjs },
      { name: 'React.js', logo: react },
      { name: 'Redux', logo: redux },
      { name: 'Tailwind CSS', logo: tailwind },
      { name: 'Vite', logo: vite },
      { name: 'HTML5', logo: html5 },
      { name: 'CSS3', logo: css },
      { name: 'React Hook Form', logo: reacthookform },
      { name: 'React Router', logo: reactrouter },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', logo: nodejs },
      { name: 'Express.js', logo: express, mono: true },
      { name: 'REST APIs', icon: Route },
      { name: 'GraphQL', logo: graphql },
      { name: 'Apollo Server', logo: apollo },
      { name: 'Socket.IO', logo: socketio, mono: true },
      { name: 'WebRTC', logo: webrtc },
      { name: 'JWT Auth', logo: jwt },
      { name: 'OAuth', logo: oauth },
      { name: 'NextAuth.js', logo: nextauth },
      { name: 'bcrypt', icon: KeyRound },
      { name: 'Zod', logo: zod },
      { name: 'Multer', icon: Upload },
      { name: 'EJS', logo: ejs },
      { name: 'Webhooks', icon: Webhook },
      { name: 'Resend', logo: resend },
    ],
  },
  {
    label: 'Payments',
    items: [
      { name: 'Stripe', logo: stripe },
      { name: 'Flutterwave', logo: flutterwave },
      { name: 'Squad', icon: CreditCard },
    ],
  },
  {
    label: 'Databases',
    items: [
      { name: 'PostgreSQL', logo: postgresql },
      { name: 'Prisma ORM', logo: prisma, mono: true },
      { name: 'pgvector', icon: Boxes },
      { name: 'Supabase', logo: supabase },
      { name: 'Row Level Security', icon: ShieldCheck },
      { name: 'MongoDB', logo: mongodb },
      { name: 'Mongoose', logo: mongoose },
      { name: 'DynamoDB', logo: dynamodb },
      { name: 'MySQL', logo: mysql },
      { name: 'SQLite', logo: sqlite },
      { name: 'SQL Developer', logo: sqldeveloper },
    ],
  },
  {
    label: 'AI / RAG',
    items: [
      { name: 'Google Gemini', logo: gemini },
      { name: 'Groq (Llama 3.3)', logo: groq },
      { name: 'Hugging Face', logo: huggingface },
      { name: 'Claude', logo: claude },
      { name: 'OpenRouter', icon: Waypoints },
      { name: 'fal.ai', icon: Sparkles },
      { name: 'MiniMax Voice', icon: Mic },
      { name: 'Decart Live AI', icon: Video },
      { name: 'RAG Pipelines', icon: Brain },
      { name: 'Vector Embeddings', icon: Binary },
      { name: 'Prompt Engineering', icon: Wand },
    ],
  },
  {
    label: 'Browser & Media',
    items: [
      { name: 'Web Audio API', icon: AudioWaveform },
      { name: 'WebAssembly', logo: webassembly },
      { name: 'Web Workers', icon: Cpu },
      { name: 'MediaRecorder', icon: Film },
      { name: 'Canvas API', icon: Layers },
    ],
  },
  {
    label: 'Animation',
    items: [
      { name: 'GSAP', logo: gsap },
      { name: 'Framer Motion', logo: framermotion, mono: true },
      { name: 'Lenis', icon: Wind },
    ],
  },
  {
    label: 'Testing',
    items: [
      { name: 'Jest', logo: jest },
      { name: 'Vitest', logo: vitest },
      { name: 'Supertest', icon: FlaskConical },
      { name: 'Playwright', logo: playwright },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'Docker', logo: docker },
      { name: 'Kubernetes', logo: kubernetes },
      { name: 'AWS', logo: aws },
      { name: 'AWS EC2', logo: awsec2 },
      { name: 'AWS ECS', logo: awsecs },
      { name: 'AWS ECR', icon: Container },
      { name: 'OpenShift', logo: openshift },
      { name: 'Serverless', logo: serverless },
      { name: 'Microservices', icon: Blocks },
      { name: 'Nginx', logo: nginx },
      { name: 'GitHub Actions', logo: githubactions },
    ],
  },
  {
    label: 'Deployment',
    items: [
      { name: 'Vercel', logo: vercel, mono: true },
      { name: 'Railway', logo: railway },
      { name: 'Render', logo: render, mono: true },
      { name: 'Hostinger', logo: hostinger, mono: true },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', logo: git },
      { name: 'GitHub', logo: github, mono: true },
      { name: 'VS Code', logo: vscode },
      { name: 'Postman', logo: postman },
      { name: 'Cloudinary', logo: cloudinary },
      { name: 'Monaco Editor', icon: SquareCode },
      { name: 'Recharts', icon: ChartLine },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'UI/UX Design', icon: PenTool },
      { name: 'Design Systems', icon: Component },
      { name: 'Responsive Design', icon: MonitorSmartphone },
    ],
  },
]

export const skillCount = skillCategories.reduce((n, c) => n + c.items.length, 0)
