import React from 'react'

const Emailbar = () => {
  return (
    <div className="flex fixed top-1/2 -translate-y-1/2 left-0 sm:top-auto sm:bottom-32 sm:translate-y-0 sm:left-2 z-50 flex-col justify-center items-center">
      <a  
        href="mailto:samiullah.akram.3009@gmail.com"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        className="tracking-widest font-anton text-[10px] sm:text-sm text-neutral-400 hover:text-[#06f51ee6] transition-colors duration-300 px-2 sm:px-3"
      >
        samiullah.akram.3009@gmail.com
      </a>
    </div>
  )
}

export default Emailbar