import { useRef, useEffect } from 'react';
// import { useFacebookPixel } from "@/hooks/usePIxelWatch";
import { HeroSectionWatch } from '@/components/sections/watch/HeroWatch';
import { WhatisSection } from '@/components/sections/watch/WhatIsSection';
import { EnergyConnectionSection } from '@/components/sections/watch/EnergyConnection';
import { WhatYouLearnSection } from '@/components/sections/watch/WhatYouLearn';
import { WhoIsThisForSection } from '@/components/sections/watch/WhoIsThisForSection';
import { Coach } from '@/components/sections/watch/Coach';
import { TestimonialsSection } from '@/components/sections/watch/Testimonilas';
import { FAQ } from '@/components/sections/watch/FAQ';
import { FinalCTA } from '@/components/sections/watch/FinalCta';
import { StickyMobileCTA } from '@/components/sections/watch/StickyCta';


const Watch = () => {
  const heroRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    document.title = "Wristwatch Workshop | Ankiit Btra ";
  }, []);



  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <div ref={heroRef}>
        <HeroSectionWatch />
      </div>
      <WhatisSection />
      <EnergyConnectionSection />
      <WhatYouLearnSection />
      <WhoIsThisForSection />
      <Coach />
      <TestimonialsSection />
      <FinalCTA />
      <FAQ />
      <StickyMobileCTA onCTAClick={scrollToHero} />
    </main>
  );
};

export default Watch;
