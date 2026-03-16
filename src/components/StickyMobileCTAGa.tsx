import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { Link } from 'react-router-dom';
interface StickyMobileCTAProps {
  onCTAClick: () => void;
}

export const StickyMobileCTA = ({ onCTAClick }: StickyMobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-3 md:hidden z-50 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-red-900">Limited seats</span>
          <CountdownTimer className="scale-75 origin-left" />
        </div>
        <Link to="/oto-ga">
        <Button variant="gold" size="lg" onClick={onCTAClick} className="flex-1 max-w-[180px]">
          Book @ ₹99
        </Button>
        </Link>
      </div>
    </div>
  );
};
