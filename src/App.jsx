import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Aboutme from "./components/Aboutme";
import Projects from "./components/Projects";
import MyStack from "./components/MyStack";
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

function App() {
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
      path: "/all-projects",
      element: (
        <div>
          <ScrollProgressIndicator />
          <Emailbar />
          <AllProjects />
          <Contact />
        </div>
      ),
    }
  ]);

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

          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;
