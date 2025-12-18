import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Code, Lightning, Rocket, Heart, Database, GitBranch, Cube, Terminal, Cloud } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    const skills = [
        { icon: Code, name: 'Python', level: 90 },
        { icon: Code, name: 'Machine Learning', level: 88 },
        { icon: Lightning, name: 'Deep Learning', level: 87 },
        { icon: Globe, name: 'NLP', level: 89 },
        { icon: Cube, name: 'TensorFlow', level: 85 },
        { icon: Rocket, name: 'PyTorch', level: 84 },
        { icon: Heart, name: 'Data Analysis', level: 92 },
        { icon: Terminal, name: 'SQL', level: 88 },
        { icon: Database, name: 'MongoDB', level: 82 },
        { icon: GitBranch, name: 'Git', level: 87 },
        { icon: Cloud, name: 'AWS', level: 80 },
        { icon: Cube, name: 'Hugging Face', level: 83 },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Title
            gsap.fromTo(titleRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%"
                    }
                }
            );

            // Animate Skills Grid
            gsap.fromTo(".skill-card",
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: {
                        each: 0.05,
                        grid: "auto",
                        from: "start"
                    },
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 85%"
                    },
                    onComplete: () => {
                        // Continuous floating animation
                        gsap.to(".skill-card", {
                            y: "-=10",
                            duration: 2,
                            yoyo: true,
                            repeat: -1,
                            ease: "sine.inOut",
                            stagger: {
                                each: 0.2,
                                from: "random"
                            }
                        });
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="py-20 px-6 relative overflow-hidden bg-primary/5">
            <div className="container mx-auto max-w-6xl">
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                        Technical <span className="text-primary-glow">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
                </div>

                <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.name} className="skill-card glass p-6 cursor-pointer rounded-xl hover:shadow-glow-primary transition-all duration-300 hover:scale-105 group border border-border/50 opacity-0">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-bounce">
                                    <skill.icon size={24} className="text-primary-foreground" />
                                </div>

                                <h4 className="text-lg font-medium text-foreground">{skill.name}</h4>

                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-gradient-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
