import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const overlayRef = useRef(null);
  const textRefs = useRef([]);
  const mainRef = useRef(null);

  useEffect(() => {
    // Add iconify script if it doesn't exist
    if (!document.querySelector('script[src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for nav anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          lenis.scrollTo(target, { offset: 0, duration: 1.5 });
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useGSAP(() => {
    // Cinematic entrance transition
    const tl = gsap.timeline();

    gsap.set(textRefs.current, { y: 20, opacity: 0, filter: "blur(10px)" });

    tl.to(textRefs.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    })
      .to(textRefs.current, {
        y: -20,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        delay: 0.4
      })
      .to(overlayRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "expo.inOut",
      }, "-=0.2");

    // Storytelling Global Flow: Subtle scroll overlap across major sections
    const sections = gsap.utils.toArray('section:not(#hero)');
    sections.forEach((sec) => {
      gsap.fromTo(sec,
        { y: 100, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          ease: "sine.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 95%",
            end: "top 15%",
            scrub: 1.5,
          }
        }
      );
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">

      {/* Dynamic Noise Grain */}
      <div className="fixed inset-0 z-[110] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Intro Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="overflow-hidden"><span ref={el => textRefs.current[0] = el} className="block text-white display-font text-3xl md:text-5xl font-black uppercase tracking-widest leading-none">Raktim Sonowal</span></div>
          <div className="overflow-hidden"><span ref={el => textRefs.current[1] = el} className="block text-zinc-500 font-sans text-sm md:text-base font-bold uppercase tracking-[0.2em] leading-none">Frontend Developer</span></div>
          <div className="overflow-hidden mt-6"><span ref={el => textRefs.current[2] = el} className="block text-[#ff2a2a] font-sans text-xs font-black uppercase tracking-[0.4em] leading-none animate-pulse">Loading Experience...</span></div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto mix-blend-difference">
          <a href="#hero" className="display-font text-2xl font-black tracking-tighter hover:opacity-70 transition-opacity">RS</a>
        </div>
        <div className="hidden md:flex items-center gap-12 pointer-events-auto bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10">
          <a href="#about" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#ff3333] transition-colors">About</a>
          <a href="#skills" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#ff3333] transition-colors">Skills</a>
          <a href="#projects" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#ff3333] transition-colors">Work</a>
          <a href="#contact" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-[#ff3333] transition-colors">Contact</a>
        </div>
        <div className="pointer-events-auto mix-blend-difference">
          <a href="#contact" className="hidden lg:block bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#ff3333] hover:text-white transition-all">Hire Me</a>
        </div>
      </nav>

      <Hero />
      <About />
      <Skills />
      <Projects />

      {/* EDUCATION & ACHIEVEMENTS SECTION WRAPPER */}
      <section id="education" className="w-full px-6 md:px-12 bg-zinc-100 text-black">
        <div className="editorial-grid">
          <Education />
          <Achievements />
        </div>
      </section>

      <Contact />

      {/* FOOTER */}
      <footer className="w-full px-8 md:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 opacity-40 relative z-10 bg-[#0a0a0a]">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">© 2024 Raktim Sonowal. Designed with Precision.</p>
        <div className="flex gap-8 items-center">
          <a href="https://github.com/Redeeyak1318" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/raktim-sonowal-m1318" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Status: Online</span>
        </div>
      </footer>
    </div>
  );
}
