import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const cardRef = useRef(null);
    const imageParallaxRef = useRef(null);
    const textContentRef = useRef(null);

    useGSAP(() => {
        // Header reveal (Cinematic mask)
        const headerLines = Array.from(headerRef.current.children);
        gsap.fromTo(headerLines,
            { y: 120, opacity: 0, rotationX: -15 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.4,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                }
            }
        );

        // Project Sequence: Image Container -> Text Storytelling
        const cardTl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
            }
        });

        gsap.set(cardRef.current, { transformPerspective: 1000 });

        // Smooth image entry overlapping text flow
        cardTl.fromTo(cardRef.current.querySelector('.aspect-\\[16\\/9\\]'),
            { scale: 0.95, opacity: 0, rotationX: 4 },
            { scale: 1, opacity: 1, rotationX: 0, duration: 1.8, ease: "power3.out" }
        );

        // Text Content Storytelling sequence (slightly delayed but overlapping)
        const textElements = Array.from(textContentRef.current.children);
        cardTl.fromTo(textElements,
            { y: 40, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
            { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, stagger: 0.2, ease: "power3.out" },
            "-=1.2"
        );

        // Inner Image background parallax (scrubbed, soft narrative depth)
        gsap.fromTo(imageParallaxRef.current,
            { y: '-10%', scale: 1.05 },
            {
                y: '10%',
                ease: "none",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="projects" className="py-24 md:py-32 bg-zinc-50 text-black rounded-[4rem] mx-4 my-20">
            <div className="px-8 md:px-12">
                <div ref={headerRef} className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-4 inline-block transform-gpu">02 // Selected Archive</h2>
                        <br />
                        <h3 className="display-font text-5xl md:text-6xl font-black inline-block transform-gpu">WORKS</h3>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Project 01 */}
                    <article ref={cardRef} className="group flex flex-col gap-6 transform-gpu">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-zinc-200">
                            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="FoundersKick preview" />
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href="https://founderskickv11-production.up.railway.app/" target="_blank" rel="noopener noreferrer" className="bg-white/90 backdrop-blur p-4 rounded-full flex hover:bg-[#ff3333] hover:text-white transition-colors shadow-lg">
                                    <iconify-icon icon="lucide:external-link" className="text-xl"></iconify-icon>
                                </a>
                            </div>
                            <div ref={imageParallaxRef} className="absolute inset-[-10%] w-[120%] h-[120%] flex items-center justify-center transform-gpu pointer-events-none">
                                <span className="display-font text-8xl md:text-[8rem] opacity-[0.05] select-none font-black text-black mix-blend-overlay">FOUNDERS</span>
                            </div>
                        </div>

                        <div ref={textContentRef} className="px-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="display-font text-2xl font-bold mb-2">FoundersKick</h4>
                                    <p className="text-zinc-500 font-medium">React // TypeScript // Vite</p>
                                </div>
                                <a href="https://github.com/Redeeyak1318" target="_blank" rel="noopener noreferrer" className="text-xs font-black py-1 px-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer flex gap-2 items-center">
                                    SOURCE <iconify-icon icon="lucide:github"></iconify-icon>
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
