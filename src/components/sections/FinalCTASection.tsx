import { CountdownTimer } from '@/components/CountdownTimer';
import { Sparkles } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';
import {  DISCOUNTED_PRICE, OTO_OG_PRICE, OTO_DISCOUNTED_PRICE } from '@/utils/product-info';

interface FinalCTASectionProps {
  onCTAClick: () => void;
}

export const FinalCTASection = ({ onCTAClick }: FinalCTASectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Limited Time Offer
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-philosopher font-bold text-foreground mb-4">
            Naam Theek Karo,{' '}
            <span className="text-[#faa60a]">Zindagi Badal Jaayegi</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            This is your chance to stop living on trial-and-error. Ek baar sahi naam alignment ho gaya, money, love, health, and peace of mind, sab flow me aata hai.
          </p>

          {/* Card */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl mb-8">
            
            {/* Pricing */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Regular Price</p>
                <p className="text-2xl font-bold text-muted-foreground line-through">₹999</p>
              </div>

              <div className="hidden md:block w-px h-12 bg-border" />

              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Today's Price</p>
                <p className="text-4xl font-extrabold text-[#04343B]">₹99</p>
              </div>

              <div className="hidden md:block w-px h-12 bg-border" />

              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">You Save</p>
                <p className="text-2xl font-bold text-secondary">₹900</p>
              </div>
            </div>

            {/* Timer */}
            <div className="flex justify-center mb-6">
              <CountdownTimer />
            </div>

            {/* CTA Button */}
            <SubscribeButton
              href="/oto-fb"
              ctaLocation="final_cta"
              onClick={onCTAClick}
              className="
                w-full md:w-auto
                bg-[#FEA116]
                hover:bg-[#FEA116]
                text-white
                font-bold
                py-4 px-8
                rounded-xl
                text-lg
                transition-all
                duration-300
                shadow-lg
                flex items-center justify-center gap-2
              "
              label={`Book My Seat @ ₹${DISCOUNTED_PRICE} →`}
            />

            {/* Footer Note */}
            <p className="text-xs text-muted-foreground mt-4">
              🔒 Secure payment • Instant access • 10,000+ happy students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};