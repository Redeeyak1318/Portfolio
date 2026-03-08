import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const iconRef = useRef(null);
    const listRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        // Box scale up (Premium Slow Lift)
        gsap.set(cardRef.current, { transformPerspective: 1000 });
        tl.fromTo(cardRef.current,
            { scale: 0.98, opacity: 0, rotationX: 5, y: 50 },
            { scale: 1, opacity: 1, rotationX: 0, y: 0, duration: 1.6, ease: "power3.out" }
        )
            .fromTo(titleRef.current,
                { y: 40, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
                { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "power4.out" },
                "-=1.2"
            )
            .fromTo(iconRef.current,
                { scale: 0, opacity: 0, rotate: -30 },
                { scale: 1, opacity: 0.1, rotate: 0, duration: 1.5, ease: "power3.out" },
                "-=1.0"
            );

        // Stagger list items softly
        const items = Array.from(listRef.current.children);
        tl.fromTo(items,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
            "-=1.0"
        );

    }, { scope: containerRef });

    return (
        <div id="achievements" ref={containerRef} className="col-span-12 lg:col-span-6 lg:col-start-7 mt-24 lg:mt-0">
            <div ref={cardRef} className="bg-black text-white p-12 md:p-20 relative overflow-hidden transform-gpu hover:-translate-y-2 transition-transform duration-500">
                <div ref={iconRef} className="absolute -top-10 -right-10 opacity-10">
                    <iconify-icon icon="lucide:award" className="text-[20rem]"></iconify-icon>
                </div>
                <h2 ref={titleRef} className="display-font text-4xl md:text-5xl font-black mb-12 flex items-center gap-4">
                    Achievements <span className="red-dot w-6 h-6"></span>
                </h2>
                <ul ref={listRef} className="space-y-8">
                    <li className="flex items-start gap-4 group cursor-default">
                        <span className="text-[#ff2a2a] font-black text-2xl group-hover:translate-x-2 transition-transform">/</span>
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors">Built and deployed FoundersKick startup platform</span>
                    </li>
                    <li className="flex items-start gap-4 group cursor-default">
                        <span className="text-[#ff2a2a] font-black text-2xl group-hover:translate-x-2 transition-transform">/</span>
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors">Designed modern personal portfolio</span>
                    </li>
                    <li className="flex items-start gap-4 group cursor-default">
                        <span className="text-[#ff2a2a] font-black text-2xl group-hover:translate-x-2 transition-transform">/</span>
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors">GSAP + Lenis animation implementation</span>
                    </li>
                    <li className="flex items-start gap-4 group cursor-default">
                        <span className="text-[#ff2a2a] font-black text-2xl group-hover:translate-x-2 transition-transform">/</span>
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors">IEEE Student Member</span>
                    </li>
                    <li className="flex items-start gap-4 group cursor-default">
                        <span className="text-[#ff2a2a] font-black text-2xl group-hover:translate-x-2 transition-transform">/</span>
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors">Hands-on with Git & GitHub</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
