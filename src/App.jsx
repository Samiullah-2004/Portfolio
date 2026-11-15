import { useLayoutEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import HomePage from './pages/HomePage'
import AllProjects from './pages/AllProjects'
import DetailRoute from './pages/DetailRoute'
import NotFound from './pages/NotFound'
import GlassCursor from './components/GlassCursor'
import GridBackground from './components/background/GridBackground'

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

const App = () => {
  // index.html paints a static boot screen until React is on screen. Remove it here (after the
  // first commit, when the preloader — if any — is already painted) rather than inside the
  // preloader, so every render path clears it, including the router's error page.
  useLayoutEffect(() => {
    document.getElementById('boot')?.remove()
  }, [])

  return (
  <>
    {/* Animated grid background + vignette, fixed behind every page */}
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <GridBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0)_0%,rgba(10,10,10,0.45)_65%,rgba(10,10,10,0.85)_100%)]" />
    </div>

    <GlassCursor />

    <div className="relative z-10 text-white">
      <RouterProvider router={router} />
    </div>
  </>
  )
}

export default App
