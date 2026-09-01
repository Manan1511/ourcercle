import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/**
 * Route table.
 *
 * These paths are walked at build time and written out as real HTML files
 * (dist/index.html, dist/about/index.html, ...), so every route is crawlable
 * without JavaScript. Routes must therefore be statically enumerable here --
 * a path that only exists at runtime will not be prerendered.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
