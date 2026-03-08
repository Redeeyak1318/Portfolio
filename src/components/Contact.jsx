import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const sideInfoRef = useRef(null);

    useGSAP(() => {
        // Title reveal (split line style simulation)
        gsap.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                }
            }
        );

        // Form inputs stagger
        const formElements = Array.from(formRef.current.children);
        gsap.fromTo(formElements,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                }
            }
        );

        // Side info block
        const sideElements = Array.from(sideInfoRef.current.children);
        gsap.fromTo(sideElements,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sideInfoRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="contact" className="w-full px-6 md:px-12 relative overflow-hidden pb-12">
            <div className="editorial-grid items-center">
                <div className="col-span-12 md:col-span-7">
                    <div className="overflow-hidden">
                        <h2 ref={titleRef} className="display-font text-[10vw] font-black leading-none mb-12 transform-gpu">
                            Let's <br />Talk<span className="text-[#ff2a2a]">.</span>
                        </h2>
                    </div>
                    <form ref={formRef} className="flex flex-col gap-12 w-full max-w-2xl">
                        <div className="group">
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 transition-colors group-focus-within:text-[#ff2a2a]">Full Name</label>
                            <input type="text" placeholder="NAME" className="w-full bg-transparent border-b-4 border-zinc-800 focus:border-[#ff2a2a] px-0 py-4 text-3xl font-bold uppercase focus:outline-none transition-all placeholder:opacity-10" />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 transition-colors group-focus-within:text-[#ff2a2a]">Email Address</label>
                            <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b-4 border-zinc-800 focus:border-[#ff2a2a] px-0 py-4 text-3xl font-bold uppercase focus:outline-none transition-all placeholder:opacity-10" />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2 transition-colors group-focus-within:text-[#ff2a2a]">Your Narrative</label>
                            <textarea rows="3" placeholder="MESSAGE" className="w-full bg-transparent border-b-4 border-zinc-800 focus:border-[#ff2a2a] px-0 py-4 text-3xl font-bold uppercase focus:outline-none transition-all placeholder:opacity-10 resize-none"></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="bg-[#ff2a2a] text-white px-12 py-6 display-font text-2xl font-black uppercase hover:scale-105 transition-transform cursor-pointer border-none shadow-[0_4px_14px_0_rgba(255,42,42,0.39)] hover:shadow-[0_6px_20px_rgba(255,42,42,0.23)]">
                                Send Signal
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-span-12 md:col-span-4 md:col-start-9 mt-20 md:mt-0">
                    <div ref={sideInfoRef} className="space-y-12 border-l-2 border-zinc-800 pl-12">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-6">Connect / Online</p>
                            <ul className="text-2xl font-black flex flex-col gap-4 uppercase">
                                <li><a href="https://github.com/Redeeyak1318" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff2a2a] transition-colors flex items-center gap-4 group">GitHub <iconify-icon icon="lucide:arrow-up-right" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></iconify-icon></a></li>
                                <li><a href="https://www.linkedin.com/in/raktim-sonowal-m1318" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff2a2a] transition-colors flex items-center gap-4 group">LinkedIn <iconify-icon icon="lucide:arrow-up-right" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></iconify-icon></a></li>
                                <li><a href="https://instagram.com/redeeyak___" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff2a2a] transition-colors flex items-center gap-4 group">Instagram <iconify-icon icon="lucide:arrow-up-right" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></iconify-icon></a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-2">Location</p>
                            <p className="text-xl font-bold uppercase italic">Assam, India / UTC+5.30</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
