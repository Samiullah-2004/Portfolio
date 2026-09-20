import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import PasteWeb from "../projects/images/PasteWeb.png";
import CryptoWeb from "../projects/images/CryptoWeb.png";
import StoweWeb from "../projects/images/StoweWeb.png";
import ChessWeb from "../projects/images/Onyxchess.png";
import LivePinWeb from "../projects/images/Livepin.png";
import ChatSparkWeb from "../projects/images/ChatSpark.png";
import BillMateWeb from "../projects/images/BillMate.png";
import ResumeForgeWeb from "../projects/images/ResumeForge.png";
import MovieWeb from "../projects/images/MovieBrowser.png";
import CodeMeetWeb  from '../projects/images/CodeMeetWeb.png'
import ComptoirWeb from "../projects/images/Comptoir1.png";

gsap.registerPlugin(useGSAP);

const allProjects = [
  { id: "_01.", title: "ChatSpark AI",    tags: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Groq", "NextAuth.js"], link: "/chatspark",     image: ChatSparkWeb   },
  { id: "_02.", title: "CodeMeet AI",    tags: ["Next.js", "TypeScript", "WebRTC", "Socket.IO", "DynamoDB", "Gemini AI"],   link: "/codemeet",      image: CodeMeetWeb    },
  { id: "_03.", title: "Comptoir",        tags: ["React", "TypeScript", "GraphQL", "PostgreSQL", "Socket.IO", "Stripe"],      link: "/comptoir",      image: ComptoirWeb    },
  { id: "_04.", title: "BillMate",        tags: ["React", "Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma"],      link: "/billmate",      image: BillMateWeb    },
  { id: "_05.", title: "ResumeForge AI",  tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq", "JWT"],           link: "/resumeforge",   image: ResumeForgeWeb },
  { id: "_06.", title: "Stowe",           tags: ["MongoDB", "Express", "Node.js", "JWT", "Multer"],                         link: "/stowe",         image: StoweWeb       },
  { id: "_07.", title: "OnyxChess",       tags: ["Socket.IO", "chess.js", "Node.js", "Tailwind CSS"],                       link: "/onyxchess",     image: ChessWeb       },
  { id: "_08.", title: "LivePin",         tags: ["Socket.IO", "Leaflet.js", "Node.js", "Express"],                          link: "/livepin",       image: LivePinWeb     },
  { id: "_09.", title: "Movie Browser",   tags: ["React", "JavaScript", "TMDB API", "Tailwind CSS"],                        link: "/moviebrowser",  image: MovieWeb       },
  { id: "_10.", title: "Paste App",       tags: ["React", "Redux", "Tailwind CSS"],                                         link: "/pasteapp",      image: PasteWeb       },
  { id: "_11.", title: "Crypto Tracker",  tags: ["JavaScript", "CSS", "Binance API"],                                       link: "/cryptotracker", image: CryptoWeb      }
];

const AllProjects = () => {
  const containerRef      = useRef(null);
  const imageContainerRef = useRef(null);
  const curtainRef        = useRef(null);
  // Track hover via ref — no setState on mousemove (eliminates re-renders)
  const hoveredProjectRef = useRef(null);
  const [navOpen, setNavOpen]               = useState(false);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(curtainRef.current, { yPercent: 0 })
      .to(curtainRef.current, { yPercent: -100, duration: 0.9, ease: "power3.inOut" })
      .from(".proj-item", { y: 40, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power3.out" }, "-=0.3");
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollbarWidth = "none";
    const style = document.createElement("style");
    style.innerHTML = `*::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);
    return () => {
      document.documentElement.style.scrollbarWidth = "";
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const event = new CustomEvent("navStateChange", { detail: { isOpen: navOpen } });
    window.dispatchEvent(event);
  }, [navOpen]);

  useGSAP((context, contextSafe) => {
    if (window.innerWidth < 768) return;
    const handleMouseMove = contextSafe((e) => {
      if (!containerRef.current || !imageContainerRef.current) return;
      const rect     = containerRef.current.getBoundingClientRect();
      const imgRect  = imageContainerRef.current.getBoundingClientRect();
      const offsetTop = e.clientY - rect.top;
      const clampedY = Math.min(Math.max(offsetTop - imgRect.height / 2, 0), rect.height - imgRect.height);
      gsap.to(imageContainerRef.current, { y: clampedY, duration: 0.35, ease: "power2.out" });
    });
    // passive: true — cannot call preventDefault, but scroll perf improves
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  const handleMouseEnter = (projectTitle) => {
    if (window.innerWidth < 768) return;
    hoveredProjectRef.current = projectTitle;
    // Swap image directly — no React state, no re-render
    if (imageContainerRef.current) {
      imageContainerRef.current.querySelectorAll('img[data-title]').forEach((img) => {
        img.style.opacity = img.dataset.title === projectTitle ? '1' : '0';
      });
      gsap.killTweensOf(imageContainerRef.current);
      gsap.to(imageContainerRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    hoveredProjectRef.current = null;
    gsap.killTweensOf(imageContainerRef.current);
    gsap.to(imageContainerRef.current, { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" });
  };

  const handleBack = () => {
    gsap.set(curtainRef.current, { yPercent: -100 });
    gsap.to(curtainRef.current, {
      yPercent: 0,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => navigate(-1),
    });
  };

  return (
    <div>
      {/* Back button - same as BillMate */}
      <div className="max-w-4xl mx-auto w-full !px-6 md:!px-12 !pt-8 proj-item">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-roboto-flex text-neutral-400 hover:text-[#06f51ee6] transition-colors duration-300 cursor-pointer bg-transparent border-none"
        >
          <span className="text-base">←</span> Back
        </button>
      </div>

      <div className="flex flex-col justify-center items-center relative min-h-screen text-white overflow-x-hidden">

        {/* Curtain */}
        <div ref={curtainRef} className="fixed inset-0 z-[100] bg-[#06f51ee6] pointer-events-none" />

        {/* Navbar toggle - same as BillMate */}
        <button onClick={() => setNavOpen(!navOpen)} className="fixed top-6 right-8 z-50 flex flex-col gap-[6px] cursor-pointer">
          <span className={`block w-7 h-[2px] bg-white transition-all duration-300 ${navOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-[2px] bg-white transition-all duration-300 ${navOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-[2px] bg-white transition-all duration-300 ${navOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Nav drawer - same as BillMate */}
        <div className={`fixed top-0 right-0 bottom-0 w-[93vw] sm:w-[460px] bg-[#0a0a0a] border-l border-[#a0a0a0]/20 shadow-2xl z-40 flex flex-col justify-center items-center !p-12 !pt-32 transition-transform duration-500 ease-in-out ${navOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="grid grid-cols-2 gap-8 items-start w-full">
            <div className="flex flex-col gap-6">
              <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">Social</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: "GitHub",   href: "https://github.com/Samiullah-2004" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/samiullah-akram-a28461404/" },
                  { label: "UpWork",   href: "https://www.upwork.com/freelancers/~01ffa5cf678d8eff63" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="text-[18px] font-roboto-flex text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">Menu</h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Home",     color: "bg-[#b4ff39]" },
                  { name: "About Me", color: "bg-[#ffffff]" },
                  { name: "Projects", color: "bg-[#a0a0a0]" },
                ].map((item) => (
                  <a key={item.name} href={"/#" + item.name.toLowerCase().replace(" ", "-")}
                    onClick={() => setNavOpen(false)}
                    className="group flex items-center gap-3 text-[18px] font-roboto-flex text-[#ffffff] hover:text-[#06f51ee6] transition-colors duration-300">
                    <span className={`w-2 h-2 rounded-full ${item.color} opacity-80 group-hover:scale-125 transition-transform duration-300`}></span>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#a0a0a0]/20 w-full !mt-12 !pt-8">
            <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">Get In Touch</h3>
            <a href="mailto:samiullah.akram.3009@gmail.com"
              className="text-[14px] font-roboto-flex text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300">
              samiullah.akram.3009@gmail.com
            </a>
          </div>
        </div>

        {/* Main content */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-[16px_1fr] sm:grid-cols-[28px_1fr] md:grid-cols-[35px_1fr] min-h-screen text-[#ffffff] overflow-hidden !py-20 w-full"
        >
          <div></div>

          {/* Hover image */}
          <div
            ref={imageContainerRef}
            className="hidden md:block absolute right-16 top-0 z-20 pointer-events-none opacity-0 w-[350px] lg:w-[460px] xl:w-[600px] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 shadow-2xl"
            style={{ willChange: "transform, opacity" }}
          >
            {allProjects.map((p) => (
              <img
                key={p.title}
                src={p.image}
                alt={p.title}
                data-title={p.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: 0, transition: "opacity 0.15s ease" }}
              />
            ))}
          </div>

          <div className="!pl-4 sm:!pl-6 md:!pl-12 flex flex-col gap-y-6 md:gap-y-12 !pr-4 md:!pr-12">

            {/* Header */}
            <div className="flex items-center gap-x-4 max-w-5xl proj-item !pt-4">
              <div className="relative w-8 h-8 md:w-12 md:h-12 animate-spin flex-shrink-0" style={{ animationDuration: "6s" }}>
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <div key={angle} className="absolute w-1.5 h-4 bg-[#06f51ee6] rounded-full top-1/2 left-1/2"
                    style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)`, transformOrigin: "50% 100%", opacity: 0.4 + (angle / 300) * 0.6 }}
                  />
                ))}
              </div>
              <h2 className="text-[36px] sm:text-[48px] md:text-[36px] leading-[.95] tracking-tight text-[#06f51ee6] uppercase font-anton">
                ALL PROJECTS
              </h2>
            </div>

            {/* Project list */}
            <div className="flex flex-col gap-y-6 md:gap-y-12 max-w-5xl !pr-4 md:!pr-12">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-row group select-none items-start proj-item"
              onMouseEnter={() => handleMouseEnter(project.title)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-[15px] md:text-[18px] font-roboto-flex font-normal text-[#a0a0a0] tracking-tighter !pt-1 md:!pt-2 flex-shrink-0">
                {project.id}
              </p>

              <Link to={project.link} className="!pl-3 sm:!pl-6 gap-y-2 flex flex-col flex-1 cursor-pointer">

                <h3 className="text-[32px] sm:text-[40px] md:text-[48px] tracking-tight uppercase font-anton leading-none relative inline-flex items-center gap-3 cursor-pointer overflow-hidden">
                  <span className="text-[#d0cdcdde] flex items-center gap-3">
                    {project.title}
                  </span>

                  <span className="absolute inset-0 text-[#06f51ee6] flex items-center gap-3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out">
                    {project.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 mb-1"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </h3>

                <div className="flex flex-wrap flex-row gap-x-4 sm:gap-x-8 gap-y-2">
                  {project.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#a0a0a0] inline-block flex-shrink-0"></span>
                      <span className="text-[12px] sm:text-[14px] font-roboto-flex font-normal text-[#a0a0a0] tracking-wide">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

              </Link>
            </div>
          ))}
        </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;