import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const containerRef = useRef(null);
    const titleSectionRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        // Header reveal
        gsap.fromTo(titleSectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleSectionRef.current,
                    start: "top 85%",
                }
            }
        );

        // Staggered cards reveal
        cardsRef.current.forEach((card, i) => {
            const listItems = Array.from(card.querySelectorAll('li'));
            const numSpan = card.querySelector('.display-font');
            const headline = card.querySelector('h3');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                }
            });

            tl.fromTo(card,
                { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
                { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: "power3.out" }
            )
                .fromTo(numSpan,
                    { y: -30, opacity: 0 },
                    { y: 0, opacity: 0.3, duration: 0.6, ease: "back.out(2)" },
                    "-=0.4"
                )
                .fromTo(headline,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(listItems,
                    { opacity: 0, x: -10 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
                    "-=0.4"
                );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="skills" className="w-full px-6 md:px-12 border-t border-zinc-800 overflow-hidden relative">
            <div ref={titleSectionRef} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <h2 className="display-font text-7xl md:text-9xl font-black text-outline">Skills</h2>
                <p className="text-right uppercase text-xs tracking-widest opacity-50 font-black mb-4">Expertise Architecture / 2024</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-800 relative z-10">
                <div ref={el => cardsRef.current[0] = el} className="p-12 border-b md:border-b-0 md:border-r border-zinc-800 group hover:bg-[#ff2a2a] transition-all duration-500">
                    <span className="display-font text-4xl block mb-12 opacity-30 group-hover:opacity-100 transform-gpu">01</span>
                    <h3 className="text-3xl font-black uppercase mb-8">Frontend</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">HTML // CSS</li>
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">JavaScript</li>
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">React.js</li>
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">Tailwind CSS</li>
                    </ul>
                </div>
                <div ref={el => cardsRef.current[1] = el} className="p-12 border-b md:border-b-0 md:border-r border-zinc-800 group hover:bg-[#ff2a2a] transition-all duration-500">
                    <span className="display-font text-4xl block mb-12 opacity-30 group-hover:opacity-100 transform-gpu">02</span>
                    <h3 className="text-3xl font-black uppercase mb-8">Languages</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">C / C++</li>
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">Python</li>
                    </ul>
                </div>
                <div ref={el => cardsRef.current[2] = el} className="p-12 border-zinc-800 group hover:bg-[#ff2a2a] transition-all duration-500">
                    <span className="display-font text-4xl block mb-12 opacity-30 group-hover:opacity-100 transform-gpu">03</span>
                    <h3 className="text-3xl font-black uppercase mb-8">Tools</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">GitHub</li>
                        <li className="flex items-center gap-3 text-lg font-medium italic opacity-70 group-hover:opacity-100 group-hover:not-italic transform-gpu transition-all">Vite</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
