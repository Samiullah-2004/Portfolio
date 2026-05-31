import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Emailbar from './Emailbar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Contact = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'contact-in',
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
        id: 'contact-out',
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
      ref={containerRef}
      className='grid grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] text-[#ffffff] min-h-[40vh] md:h-[90vh] overflow-hidden'
    >
      <div></div>

      <div className='flex flex-col justify-center items-center w-full !pb-10 !pl-6 !pr-6 md:!px-12 gap-y-5'>

        <div className='flex flex-col justify-center items-center gap-y-6 text-center max-w-4xl w-full slide-up-and-fade will-change-transform'>
          <p className='text-[13px] md:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-widest uppercase animate-pulse'>
            Have a project in mind?
          </p>

          <a
            href="mailto:samiullah.akram.3009@gmail.com"
            className="font-anton tracking-tighter text-[22px] sm:text-[34px] md:text-[48px] lg:text-[60px] text-[#ffffff] hover:text-[#06f51ee6] transition-colors duration-300 break-all"
          >
            samiullah.akram.3009@gmail.com
          </a>
        </div>

        <div className='text-center !pt-8 border-t border-[#a0a0a0]/20 w-full max-w-xs slide-up-and-fade will-change-transform'>
          <a
            href="https://github.com/Samiullah-2004"
            target="_blank"
            rel="noopener noreferrer"
            className='text-[13px] md:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-widest uppercase hover:text-[#06f51ee6] transition-colors duration-300 inline-block'
          >
            Designed &amp; Built by Samiullah
          </a>
        </div>

      </div>
    </div>
  )
}

export default Contact