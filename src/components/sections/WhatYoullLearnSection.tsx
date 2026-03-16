import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';


const learnings = [
  {
    title: 'Whether your name is actually lucky for you',
  },
  {
    title: 'Why some people get opportunities easily, and others face delays',
  },
  {
    title: 'The power of each name number (1- 9) and which one suits you',
  },
  {
    title: 'How to align your name & date of birth for money, health, and love',
  },
];

export const WhatYoullLearnSection = () => {
  useEffect(() => {
  const el = document.getElementById('case-study');
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(el);

  return () => observer.disconnect();
}, []);

  return (
    <section className="py-6 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            The Secret Factor
          </span>
          <h2 className="text-3xl md:text-4xl font-philosopher font-bold text-foreground mb-4">
            <span className='text-[#faa60a]'> Naam Number: </span>
The Secret Factor You’ve Been Missing 
          </h2>
          <p className="text-lg text-muted-foreground">
            In this Masterclass, you'll learn:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {learnings.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-5 shadow-md border border-border/50 flex items-start gap-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
       <div
  id="case-study"
  className="case-study-box mt-10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto text-center border-2 transition-all duration-700"
>
  <p className="text-lg font-medium">
    🎯 <span className="font-bold">Real Case Study:</span> How celebrities like Ajay Devgn & Ayushmann Khurrana changed just ONE alphabet and unlocked massive success
  </p>
</div>

      </div>
    </section>
  );
};
