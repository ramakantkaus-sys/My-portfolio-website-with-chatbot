import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(contentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative w-72 h-72 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20" />

              <div className="relative w-full h-full p-2 group">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-glow-primary">
                  <img src="/Images/profileLogo.jpg" alt="Ramakant Kaushik" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="space-y-6 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                About <span className="text-primary-glow">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full mb-6" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a Data Scientist with a strong foundation in mathematics and statistics, currently transitioning from pure sciences to advanced AI applications. My work focuses on building intelligent systems using Machine Learning, Deep Learning, and Generative AI to solve complex reasoning tasks.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond model training, I specialize in evaluation, alignment, and creating RAG-based architectures that deliver accurate, high-signal results. I thrive in environments where research meets real-world impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;