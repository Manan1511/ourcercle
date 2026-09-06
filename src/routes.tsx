import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cercles from './pages/Cercles'
import Story from './pages/Story'
import Journal from './pages/Journal'
import Invite from './pages/Invite'
import NotFound from './pages/NotFound'

/**
 * Route table.
 *
 * These paths are walked at build time and written out as real HTML files
 * (dist/index.html, dist/journal.html, ...), so every route is crawlable
 * without JavaScript. Routes must therefore be statically enumerable here --
 * a path that only exists at runtime will not be prerendered.
 *
 * The pre-launch /about, /services and /contact paths are redirected in
 * netlify.toml.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cercles', element: <Cercles /> },
      { path: 'journal', element: <Journal /> },
      { path: 'story', element: <Story /> },
      { path: 'invite', element: <Invite /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
