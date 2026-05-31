'use client';
import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        const container = containerRef.current;
        const svg = svgRef.current;
        const path = pathRef.current;
        if (!container || !svg || !path) return;

        // 1. Smoothly track mouse coordinates
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            container.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            container.style.opacity = '1';
        };

        // 2. React when hovering over interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            // Detects buttons, links, or elements with custom pointer classes
            if (target.closest('button, a, [role="button"], .cursor-pointer')) {
                svg.classList.add('scale-135', 'rotate-[15deg]');
                path.setAttribute('fill', '#ffffff');       {/* ⚪ Turns white inside */}
                path.setAttribute('stroke', '#06f51ee6');   {/* 🟢 Neon green border */}
            }
        };

        // 3. Reset back to normal when leaving the element
        const handleMouseOut = (e) => {
            const nextTarget = e.relatedTarget;
            // Only reset if the mouse is fully exiting the clickable element layout
            if (!nextTarget || !nextTarget.closest('button, a, [role="button"], .cursor-pointer')) {
                svg.classList.remove('scale-135', 'rotate-[15deg]');
                path.setAttribute('fill', '#06f51ee6');     {/* 🟢 Back to neon green */}
                path.setAttribute('stroke', '#ffffff');     {/* ⚪ Back to white border */}
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        /* Outer Tracking Wrapper */
        <div
            ref={containerRef}
            className="hidden md:block fixed top-0 left-0 opacity-0 z-[9999] pointer-events-none will-change-transform transition-transform duration-100 ease-out"
        >
            {/* Inner Graphic Element (Handles Hover Transformations) */}
            <svg
                ref={svgRef}
                width="27"
                height="30"
                viewBox="0 0 27 30"
                fill="none"
                className="transition-all duration-200 ease-out origin-top-left"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={pathRef}
                    d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                    fill="#06f51ee6"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
};

export default CustomCursor;