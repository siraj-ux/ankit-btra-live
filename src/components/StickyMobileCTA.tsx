import { CountdownTimer } from './CountdownTimer';
import SubscribeButton from '@/components/SubscribeButton';
import {  DISCOUNTED_PRICE, OTO_OG_PRICE, OTO_DISCOUNTED_PRICE } from '@/utils/product-info';

interface StickyMobileCTAProps {
  onCTAClick: () => void;
}

export const StickyMobileCTA = ({ onCTAClick }: StickyMobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-3 md:hidden z-50 shadow-xl">
      <div className="flex items-center justify-between gap-3">

        {/* Left Content */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-red-900">
            Limited seats
          </span>
          <CountdownTimer className="scale-75 origin-left" />
        </div>

        {/* CTA Button */}
        <SubscribeButton
          href="/oto-fb"
          ctaLocation="sticky_mobile"
          onClick={onCTAClick}
          className="
            flex-1 max-w-[180px]
            bg-[#FEA116]
            hover:bg-[#FEA116]
            text-white
            font-bold
            py-3 px-4
            rounded-lg
            text-sm
            transition-all
            duration-300
            shadow-lg
            text-center
          "
          label={`Book @ ₹${DISCOUNTED_PRICE}`}
        />

      </div>
    </div>
  );
};