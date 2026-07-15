import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Emailbar from './Emailbar'
import git from '/src/logo/git.png'
import github from '/src/logo/github.png'
import html5 from '/src/logo/html5.svg'
import css from '/src/logo/css3.svg'
import js from '/src/logo/js.png'
import ts from '/src/logo/typescript.svg'
import react from '/src/logo/react.png'
import tailwind from '/src/logo/tailwind.svg'
import redux from '/src/logo/redux.svg'
import nodejs from '/src/logo/nodejs.svg'
import express from '/src/logo/express.svg'
import mongodb from '/src/logo/mongodb.svg'
import socketio from '/src/logo/socketio.svg'
import vscode from '/src/logo/vscode.svg'
import vercel from '/src/logo/vercel.svg'
import nextjs from '/src/logo/nextjs.svg'
import postgresql from '/src/logo/postgresql.svg'
import prisma from '/src/logo/prisma.svg'
import supabase from '/src/logo/supabase.svg'
import railway from '/src/logo/railway.svg'
import postman from '/src/logo/postman.svg'
import mongoose from '/src/logo/mongoose.svg'
import jwt from '/src/logo/jwt.svg'
import vite from '/src/logo/vite.svg'
import sql from '/src/logo/sqldeveloper.svg'
import ejs from '/src/logo/ejs.svg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const categories = [
  {
    label: 'FRONTEND',
    techs: [
      { id: 'html5', image: html5, name: 'HTML5' },
      { id: 'css', image: css, name: 'CSS3' },
      { id: 'js', image: js, name: 'JavaScript' },
      { id: 'ts', image: ts, name: 'TypeScript' },
      { id: 'react', image: react, name: 'React.js' },
      { id: 'nextjs', image: nextjs, name: 'Next.js' },
      { id: 'tailwind', image: tailwind, name: 'Tailwind CSS' },
      { id: 'redux', image: redux, name: 'Redux' },
      { id: 'vite', image: vite, name: 'Vite' },
    ],
  },
  {
    label: 'BACKEND',
    techs: [
      { id: 'nodejs', image: nodejs, name: 'Node.js' },
      { id: 'express', image: express, name: 'Express.js' },
      { id: 'mongodb', image: mongodb, name: 'MongoDB' },
      { id: 'mongoose', image: mongoose, name: 'Mongoose' },
      { id: 'postgresql', image: postgresql, name: 'PostgreSQL' },
      { id: 'sqldeveloper', image: sql, name: 'SQL Developer' },
      { id: 'prisma', image: prisma, name: 'Prisma ORM' },
      { id: 'supabase', image: supabase, name: 'Supabase' },
      { id: 'socketio', image: socketio, name: 'Socket.IO' },
      { id: 'jwt', image: jwt, name: 'JWT Auth' },
      { id: 'ejs', image: ejs, name: 'EJS' },
    ],
  },
  {
    label: 'TOOLS',
    techs: [
      { id: 'git', image: git, name: 'Git' },
      { id: 'github', image: github, name: 'GitHub' },
      { id: 'vscode', image: vscode, name: 'VS Code' },
      { id: 'vercel', image: vercel, name: 'Vercel' },
      { id: 'railway', image: railway, name: 'Railway' },
      { id: 'postman', image: postman, name: 'Postman' },
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
    <div ref={containerRef} className='grid grid-cols-[16px_1fr] sm:grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] min-h-[90vh] md:h-[170vh]  text-[#ffffff] overflow-hidden'>
      <div></div>

      <div className='relative md:sticky md:top-0 md:h-screen !mt-6 md:!mt-35 !pl-4 sm:!pl-6 md:!pl-12 flex flex-col justify-center py-10 md:py-0'>

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

        <div className='flex flex-col gap-y-6 md:gap-y-12 max-w-5xl'>
          {categories.map((cat) => (
            <div key={cat.label} className='grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-2 gap-y-3 md:gap-x-4 slide-up-and-fade will-change-transform'>
              <p className='text-[#d0cdcdde] text-[32px] md:text-[48px] tracking-tight font-anton leading-none'>
                {cat.label}
              </p>
              <div className='flex gap-x-8 sm:gap-x-8 md:gap-x-5 flex-wrap gap-y-4 items-center md:!pl-14'>
                {cat.techs.map((tech) => (
                  <div className="flex items-center gap-x-2" key={tech.id}>
                    <img src={tech.image} alt={tech.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain hover:scale-110 transition-transform duration-300" />
                    <span className='text-[14px] md:text-[16px] font-roboto-flex font-normal text-[#a0a0a0]'>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyStack