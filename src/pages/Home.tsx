import Intro from '../components/Intro'
import PageShell from '../components/PageShell'
import { home } from '../content/pages'

export default function Home() {
  return (
    <>
      {/* Homepage only: someone arriving on /journal from search reads
          immediately rather than waiting behind a brand animation. */}
      <Intro />
      <PageShell content={home} path="/" />
    </>
  )
}
