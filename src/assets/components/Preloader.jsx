import React, { useEffect, useState } from 'react';

let hasShownPreloader = false;

const Preloader = () => {
  const [phase, setPhase] = useState(() => {
    if (hasShownPreloader) return 'hidden'
    return 'initial'
  });

  const nameToAnimate = "SAMIULLAH";

  useEffect(() => {
    if (phase === 'hidden') return

    hasShownPreloader = true 

    const textTimer = setTimeout(() => setPhase('animateText'), 100);
    const exitTimer = setTimeout(() => setPhase('exit'), 1600);
    const hiddenTimer = setTimeout(() => setPhase('hidden'), 2800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(hiddenTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex select-none bg-transparent ${
        phase === 'exit' ? 'pointer-events-none' : ''
      }`}
    >
      <div className="absolute inset-0 flex w-full h-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`h-full w-[10%] bg-black transition-transform duration-600 ease-in-out ${
              phase === 'exit' ? 'translate-y-full' : 'translate-y-0'
            }`}
            style={{
              transitionDelay: phase === 'exit' ? `${index * 60}ms` : '0ms'
            }}
          />
        ))}
      </div>

      <p
        className={`name-text flex gap-x-1 text-[14vw] lg:text-[160px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden text-[#a0a0a0]  tracking-tight z-10 transition-opacity duration-400 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {nameToAnimate.split("").map((letter, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-500 ${
              phase !== 'initial' ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{
              transitionDelay: phase !== 'initial' ? `${index * 40}ms` : '0ms'
            }}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Preloader;