import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const experiences = [
        {
            id: 1,
            role: "Research Associate",
            company: "Keywords Studios",
            duration: "2025 – present",
            description: [
                "Trained and evaluated advanced AI agents for a confidential AGI-level project.",
                "Maintained >92% accuracy on complex reasoning and multimodal tasks.",
                "Supported model fine-tuning and alignment across text and vision inputs."
            ]
        },
        {
            id: 2,
            role: "Data Science Intern",
            company: "AAM Infotech Pvt. Ltd.",
            duration: "Internship",
            description: [
                "Developed machine learning models for predictive analytics and recommendation systems.",
                "Performed data preprocessing, feature engineering, and rigorous model evaluation.",
                "Collaborated on real-world NLP and deep learning workflows."
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Section Title
            gsap.from(titleRef.current?.children || [], {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%"
                }
            });

            // Animate Timeline Line "Drawing"
            gsap.from(listRef.current, {
                "--line-height": "0%",
                duration: 2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: listRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });

            // Animate Cards Popup
            const cards = listRef.current?.querySelectorAll('.timeline-card');
            cards?.forEach((card) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.6,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%"
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={sectionRef} className="py-20 px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                        Professional <span className="text-primary-glow">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
                </div>

                <div
                    ref={listRef}
                    className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
                    style={{ "--line-height": "100%" } as React.CSSProperties}
                >
                    {/* Dynamic Line Overlay for Animation */}
                    <div className="absolute top-0 left-5 md:left-1/2 w-0.5 bg-gradient-primary h-[var(--line-height)] -translate-x-px transform origin-top z-0" />

                    {experiences.map((exp) => (
                        <div key={exp.id} className="timeline-card relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group z-10">

                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <Briefcase size={20} className="text-primary" />
                            </div>

                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-colors duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <div>
                                        <h3 className="text-xl font-medium text-foreground">{exp.role}</h3>
                                        <p className="text-primary-glow font-medium">{exp.company}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border/50 w-fit">
                                        {exp.duration}
                                    </span>
                                </div>

                                <ul className="space-y-2">
                                    {exp.description.map((item, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="mt-1.5 w-1 h-1 bg-primary rounded-full shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
