import { Navigate } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'
import Cercles from './pages/Cercles'
import Story from './pages/Story'
import Journal from './pages/Journal'
import Invite from './pages/Invite'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/admin/Login'
import AdminInvites from './pages/admin/Invites'
import AdminJournal from './pages/admin/Journal'
import AdminCercles from './pages/admin/Cercles'

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
 *
 * /admin is a small FIXED set of routes, not per-record dynamic ones
 * (no /admin/journal/:id) -- editing a specific record is driven by a
 * ?edit= search param instead. See the admin panel plan for why: a dynamic
 * segment here would need every record's ID at build time to prerender, and
 * netlify.toml's catch-all serves the homepage's content (not a clean SPA
 * shell) at unmatched paths, so a direct load of an unprerendered dynamic
 * route would hydrate on top of the wrong page. Not linked from the public
 * nav -- direct URL only, and every admin page renders <Seo noIndex />.
 *
 * Each /admin/* path is its own literal top-level entry here rather than a
 * nested child of a shared layout route -- vite-react-ssg 0.9.2's static
 * path resolver loses the accumulated prefix when it walks a pathless
 * layout route (children silently failed to prerender, or landed at the
 * wrong URL, until this was flattened). AdminLayout is a component each
 * page wraps itself in, not a route-level Outlet layout.
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
  { path: 'admin/login', element: <AdminLogin /> },
  {
    path: 'admin',
    element: <Navigate to="/admin/invites" replace />,
  },
  {
    path: 'admin/invites',
    element: (
      <AdminLayout>
        <AdminInvites />
      </AdminLayout>
    ),
  },
  {
    path: 'admin/journal',
    element: (
      <AdminLayout>
        <AdminJournal />
      </AdminLayout>
    ),
  },
  {
    path: 'admin/cercles',
    element: (
      <AdminLayout>
        <AdminCercles />
      </AdminLayout>
    ),
  },
]
