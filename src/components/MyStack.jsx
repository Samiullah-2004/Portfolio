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
import react from '/src/logo/react.png'
import reacthookform from '/src/logo/reacthookform.png'
import reactrouter from '/src/logo/reactrouter.svg'
import tailwind from '/src/logo/tailwind.png'
import redux from '/src/logo/redux.svg'
import vscode from '/src/logo/vscode.svg'
import vercel from '/src/logo/vercel.svg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const categories = [
  {
    label: 'FRONTEND',
    techs: [
      { id: 'html5', image: html5, name: 'HTML5' },
      { id: 'css', image: css, name: 'CSS3' },
      { id: 'js', image: js, name: 'JavaScript' },
      { id: 'react', image: react, name: 'React.js' },
      { id: 'tailwind', image: tailwind, name: 'Tailwind CSS' },
    ],
  },
  {
    label: 'State',
    techs: [
      { id: 'redux', image: redux, name: 'Redux' },
      { id: 'reactrouter', image: reactrouter, name: 'React Router' },
      { id: 'reacthookform', image: reacthookform, name: 'React Hook Form' },
    ],
  },
  {
    label: 'Tools',
    techs: [
      { id: 'git', image: git, name: 'Git' },
      { id: 'github', image: github, name: 'GitHub' },
      { id: 'vscode', image: vscode, name: 'VS Code' },
      { id: 'vercel', image: vercel, name: 'Vercel' },
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
    <div ref={containerRef} className='grid grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] h-[120vh] text-[#ffffff] overflow-hidden'>
      <div></div>

      <div className='sticky top-0 h-screen !mt-10 !pl-6 md:!pl-12 flex flex-col justify-center'>

        <div className='flex items-center gap-x-4 max-w-5xl slide-up-and-fade will-change-transform'>
          <div className="relative w-10 h-10 md:w-12 md:h-12 animate-spin flex-shrink-0" style={{ animationDuration: '3s' }}>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div key={angle}
                className="absolute w-2 h-5 bg-[#06f51ee6] rounded-full top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  transformOrigin: '50% 100%',
                  opacity: 0.4 + (angle / 300) * 0.6,
                }}
              />
            ))}
          </div>
          <h2 className='text-[40px] sm:text-[50px] md:text-[36px] leading-[.95] tracking-tight text-[#06f51ee6]  uppercase font-anton'>
            My Stack
          </h2>
        </div>

        <div className='w-[85vw] !my-4'>
        </div>

        <div className='flex flex-col gap-y-8 md:gap-y-12'>
          {categories.map((cat) => (
            <div key={cat.label} className='grid grid-cols-1 md:grid-cols-2 gap-y-4 slide-up-and-fade will-change-transform'>
              <p className='text-[#d0cdcdde] text-[32px] md:text-[48px] tracking-tight font-anton leading-none'>
                {cat.label}
              </p>
              <div className='flex gap-x-8 md:gap-x-13 flex-wrap gap-y-6'>
                {cat.techs.map((tech) => (
                  <div className="flex items-center gap-x-2" key={tech.id}>
                    <img src={tech.image} alt={tech.name}
                      className="w-10 h-10 md:w-16 md:h-16 object-contain hover:scale-110 transition-transform duration-300" />
                    <span className='text-[14px] md:text-[18px] font-roboto-flex font-normal text-[#a0a0a0]'>
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