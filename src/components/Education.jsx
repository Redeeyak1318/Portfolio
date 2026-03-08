import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const listRef = useRef(null);

    useGSAP(() => {
        // Title reveal (Cinematic mask style)
        gsap.fromTo(titleRef.current,
            { y: 80, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
            {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.4,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

        // List items stagger with soft rotation and scale
        const items = Array.from(listRef.current.children);
        gsap.fromTo(items,
            { x: -30, opacity: 0, scale: 0.98 },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: listRef.current,
                    start: "top 75%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="col-span-12 lg:col-span-5 relative overflow-hidden">
            <h2 ref={titleRef} className="display-font text-6xl md:text-8xl font-black mb-12">Archives</h2>
            <div ref={listRef} className="space-y-16">
                <div className="border-l-8 border-black pl-8 transform-gpu hover:pl-10 transition-all cursor-default">
                    <h3 className="display-font text-3xl font-black mb-2">BTech in CSE</h3>
                    <p className="text-xl font-bold uppercase">Dibrugarh University (DUIET)</p>
                    <p className="text-zinc-500 font-bold mt-2 tracking-widest italic">Expected 2029</p>
                </div>
                <div className="border-l-8 border-black pl-8 transform-gpu hover:pl-10 transition-all cursor-default">
                    <h3 className="display-font text-3xl font-black mb-2">BSc in Data Science</h3>
                    <p className="text-xl font-bold uppercase">IIT Madras</p>
                    <p className="text-zinc-500 font-bold mt-2 tracking-widest italic">Ongoing</p>
                </div>
            </div>
        </div>
    );
}
