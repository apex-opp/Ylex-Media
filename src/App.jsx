import React, { useLayoutEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Background3D from './components/Background3D.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'

import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Contact from './pages/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

function RouteStage({ children }) {
  const ref = useRef(null)
  const location = useLocation()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 14, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' },
      )
    }, el)
    return () => ctx.revert()
  }, [location.pathname])

  return (
    <main ref={ref} className="relative">
      {children}
    </main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen">
      <Background3D />
      <CustomCursor />
      <Navbar />

      <SmoothScroll>
        <div className="pt-20">
          <RouteStage key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </RouteStage>
          <Footer />
        </div>
      </SmoothScroll>
    </div>
  )
}
