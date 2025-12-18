import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, Envelope, MapPin } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(formRef.current?.children || [], {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%"
        }
      });

      gsap.from(infoRef.current?.children || [], {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 relative overflow-hidden bg-primary/5">
      <div className="container mx-auto max-w-5xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Get In <span className="text-primary-glow">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={formRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-foreground mb-2 font-medium text-sm">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-background glass border border-border/50 rounded-lg text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-foreground mb-2 font-medium text-sm">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-background glass border border-border/50 rounded-lg text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="your.email@example.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-foreground mb-2 font-medium text-sm">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 bg-background glass border border-border/50 rounded-lg text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none" placeholder="How can I help you?" />
              </div>

              <button type="submit" className="group w-full inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow-primary transition-all duration-300">
                Send Message
                <PaperPlaneTilt size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-8 lg:mt-6">
            <div>
              <h3 className="text-xl font-light text-foreground mb-4">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:ramakantkaus@gmail.com" className="flex items-center gap-4 p-4 glass rounded-lg hover:border-primary/50 border border-border/50 transition-all duration-300 group">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Envelope size={20} className="text-primary-glow" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-foreground font-medium">ramakantkaus@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass rounded-lg border border-border/50">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-secondary-glow" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                  <p className="text-foreground font-medium">Gurugram, Haryana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;