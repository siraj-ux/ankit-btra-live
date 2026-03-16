import { useRef, useEffect } from 'react';
import { HeroSection } from '@/components/sections/ga/HeroSection';
import { ProblemSection } from '@/components/sections/ga/ProblemSection';
import { WhatYoullLearnSection } from '@/components/sections/ga/WhatYoullLearnSection';
import { ActionStepsSection } from '@/components/sections/ga/ActionStepsSection';
import { BonusesSection } from '@/components/sections/ga/BonusesSection';
import { WhoIsThisForSection } from '@/components/sections/ga/WhoIsThisForSection';
import { TestimonialsSection } from '@/components/sections/ga/TestimonialsSection';
import { MentorSection } from '@/components/sections/ga/MentorSection';
import { FAQSection } from '@/components/sections/ga/FAQSection';
import { FinalCTASection } from '@/components/sections/ga/FinalCTASection';
import { StickyMobileCTA } from '@/components/StickyMobileCTAGa';



const IndexGa = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <div ref={heroRef}>
        <HeroSection />
      </div>
      <WhatYoullLearnSection />
      <ActionStepsSection onCTAClick={scrollToHero} />
      <ProblemSection />
      <BonusesSection />
      <WhoIsThisForSection onCTAClick={scrollToHero} />
      <MentorSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection onCTAClick={scrollToHero} />
      <StickyMobileCTA onCTAClick={scrollToHero} />
    </main>
  );
};

export default IndexGa;
