import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CodeMeetWeb1 from "../projects/images/CodeMeetWeb.png";
import CodeMeetWeb2 from "../projects/images/CodeMeetWeb2.png";
import CodeMeetWeb3 from "../projects/images/CodeMeetWeb3.png";
import ScrollStack, { ScrollStackItem } from "./ScrollStack/ScrollStack.jsx";

gsap.registerPlugin(useGSAP);

const CodeMeet = () => {
  const [navOpen, setNavOpen] = useState(false);
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(curtainRef.current, { yPercent: 0 })
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .from(
        contentRef.current.querySelectorAll(".reveal"),
        { y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" },
        "-=0.3",
      );
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
    const event = new CustomEvent("navStateChange", {
      detail: { isOpen: navOpen },
    });
    window.dispatchEvent(event);
  }, [navOpen]);

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
      <div className="max-w-4xl mx-auto w-full !px-6 md:!px-12 !pt-8 reveal">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-roboto-flex text-neutral-400 hover:text-[#06f51ee6] transition-colors duration-300 cursor-pointer bg-transparent border-none"
        >
          <span className="text-base">←</span> Back
        </button>
      </div>

      <div className="flex flex-col justify-center items-center relative min-h-screen text-white overflow-x-hidden">
        <div
          ref={curtainRef}
          className="fixed inset-0 z-[100] bg-[#06f51ee6] pointer-events-none"
        />

        <button
          onClick={() => setNavOpen(!navOpen)}
          className="fixed top-6 right-8 z-50 flex flex-col gap-[6px] cursor-pointer"
        >
          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-300 ${navOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-300 ${navOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-7 h-[2px] bg-white transition-all duration-300 ${navOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>

        <div
          className={`fixed top-0 right-0 bottom-0 w-[93vw] sm:w-[460px] bg-[#0a0a0a] border-l border-[#a0a0a0]/20 shadow-2xl z-40 flex flex-col justify-center items-center !p-12 !pt-32 transition-transform duration-500 ease-in-out ${navOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="grid grid-cols-2 gap-8 items-start w-full">
            <div className="flex flex-col gap-6">
              <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">
                Social
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "GitHub",
                    href: "https://github.com/Samiullah-2004",
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/samiullah-akram-a28461404/",
                  },
                  {
                    label: "UpWork",
                    href: "https://www.upwork.com/freelancers/~01ffa5cf678d8eff63",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[18px] font-roboto-flex text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">
                Menu
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Home", color: "bg-[#b4ff39]" },
                  { name: "About Me", color: "bg-[#ffffff]" },
                  { name: "Projects", color: "bg-[#a0a0a0]" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={"/#" + item.name.toLowerCase().replace(" ", "-")}
                    onClick={() => setNavOpen(false)}
                    className="group flex items-center gap-3 text-[18px] font-roboto-flex text-[#ffffff] hover:text-[#06f51ee6] transition-colors duration-300"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${item.color} opacity-80 group-hover:scale-125 transition-transform duration-300`}
                    ></span>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#a0a0a0]/20 w-full !mt-12 !pt-8">
            <h3 className="text-[13px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">
              Get In Touch
            </h3>
            <a
              href="mailto:samiullah.akram.3009@gmail.com"
              className="text-[14px] font-roboto-flex text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300"
            >
              samiullah.akram.3009@gmail.com
            </a>
          </div>
        </div>

        <div
          ref={contentRef}
          className="max-w-4xl mx-auto !px-6 md:!px-12 pb-0"
        >
          <div className="flex flex-col !mt-24 md:!mt-36 reveal">
            <div className="flex items-center gap-x-4">
              <h1 className="text-[56px] md:text-[80px] xl:text-[100px] font-anton tracking-tight text-white uppercase leading-none">
                CodeMeet AI
              </h1>
              {/* TODO: add your live deployed link here once confirmed */}
              <a
                href="https://github.com/Samiullah-2004/codemeet-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a0a0a0] hover:text-[#06f51ee6] transition-colors duration-300 self-end !mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 md:w-10 md:h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
            <div className="w-full h-[1px] bg-[#a0a0a0]/20 !mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 !mt-10 reveal">
            {[
              { label: "Year", value: "2026" },
              { label: "Role", value: "Full Stack Developer" },
              {
                label: "Stack",
                value:
                  "Next.js · TypeScript · WebRTC · Socket.IO · DynamoDB · Gemini AI",
              },
              { label: "Deployed", value: "EC2 (Signaling)" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <h2 className="text-[11px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase">
                  {m.label}
                </h2>
                <p className="text-[15px] font-roboto-flex text-white">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div className="!mt-12 reveal">
            <h2 className="text-[11px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase !mb-4">
              About
            </h2>
            <p className="text-[17px] font-roboto-flex text-[#c0c0c0] leading-relaxed">
              A real-time technical interview platform built from scratch, with
              peer-to-peer WebRTC video, a live shared Monaco code editor, and
              Gemini-powered AI code review. Built end to end with Next.js 16,
              TypeScript, and Tailwind CSS, Socket.IO handles real-time
              signaling on EC2, DynamoDB stores interview session data, and
              NextAuth handles authentication. CI/CD was set up from day one via
              GitHub Actions with OIDC, and the whole project was maintained
              through a branch-protection Git workflow throughout.
            </p>
          </div>

          <div className="!mt-12 reveal">
            <h2 className="text-[11px] font-roboto-flex font-semibold tracking-[0.2em] text-[#a0a0a0] uppercase !mb-6">
              Key Features
            </h2>
            <div className="flex flex-col gap-y-0">
              {[
                {
                  icon: "🎥",
                  title: "Peer-to-Peer Video",
                  desc: "Real-time video calling built directly on WebRTC, with Socket.IO handling signaling on EC2 for connection setup between peers.",
                },
                {
                  icon: "💻",
                  title: "Live Shared Code Editor",
                  desc: "A synchronized Monaco Editor so both interviewer and candidate see code changes in real time during the session.",
                },
                {
                  icon: "🤖",
                  title: "AI Code Review",
                  desc: "Google Gemini analyzes submitted code and provides live feedback, helping surface issues during the interview itself.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-x-4 border-t border-[#a0a0a0]/10 !py-5"
                >
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-[15px] font-roboto-flex font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="text-[14px] font-roboto-flex text-[#a0a0a0] !mt-1">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="!mt-16 reveal">
            <ScrollStack useWindowScroll>
              <ScrollStackItem>
                <img
                  src={CodeMeetWeb2}
                  alt="CodeMeet AI Preview 2"
                  className="absolute inset-0 w-full h-full object-cover rounded-[40px]"
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <img
                  src={CodeMeetWeb1}
                  alt="CodeMeet AI Preview 1"
                  className="absolute inset-0 w-full h-full object-cover rounded-[40px]"
                />
              </ScrollStackItem>
              <ScrollStackItem>
                <img
                  src={CodeMeetWeb3}
                  alt="CodeMeet AI Preview 3"
                  className="absolute inset-0 w-full h-full object-cover rounded-[40px]"
                />
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeMeet;
