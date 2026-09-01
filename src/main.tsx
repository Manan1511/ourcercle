import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces/opsz.css'
import './styles/index.css'

export const createRoot = ViteReactSSG({ routes })
