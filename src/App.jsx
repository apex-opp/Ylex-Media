import React, { Suspense, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Background3D from './components/Background3D.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

gsap.registerPlugin(ScrollTrigger);

const Home = React.lazy(() => import('./pages/Home.jsx'));
const Services = React.lazy(() => import('./pages/Services.jsx'));
const About = React.lazy(() => import('./pages/About.jsx'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));

function RouteStage({ children }) {
  const ref = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 14, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' },
      );
    }, el);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <main ref={ref} className="relative">
      {children}
    </main>
  );
}

function RouteFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="glass rounded-2xl p-6">
        <div className="h-6 w-40 rounded bg-white/10" />
        <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
        <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-24 rounded-xl bg-white/5" />
          <div className="h-24 rounded-xl bg-white/5" />
          <div className="h-24 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Background3D />
      <CustomCursor />
      <Navbar />

      <SmoothScroll>
        <div className="pt-20">
          <RouteStage key={location.pathname}>
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </RouteStage>
          <Footer />
        </div>
      </SmoothScroll>
    </div>
  );
}
