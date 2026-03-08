import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const heroRef = useRef(null);
    const vibeRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const dotRef = useRef(null);
    const descRef = useRef(null);
    const scrollRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 2.2 }); // Wait for App overlay

        // Cinematic Entrance: Image/Container Scale
        gsap.set(heroRef.current, { scale: 1.05 });
        tl.to(heroRef.current, {
            scale: 1,
            duration: 2,
            ease: "power3.out"
        }, 0);

        // Dynamic Text Reveal Strategy
        const titleElements = [title1Ref.current, title2Ref.current];
        tl.fromTo(titleElements,
            { y: 150, opacity: 0, rotationX: 20 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.4,
                stagger: 0.15,
                ease: "power4.out"
            },
            0.2 // Stagger slightly after scale begins
        )
            .fromTo(dotRef.current,
                { scale: 0, opacity: 0, x: -20 },
                { scale: 1, opacity: 1, x: 0, duration: 0.8, ease: "back.out(2)" },
                "-=0.8"
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' },
                { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: "power3.out" },
                "-=1.0"
            )
            .fromTo(scrollRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
                "-=0.5"
            );

        // Subtle parallax on scroll for the background VIBE text
        gsap.to(vibeRef.current, {
            y: 300,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

    }, { scope: heroRef });

    return (
        <section ref={heroRef} id="hero" className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden">
            {/* Cinematic Blur Background Layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#ff3333]/10 blur-[120px] rounded-full opacity-30 pointer-events-none"></div>

            <div className="absolute top-1/4 right-0 opacity-[0.05] pointer-events-none">
                <span ref={vibeRef} className="display-font text-[25vw] leading-none text-white select-none whitespace-nowrap">VIBE</span>
            </div>

            <div className="relative z-10 max-w-5xl">
                <h1 className="display-font text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter">
                    <div className="overflow-hidden">
                        <div ref={title1Ref}>Raktim</div>
                        <div ref={title2Ref} className="flex items-baseline gap-4 mt-2">
                            Sonowal <span ref={dotRef} className="red-dot w-4 h-4 md:w-6 md:h-6 bg-[#ff3333]"></span>
                        </div>
                    </div>
                </h1>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 w-full">
                    <div ref={descRef} className="max-w-md">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-[#ff3333] mb-4">Available For Projects</p>
                        <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed">
                            A creative developer focused on crafting <span className="text-white italic">cinematic digital experiences</span> through code and refined motion design.
                        </p>
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em]" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}
