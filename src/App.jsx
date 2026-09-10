import Nav from './components/Nav'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Projects from './components/Projects'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="milky-way" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      <Nav />
      <Hero />
      <Capabilities />
      <Projects />
      <Process />
      <Contact />
      <Footer />
    </>
  )
}
