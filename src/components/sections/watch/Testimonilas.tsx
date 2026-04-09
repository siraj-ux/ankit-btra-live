import { Star } from "lucide-react";
import { useRef, useState } from "react";
import SubscribeButton from '../../SubscribeButton';

const testimonials = [
  { name: "Anita Kapoor", text: "Pehli baar naam numerology ke baare mein suna, lekin webinar ke baad sab clear ho gaya." },
  { name: "Vivek Patel", text: "Mujhe laga tha yeh sab myths hain, par webinar ke baad samajh aaya ki numerology sach mein kaam karti hai." },
  { name: "Rajat M", text: "Sessions ke baad overthinking kam hui aur clarity milne lagi." },
  { name: "Neha Sharma", text: "Name alignment ke baad confidence aur decision making improve hui." },
  { name: "Amit Verma", text: "Business me rukawat thi, workshop ke baad direction clear ho gayi." },
];

export const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* dynamic card width based on screen */
  const getCardWidth = () => {
    if (window.innerWidth >= 1024) return 260 + 16; // desktop
    if (window.innerWidth >= 640) return 220 + 14; // tablet
    return 180 + 12; // mobile
  };

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth();
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth();
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section className="py-4 bg-[#F5F5F5] overflow-hidden md:text-center">

      {/* Heading */}
      <h2 className="px-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-black mb-4">
        Real People. Real Shifts.
      </h2>

      {/* Horizontal Scroll */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
          flex gap-3 sm:gap-4 md:gap-4
          px-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
        "
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="
              flex-shrink-0
              w-[180px]
              sm:w-[220px]
              lg:w-[260px]
              bg-white
              rounded-lg
              p-3 sm:p-4
              shadow-sm
            "
          >
            <h4 className="font-bold text-sm sm:text-base text-black mb-1">
              {t.name}
            </h4>

            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, s) => (
                <Star
                  key={s}
                  className="h-3.5 w-3.5 text-[#F4A61D] fill-[#F4A61D]"
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-snug">
              {t.text}
            </p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? "w-6 h-2 bg-[#F4A61D]"
                : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Trust + CTA */}
      <div className="text-center mt-6 px-4">
        <div className="flex justify-center mb-3">
          <img
            src="/testimonial.png"
            className="w-28 sm:w-32 h-9 sm:h-10 rounded-full border-2 border-white"
            alt="Happy users"
          />
        </div>

        <p className="text-base sm:text-lg font-bold text-black mb-4">
          Transformed 2 Million Lives
        </p>

        <div className="flex justify-center">
          <SubscribeButton
            href="#register"
            ctaLocation="testimonials_section"
            onClick={() =>
              document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
            }
            label="FREE Wristwatch Workshop"
            className="bg-[#F4C063] hover:bg-[#eab14f] text-black font-bold px-6 py-3 rounded-xl text-sm sm:text-base transition flex items-center justify-center"
          />
        </div>
      </div>

    </section>
  );
};