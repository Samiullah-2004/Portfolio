import React from 'react'

const Emailbar = () => {
  return (
    <div className="hidden xl:flex fixed bottom-32 left-2 z-50 flex-col items-center">
      <a  
        href="mailto:samiullah.akram.3009@gmail.com"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        className="tracking-widest font-anton text-sm text-neutral-400 hover:text-[#06f51ee6] transition-colors duration-300 px-3"
      >
        samiullah.akram.3009@gmail.com
      </a>
    </div>
  )
}

export default Emailbar