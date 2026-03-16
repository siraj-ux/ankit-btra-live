import { useEffect, useRef, useState } from 'react';

export const ScrollZodiac = () => {
  const lastScrollY = useRef(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Rotate based on scroll direction
      setRotation((prev) => prev + delta * 0.15);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="
  pointer-events-none
  absolute inset-0
  flex
  justify-center
  items-start
  lg:items-center
  pt-36
  lg:pt-0
">

      <img
        src="/horoscope.png"
        alt=""
        aria-hidden="true"
        className="w-[420px] md:w-[520px] opacity-20"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.05s linear',
        }}
      />
    </div>
  );
};
