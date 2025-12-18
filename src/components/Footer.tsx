import { useRef } from 'react';
import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative py-8 px-6 border-t border-border/30 bg-background text-sm">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-muted-foreground text-center md:text-left">
          © 2025 Ramakant Kaushik. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a href="https://github.com/ramakantkaus-sys" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <GithubLogo size={20} />
            </a>
            <a href="https://www.linkedin.com/in/kausramakant" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkedinLogo size={20} />
            </a>
          </div>

          <div className="hidden md:block w-px h-4 bg-border/50"></div>

          <button onClick={scrollToTop} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;