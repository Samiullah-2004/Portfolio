import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import LogoLoop from '../logo/LogoLoop'
import Emailbar from './Emailbar'

// Languages
import js from '/src/logo/Languages/js.svg'
import ts from '/src/logo/Languages/typescript.svg'

// Frontend
import nextjs from '/src/logo/Frontend/nextjs.svg'
import react from '/src/logo/Frontend/react.svg'
import redux from '/src/logo/Frontend/redux.svg'
import tailwind from '/src/logo/Frontend/tailwind.svg'
import vite from '/src/logo/Frontend/vite.svg'
import html5 from '/src/logo/Frontend/html5.svg'
import css from '/src/logo/Frontend/css3.svg'
import reacthookform from '/src/logo/Frontend/reacthookform.svg'
import reactrouter from '/src/logo/Frontend/reactrouter.svg'

// Backend
import nodejs from '/src/logo/Backend/nodejs.svg'
import express from '/src/logo/Backend/express.svg'
import socketio from '/src/logo/Backend/socketio.svg'
import webrtc from '/src/logo/Backend/webrtc.svg'
import jwt from '/src/logo/Backend/jwt.svg'
import zod from '/src/logo/Backend/zod.svg'
import ejs from '/src/logo/Backend/ejs.svg'

// Databases
import postgresql from '/src/logo/Databases/postgresql.svg'
import mongodb from '/src/logo/Databases/mongodb.svg'
import mongoose from '/src/logo/Databases/mongoose.svg'
import mysql from '/src/logo/Databases/mysql.svg'
import sqlite from '/src/logo/Databases/sqlite.svg'
import sql from '/src/logo/Databases/sqldeveloper.svg'
import prisma from '/src/logo/Databases/prisma.svg'
import dynamodb from '/src/logo/Databases/dynamodb.svg'
import supabase from '/src/logo/Databases/supabase.svg'

// AI / RAG
import gemini from '/src/logo/AI And RAG/gemini.svg'
import huggingface from '/src/logo/AI And RAG/huggingface.svg'
import groq from '/src/logo/AI And RAG/groq.svg'
import claude from '/src/logo/AI And RAG/claude.svg'

// Animation
import gsapIcon from '/src/logo/Animation/gsap.svg'

// Version Control
import git from '/src/logo/Version Control/git.svg'
import github from '/src/logo/Version Control/github.svg'

// CI/CD
import githubactions from '/src/logo/CICD/githubactions.svg'

// Cloud & Containers
import docker from '/src/logo/Cloud & Containers/docker.svg'
import kubernetes from '/src/logo/Cloud & Containers/kubernetes.svg'
import aws from '/src/logo/Cloud & Containers/aws.svg'
import awsec2 from '/src/logo/Cloud & Containers/awsec2.svg'
import awsecs from '/src/logo/Cloud & Containers/awsecs.svg'
import openshift from '/src/logo/Cloud & Containers/openshift.svg'
import serverless from '/src/logo/Cloud & Containers/serverless.svg'
import nginx from '/src/logo/Cloud & Containers/nginx.svg'

// Deployment
import vercel from '/src/logo/Deployment/vercel.svg'
import railway from '/src/logo/Deployment/railway.svg'
import render from '/src/logo/Deployment/render.svg'

// Tools
import postman from '/src/logo/Tools/postman.svg'
import vscode from '/src/logo/Tools/vscode.svg'

