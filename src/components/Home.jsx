import React, { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Emailbar from './Emailbar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Home = () => {
  const [navOpen, setNavOpen] = useState(false)
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'home-in',
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
        id: 'home-out',
        trigger: containerRef.current,
        start: 'bottom 50%',
        end: 'bottom 10%',
        scrub: 0.5,
      },
    })
    tl.to('.slide-up-and-fade', { y: -150, opacity: 0, stagger: 0.02 })
  }, { scope: containerRef })

  return (
    <div
      id="home"
      ref={containerRef}
      className='grid grid-cols-[28px_1fr] md:grid-cols-[35px_1fr_auto] h-[120vh] text-white overflow-hidden'
    >
      <div></div>

      <div className="flex flex-col !pl-6 md:!pl-10 justify-center">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className='slide-up-and-fade will-change-transform font-anton'>
            <p className="text-[52px] sm:text-[65px] md:text-[80px] leading-[.95] text-[#06f51ee6] tracking-tight">FRONTEND</p>
            <p className="text-[52px] sm:text-[65px] md:text-[80px] leading-[.95] text-[#ffffff] tracking-tight !ml-5 md:!ml-7">DEVELOPER</p>
          </div>

          <p className="font-roboto-flex font-normal text-[15px] md:text-[18px] text-[#a0a0a0] leading-relaxed slide-up-and-fade will-change-transform">
            Hi! I'm Samiullah. A passionate Frontend Developer from Lahore, Pakistan —
            building clean, responsive, and real-world web applications using React.js,
            Tailwind CSS, and JavaScript.
          </p>

          <div className="flex flex-col gap-1.5 !mt-2 slide-up-and-fade will-change-transform">
            <button className="bg-[#06f51ee6] text-[#0a0a0a] font-black w-32 h-10 flex justify-center items-center hover:bg-[#ffffff] transition-colors duration-300 cursor-pointer tracking-wider text-[13px] font-anton">
              LET'S TALK
            </button>
            <div className="flex items-center gap-2 text-[13px] md:text-[14px] text-[#a0a0a0] font-roboto-flex">
              <span className="w-2 h-2 rounded-full bg-[#a0a0a0]"></span>
              Available for full-time opportunities
            </div>
          </div>
        </div>
      </div>

      <div className='hidden md:grid grid-rows-[1fr_1fr] relative'>
        <div>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="fixed top-6 right-8 z-50 flex flex-col gap-[6px] cursor-pointer"
          >
            <span className={`block w-7 h-[2px] bg-[#ffffff] transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-[2px] bg-[#ffffff] transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-[2px] bg-[#ffffff] transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-[#0a0a0a] border-l border-[#a0a0a0]/20 shadow-2xl z-40 flex flex-col justify-center items-center !p-12 !pt-32 transition-transform duration-500 ease-in-out ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="grid grid-cols-2 gap-8 items-start w-full">
              <div className="flex flex-col gap-6">
                <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">Social</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'GitHub', href: 'https://github.com/Samiullah-2004' },
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samiullah-akram-a28461404/' },
                    { label: 'Instagram', href: 'https://instagram.com/_s_a_m_i_u_l_l_a_h_' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="text-[18px] font-roboto-flex font-normal text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">Menu</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'Home', color: 'bg-[#b4ff39]' },
                    { name: 'About Me', color: 'bg-[#ffffff]' },
                    { name: 'Projects', color: 'bg-[#a0a0a0]' }
                  ].map((item) => (
                    <a key={item.name} href={"#" + item.name.toLowerCase().replace(' ', '-')}
                      onClick={() => setNavOpen(false)}
                      className="group flex items-center gap-3 text-[18px] font-roboto-flex font-normal text-[#ffffff] hover:text-[#06f51ee6] transition-colors duration-300">
                      <span className={`w-2 h-2 rounded-full ${item.color} opacity-80 group-hover:scale-125 transition-transform duration-300`}></span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#a0a0a0]/20 w-full !mt-12 !pt-8">
              <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">Get In Touch</h3>
              <a href="mailto:samiullahmuhammadakram@gmail.com"
                className="text-[14px] font-roboto-flex font-normal text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300">
                samiullah.akram.3009@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-end items-end !mr-8 !pb-11'>
          <div className='flex flex-col gap-y-6 !p-6'>
            {[
              { num: '2+', label: 'Years of Experience' },
              { num: '4+', label: 'Projects Completed' },
              { num: '10K+', label: 'Hours Worked' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-end text-right slide-up-and-fade will-change-transform">
                <div className="text-[36px] text-[#06f51ee6] leading-[.95] font-anton">{s.num}</div>
                <p className="text-[13px] font-roboto-flex font-normal text-[#a0a0a0] !mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='md:hidden fixed top-5 right-5 z-50'>
        <button onClick={() => setNavOpen(!navOpen)} className="flex flex-col gap-[6px] cursor-pointer">
          <span className={`block w-7 h-[2px] bg-[#ffffff] transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-[2px] bg-[#ffffff] transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-[2px] bg-[#ffffff] transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
    </div>
  )
}

export default Home