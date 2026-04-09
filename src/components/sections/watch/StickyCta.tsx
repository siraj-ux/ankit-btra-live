import SubscribeButton from '../../SubscribeButton';
import { CountdownTimer } from "../../CountdownTimer";

interface StickyMobileCTAProps {
  onCTAClick: () => void;
}

export const StickyMobileCTA = ({ onCTAClick }: StickyMobileCTAProps) => {
  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({
      behavior: "smooth",
    });
    onCTAClick();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 md:hidden z-50 shadow-2xl">

      {/* HEADING */}
      <div className="text-sm font-semibold text-gray-700 mb-2 whitespace-nowrap">
        Seats are filling fast –
        <span className="ml-1 text-red-600 font-bold animate-pulse">
          Bookings Close Today
        </span>
      </div>

      {/* TIMER + CTA ROW */}
      <div className="flex items-center gap-3">

        {/* TIMER */}
        <div className="flex-1 scale-110 origin-left">
          <CountdownTimer />
        </div>

        {/* CTA */}
        <SubscribeButton
          href="#register"
          ctaLocation="sticky_mobile_cta"
          onClick={scrollToRegister}
          label="Free Wristwatch Workshop"
          className="bg-[#F4C063] hover:bg-[#eab14f] text-black rounded-lg px-4 py-3 text-xs font-extrabold whitespace-nowrap transition flex items-center justify-center"
        />
      </div>

    </div>
  );
};