// Testing
import jest from '/src/logo/Testing/jest.svg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const categories = [
  {
    label: 'LANGUAGES',
    techs: [
      { id: 'js', image: js, name: 'JavaScript' },
      { id: 'ts', image: ts, name: 'TypeScript' },
    ],
  },
  {
    label: 'FRONTEND',
    techs: [
      { id: 'nextjs', image: nextjs, name: 'Next.js' },
      { id: 'react', image: react, name: 'React.js' },
      { id: 'redux', image: redux, name: 'Redux' },
      { id: 'tailwind', image: tailwind, name: 'Tailwind CSS' },
      { id: 'vite', image: vite, name: 'Vite' },
      { id: 'html5', image: html5, name: 'HTML5' },
      { id: 'css', image: css, name: 'CSS3' },
      { id: 'reacthookform', image: reacthookform, name: 'React Hook Form' },
      { id: 'reactrouter', image: reactrouter, name: 'React Router' },
    ],
  },
  {
    label: 'BACKEND',
    techs: [
      { id: 'nodejs', image: nodejs, name: 'Node.js' },
      { id: 'express', image: express, name: 'Express.js' },
      { id: 'socketio', image: socketio, name: 'Socket.IO' },
      { id: 'webrtc', image: webrtc, name: 'WebRTC' },
      { id: 'jwt', image: jwt, name: 'JWT Auth' },
      { id: 'zod', image: zod, name: 'Zod' },
      { id: 'ejs', image: ejs, name: 'EJS' },
    ],
  },
  {
    label: 'DATABASES',
    techs: [
      { id: 'postgresql', image: postgresql, name: 'PostgreSQL' },
      { id: 'mongodb', image: mongodb, name: 'MongoDB' },
      { id: 'mongoose', image: mongoose, name: 'Mongoose' },
      { id: 'mysql', image: mysql, name: 'MySQL' },
      { id: 'sqlite', image: sqlite, name: 'SQLite' },
      { id: 'sqldeveloper', image: sql, name: 'SQL Developer' },
      { id: 'prisma', image: prisma, name: 'Prisma ORM' },
      { id: 'dynamodb', image: dynamodb, name: 'DynamoDB' },
      { id: 'supabase', image: supabase, name: 'Supabase' },
    ],
  },
  {
    label: 'AI / RAG',
    techs: [
      { id: 'gemini', image: gemini, name: 'Google Gemini' },
      { id: 'huggingface', image: huggingface, name: 'Hugging Face' },
      { id: 'groq', image: groq, name: 'Groq' },
      { id: 'claude', image: claude, name: 'Claude' },
    ],
  },
  {
    label: 'ANIMATION',
    techs: [
      { id: 'gsap', image: gsapIcon, name: '' },
    ],
  },
  {
    label: 'VERSION CONTROL',
    techs: [
      { id: 'git', image: git, name: 'Git' },
      { id: 'github', image: github, name: 'GitHub' },
    ],
  },
  {
    label: 'CI/CD',
    techs: [
      { id: 'githubactions', image: githubactions, name: 'GitHub Actions' },
    ],
  },
  {
    label: 'CLOUD & CONTAINERS',
    techs: [
      { id: 'docker', image: docker, name: 'Docker' },
      { id: 'kubernetes', image: kubernetes, name: 'Kubernetes' },
      { id: 'aws', image: aws, name: 'AWS' },
      { id: 'awsec2', image: awsec2, name: 'AWS EC2' },
      { id: 'awsecs', image: awsecs, name: 'AWS ECS' },
      { id: 'openshift', image: openshift, name: 'OpenShift' },
      { id: 'serverless', image: serverless, name: 'Serverless' },
      { id: 'nginx', image: nginx, name: 'Nginx' },
    ],
  },
  {
    label: 'DEPLOYMENT',
    techs: [
      { id: 'vercel', image: vercel, name: 'Vercel' },
      { id: 'railway', image: railway, name: 'Railway' },
      { id: 'render', image: render, name: 'Render' }
    ],
  },
  {
    label: 'TOOLS',
    techs: [
      { id: 'postman', image: postman, name: 'Postman' },
      { id: 'vscode', image: vscode, name: 'VS Code' },
    ],
  },
  {
    label: 'TESTING',
    techs: [
      { id: 'jest', image: jest, name: 'Jest' },
    ],
  },
]

const MyStack = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'mystack-in',
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    })
    tl.from('.slide-up-and-fade', { y: 150, opacity: 0, stagger: 0.05 })
  }, { scope: containerRef })

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'mystack-out',
        trigger: containerRef.current,
        start: 'bottom 50%',
        end: 'bottom 10%',
        scrub: 0.5,
      },
    })
    tl.to('.slide-up-and-fade', { y: -150, opacity: 0, stagger: 0.02 })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className='grid grid-cols-[16px_1fr] sm:grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] min-h-[90vh] md:h-[230vh]  text-[#ffffff] overflow-hidden'>
      <div></div>

      <div className='relative md:sticky md:top-0 md:h-[180vh] !mt-6 md:!mt-35 !pl-4 sm:!pl-6 md:!pl-12 flex flex-col justify-center py-10 md:py-0'>

        <div className='flex items-center gap-x-4 max-w-5xl slide-up-and-fade will-change-transform'>
          <div className="relative w-8 h-8 md:w-12 md:h-12 animate-spin flex-shrink-0" style={{ animationDuration: '3s' }}>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div key={angle}
                className="absolute w-1.5 h-4 md:w-2 md:h-5 bg-[#06f51ee6] rounded-full top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  transformOrigin: '50% 100%',
                  opacity: 0.4 + (angle / 300) * 0.6,
                }}
              />
            ))}
          </div>
          <h2 className='text-[40px] sm:text-[50px] md:text-[36px] leading-[.95] tracking-tight text-[#06f51ee6] uppercase font-anton'>
            My Stack
          </h2>
        </div>

        <div className='w-[90%] md:w-[85vw] max-w-5xl !my-4'></div>

        <div className='flex flex-col gap-y-6 md:gap-y-10 max-w-5xl'>
          {categories.map((cat) => (
            <div key={cat.label} className='grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[500px_1fr] gap-y-3 md:gap-x-4 slide-up-and-fade will-change-transform items-center'>
              <p className='text-[#d0cdcdde] text-[32px] md:text-[40px] tracking-tight font-anton leading-none'>
                {cat.label}
              </p>
              <div className='w-full overflow-hidden' style={{ height: 60 }}>
                <LogoLoop
                  logos={cat.techs.map((tech) => ({
                    src: tech.image,
                    alt: tech.name,
                  }))}
                  speed={35}
                  direction="left"
                  logoHeight={44}
                  gap={40}
                  pauseOnHover
                  fadeOut
                  fadeOutColor="#0a0a0a"
                  ariaLabel={cat.label}
                  renderItem={(item) => (
                    <div className="flex items-center gap-x-2">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-[14px] md:text-[16px] font-roboto-flex font-normal text-[#a0a0a0] whitespace-nowrap">
                        {item.alt}
                      </span>
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyStack