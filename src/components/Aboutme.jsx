import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Emailbar from './Emailbar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Aboutme = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'about-me-in',
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
        id: 'about-me-out',
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
      id="about-me"
      ref={containerRef}
      className='grid grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] h-[120vh]  text-[#ffffff] overflow-hidden select-none'
    >
      <div></div>

      <div className='sticky top-0 h-screen !mt-10 !pl-6 md:!pl-12  flex flex-col justify-center'>

        <div className='flex flex-col max-w-5xl gap-y-8 md:gap-y-16'>
          <p className='text-[28px] sm:text-[36px] md:text-[68px] font-roboto-flex font-light tracking-tight text-[#ffffff] leading-[1.1] slide-up-and-fade will-change-transform'>
            I believe in a{' '}
            <span className='text-[#06f51ee6] font-roboto-flex font-medium tracking-wide'>USER-CENTERED</span>{' '}
            design approach, ensuring that every project I build is tailored to meet the specific needs of its users.
          </p>
          <div className='self-start slide-up-and-fade will-change-transform'>
            <h2 className='text-[36px] md:text-[36px] font-anton tracking-tight text-[#06f51ee6] uppercase leading-none'>
              THIS IS ME
            </h2>
          </div>
        </div>

        <div className='w-[88vw] !my-6 md:!my-8'>
          <div className='h-[1px] w-full bg-[#a0a0a0] opacity-20'></div>
        </div>

        <div className='grid grid-cols-1 w-[88vw] md:grid-cols-2 gap-x-8 gap-y-6'>
          <div>
            <p className='text-[#ffffff] text-[36px] md:text-[48px] font-light tracking-tight leading-[1.05] slide-up-and-fade will-change-transform font-roboto-flex'>
              Hi, I'm Samiullah.
            </p>
          </div>
          <div className='flex flex-col gap-y-5'>
            <p className='text-[15px] md:text-[18px] font-roboto-flex font-normal slide-up-and-fade leading-relaxed text-[#a0a0a0] will-change-transform'>
              I'm a frontend web developer dedicated to turning ideas into real,
              deployed web applications. I specialize in creating clean, responsive,
              and intuitive user experiences using HTML, CSS, JavaScript, React.js,
              and Tailwind CSS.
            </p>
            <p className='text-[15px] md:text-[18px] font-roboto-flex font-normal slide-up-and-fade leading-relaxed text-[#a0a0a0] will-change-transform'>
              I'm currently studying BSCS at Alhamra University (NCBA&E), Lahore and
              actively looking for frontend opportunities to grow and contribute to
              real-world digital products.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Aboutme