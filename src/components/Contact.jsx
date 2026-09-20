import { useRef } from 'react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const Contact = () => {
  const containerRef = useRef(null)

  useSectionReveal({ id: 'contact', selector: '.slide-up-and-fade', containerRef })

  return (
    <div
      ref={containerRef}
      className='grid grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] text-[#ffffff] min-h-[40vh] md:h-[90vh] overflow-clip'
    >
      <div></div>

      <div className='flex flex-col justify-center items-center w-full !pb-10 !pl-6 !pr-6 md:!px-12 gap-y-5'>

        <div className='flex flex-col justify-center items-center gap-y-6 text-center max-w-4xl w-full slide-up-and-fade'>
          <p className='text-[13px] md:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-widest uppercase animate-pulse'>
            Have a project in mind?
          </p>

          <a
            href="mailto:samiullah.akram.3009@gmail.com"
           className="font-anton tracking-tighter text-[24px] xs:text-[28px] sm:text-4xl md:text-[48px] lg:text-[45px] text-[#a0a0a0] hover:text-[#06f51ee6] hover:underline transition-colors duration-300 whitespace-nowrap"
          >
            samiullah.akram.3009@gmail.com
          </a>
        </div>

        <div className='text-center !pt-8 border-t border-[#a0a0a0]/20 w-full max-w-xs slide-up-and-fade'>
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