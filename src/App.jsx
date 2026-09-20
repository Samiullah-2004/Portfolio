import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { globalLenis } from "./hooks/useLenis.jsx";

import Home from "./components/Home";
import Aboutme from "./components/Aboutme";
import Projects from "./components/Projects";
import MyStack from "./components/MyStack";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import AllProjects from "./components/AllProjects";
import Pasteapp from "./projects/Pasteapp";
import Cryptotracker from "./projects/Cryptotracker";
import Skycast from "./projects/Skycast";
import Stowe from "./projects/Stowe";
import Oxyn from "./projects/Onyx";
import Livepin from "./projects/Livepin";

import { GridScan } from "./GridScan";
import Preloader from "./assets/components/Preloader";
import Emailbar from "./components/Emailbar";
import CustomCursor from "./Cursor/CustomCursor";
import ScrollProgressIndicator from "./assets/components/ScrollProgressIndicator";
import ChatSpark from "./projects/ChatSpark";
import BillMate from "./projects/BillMate";
import ResumeForge from "./projects/ResumeForge";
import MovieBrowser from "./projects/MovieBrowser";
import CodeMeet from "./projects/CodeMeet";
import Comptoir from "./projects/Comptoir";
import JayTech from "./experience/JayTech";
import Qwetrum from "./experience/Qwetrum";
import DecodeLabs from "./experience/DecodeLabs";

gsap.registerPlugin(ScrollTrigger);

// ─── Router at module scope — never recreated on re-renders ──────────────────
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Preloader />
        <Emailbar />
        <Home />
        <Aboutme />
        <MyStack />
        <Experience />
        <Projects />
        <Contact />
      </div>
    ),
  },
  {
    path: "/aboutme",
    element: <Aboutme />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/pasteapp",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Pasteapp />
        <Contact />
      </div>
    ),
  },
  {
    path: "/cryptotracker",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Cryptotracker />
        <Contact />
      </div>
    ),
  },
  {
    path: "/skycast",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Skycast />
        <Contact />
      </div>
    ),
  },
  {
    path: "/stowe",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Stowe />
        <Contact />
      </div>
    ),
  },
  {
    path: "/onyxchess",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Oxyn />
        <Contact />
      </div>
    ),
  },
  {
    path: "/livepin",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Livepin />
        <Contact />
      </div>
    ),
  },
  {
    path: "/chatspark",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <ChatSpark />
        <Contact />
      </div>
    ),
  },
  {
    path: "/codemeet",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <CodeMeet/>
        <Contact />
      </div>
    ),
  },
  {
    path: "/comptoir",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Comptoir />
        <Contact />
      </div>
    ),
  },
  {
    path: "/billmate",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <BillMate />
        <Contact />
      </div>
    ),
  },
  {
    path: "/resumeforge",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <ResumeForge />
        <Contact />
      </div>
    ),
  },
  {
    path: "/moviebrowser",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <MovieBrowser />
        <Contact />
      </div>
    ),
  },
  {
    path: "/jaytech",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <JayTech />
        <Contact />
      </div>
    ),
  },
  {
    path: "/qwetrum",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <Qwetrum />
        <Contact />
      </div>
    ),
  },
  {
    path: "/decodelabs",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <DecodeLabs />
        <Contact />
      </div>
    ),
  },
  {
    path: "/all-projects",
    element: (
      <div>
        <ScrollProgressIndicator />
        <Emailbar />
        <AllProjects />
        <Contact />
      </div>
    ),
  },
]);

// ─── Route-change side-effects: scroll to top + refresh triggers ──────────────
function RouteChangeHandler() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on every navigation
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Handle hash links like /#projects, /#experience
    if (location.hash) {
      const id = location.hash.slice(1); // remove '#'
      const target = document.getElementById(id);
      if (target) {
        // Small delay to let new route render before scrolling
        requestAnimationFrame(() => {
          if (globalLenis) {
            globalLenis.scrollTo(target, { offset: -80, duration: 1 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }

    // Refresh ScrollTrigger positions after layout settles
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#a0a0a0"
          scanOpacity={0.25}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          lineJitter={0.1}
          scanGlow={0.5}
          scanSoftness={2}
          enableWebcam={false}
          showPreview={false}
        />
      </div>

      <div
        style={{ position: "relative", zIndex: 10, pointerEvents: "none" }}
        className="text-white"
      >
        <div style={{ pointerEvents: "auto" }} className="md:cursor-none">
          <CustomCursor />

          <RouterProvider router={router}>
            <RouteChangeHandler />
          </RouterProvider>
        </div>
      </div>
    </>
  );
}

export default App;