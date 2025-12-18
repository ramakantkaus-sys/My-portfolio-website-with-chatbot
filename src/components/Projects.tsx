import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Multimodal Emotion Chatbot",
      description: "Personal chatbot detecting emotions from facial, vocal, and textual cues using OpenFace, Wav2Vec2, and BERT.",
      image: "/Images/project-1.jpg",
      tech: ["Python", "Deep Learning", "NLP"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "YouTube RAG Chatbot",
      description: "Interactive Q&A chatbot using LangChain and GPT-4o to analyze and summarize YouTube video transcripts.",
      image: "/Images/project-2.jpg",
      tech: ["LangChain", "RAG", "Streamlit"],
      liveUrl: "https://ragtubebot-rgkrm2fzffgrcy5ebahy2h.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/RagTubeBot"
    },
    {
      id: 3,
      title: "CineMatch Recommender",
      description: "Content-based movie recommendation engine utilizing NLP to analyze plot summaries and metadata.",
      image: "/Images/project-3.jpg",
      tech: ["Python", "Scikit-learn", "Pandas"],
      liveUrl: "https://cinematchrecommendation.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/Cinematch"
    },
    {
      id: 4,
      title: "Risk Prediction Model",
      description: "Health risk assessment system using Decision Trees to predict chronic disease likelihood from user data.",
      image: "/Images/project-5.jpg",
      tech: ["Machine Learning", "Streamlit", "Python"],
      liveUrl: "https://depressionriskprediction.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/Chronic-Disease-Risk-Prediction-Model"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Section Title
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

      // Animate Projects Grid
      gsap.fromTo(".project-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Featured <span className="text-primary-glow">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto" />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="project-card group relative rounded-xl overflow-hidden glass hover:shadow-glow-primary transition-all duration-300 border border-border/50 opacity-0 transform-gpu">

              {/* Image Section */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Links overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-background/80 backdrop-blur rounded-lg hover:bg-primary hover:text-white transition-colors">
                      <Globe size={20} />
                    </a>
                  )}
                  {project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-background/80 backdrop-blur rounded-lg hover:bg-secondary hover:text-white transition-colors">
                      <GithubLogo size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium text-foreground">{project.title}</h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-primary/10 text-primary-glow rounded border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={project.liveUrl !== "#" ? project.liveUrl : project.githubUrl} className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    View <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;