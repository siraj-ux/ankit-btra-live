import { CheckCircle2 } from 'lucide-react';
import SubscribeButton from "@/components/SubscribeButton";
import {  DISCOUNTED_PRICE, OTO_OG_PRICE, OTO_DISCOUNTED_PRICE } from '@/utils/product-info';

const audiences = [
  "You're a Business Owner struggling with unstable revenue",
  "You're a Parent who wants to give your child a successful future",
  "You're Stuck in a Career rut and want fast growth",
  "You feel Blocked in Love, Money, or Health despite doing everything right",
];

interface WhoIsThisForSectionProps {
  onCTAClick: () => void;
}

export const WhoIsThisForSection = ({ onCTAClick }: WhoIsThisForSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-philosopher font-bold text-foreground mb-4">
              This Workshop Is Perfect For You If...
            </h2>
          </div>

          {/* List */}
          <div className="space-y-4 mb-10">
            {audiences.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-sm border border-border/50"
              >
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <SubscribeButton
              href="/oto-ga"
              ctaLocation="who_is_this_for_ga"
              onClick={onCTAClick}
              className="
                bg-[#FEA116]
                hover:bg-[#FEA116]
                text-white
                font-bold
                py-4 px-10
                rounded-xl
                text-lg
                transition-all
                duration-300
                shadow-lg
                inline-block
              "
              label={`Book Now @ ₹${DISCOUNTED_PRICE}`}
            />
          </div>

        </div>
      </div>
    </section>
  );
};