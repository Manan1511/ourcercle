import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Upcoming from './pages/Upcoming'
import NotFound from './pages/NotFound'

/**
 * Route table.
 *
 * These paths are walked at build time and written out as real HTML files
 * (dist/index.html, dist/journal.html, ...), so every route is crawlable
 * without JavaScript. Routes must therefore be statically enumerable here --
 * a path that only exists at runtime will not be prerendered.
 *
 * /cercles, /story and /invite are designed but not yet implemented; they
 * render noindex placeholders so the designed navigation isn't broken.
 * The pre-launch /about, /services and /contact paths are redirected in
 * netlify.toml.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cercles', element: <Upcoming page="cercles" path="/cercles" /> },
      { path: 'journal', element: <Journal /> },
      { path: 'story', element: <Upcoming page="story" path="/story" /> },
      { path: 'invite', element: <Upcoming page="invite" path="/invite" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
