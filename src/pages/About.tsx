import PageShell from '../components/PageShell'
import { about } from '../content/pages'

export default function About() {
  return <PageShell content={about} path="/about" />
}
