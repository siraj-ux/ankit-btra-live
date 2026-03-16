import { useState, useEffect } from 'react';

interface TimeLeft {
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ className = '' }: { className?: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset timer for demo purposes
          return { minutes: 14, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-1">
        <span className="bg-[#04343B] text-primary-foreground font-bold text-lg md:text-xl px-2 py-1 rounded-md min-w-[2.5rem] text-center">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-primary font-bold text-xl">:</span>
        <span className="bg-[#04343B] text-primary-foreground font-bold text-lg md:text-xl px-2 py-1 rounded-md min-w-[2.5rem] text-center">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-muted-foreground ml-2">mins left</span>
    </div>
  );
};
