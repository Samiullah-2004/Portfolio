import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import HomePage from './pages/HomePage'
import AllProjects from './pages/AllProjects'
import DetailRoute from './pages/DetailRoute'
import NotFound from './pages/NotFound'
import GlassCursor from './components/GlassCursor'

// three.js + postprocessing are heavy — load the background in its own chunk so content paints first
const GridScan = lazy(() => import('./components/background/GridScan').then((m) => ({ default: m.GridScan })))

// Router at module scope — never recreated on re-renders.
// Every project / experience lives at /:slug (e.g. /smokescreen, /chatspark, /jaytech).
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/all-projects', element: <AllProjects /> },
      // Old standalone routes now live as sections on the home page
      { path: '/aboutme', element: <Navigate to="/#about-me" replace /> },
      { path: '/projects', element: <Navigate to="/#projects" replace /> },
      { path: '/:slug', element: <DetailRoute /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

const App = () => (
  <>
    {/* Animated grid background + vignette, fixed behind every page */}
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Suspense fallback={null}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2A2B2F"
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
        />
      </Suspense>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0)_0%,rgba(10,10,10,0.45)_65%,rgba(10,10,10,0.85)_100%)]" />
    </div>

    <GlassCursor />

    <div className="relative z-10 text-white">
      <RouterProvider router={router} />
    </div>
  </>
)

export default App
