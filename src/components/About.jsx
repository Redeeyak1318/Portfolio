import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    useGSAP(() => {
        // Narrative Sequence Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        // Reveal Title
        tl.fromTo(titleRef.current,
            { y: 80, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
            {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.4,
                ease: "power4.out"
            }
        );

        // Sequence paragraphs smoothly after title
        tl.fromTo(gsap.utils.toArray(textRef.current.children),
            { y: 40, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
            {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out"
            },
            "-=1.0" // overlapping start
        );

        // Button reveal with hover preset state
        tl.fromTo(btnRef.current,
            { scale: 0.95, opacity: 0, rotationX: 10 },
            {
                scale: 1,
                opacity: 1,
                rotationX: 0,
                duration: 1.2,
                ease: "power3.out"
            },
            "-=0.8"
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="w-full py-24 md:py-32 px-8 md:px-16 bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/5">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 overflow-hidden"><span ref={titleRef} className="block">01 // The Persona</span></h2>
                        <p className="display-font text-4xl md:text-5xl font-bold leading-tight">
                            Bridging the gap between raw functional code and high-end visual design.
                        </p>
                    </div>
                    <div ref={textRef} className="prose prose-invert prose-lg text-zinc-400 leading-relaxed max-w-none">
                        <p>
                            I am Raktim Sonowal, a Computer Science and Engineering student at Dibrugarh University Institute of Engineering & Technology (DUIET) and concurrently pursuing a BSc in Data Science from IIT Madras.
                        </p>
                        <p>
                            I specialize in building complex, high-performance web applications that don't sacrifice aesthetic integrity. With a background in both engineering and design, I treat every project as a piece of digital architecture.
                        </p>
                    </div>
                    <div className="pt-4" ref={btnRef}>
                        <span className="inline-block px-8 py-4 rounded-2xl bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-[#ff3333] hover:text-white transition-colors cursor-pointer transform-gpu">
                            Download Dossier
                        </span>
                    </div>
                </div>

                <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-900 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Portrait" className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                    <div className="absolute bottom-10 left-10 z-20">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-60 mb-2">Current Mood</p>
                        <p className="display-font text-2xl">Building the Future.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
