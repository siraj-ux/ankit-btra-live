import {
  Clock,
  Watch,
  Palette,
  Flag
} from "lucide-react";

export const WhatisSection = () => {
  return (
    <section className="py-6 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-black leading-tight">
              Kya Hai Exactly <br />
              Wristwatch Analysis?
            </h2>

            <p className="mt-4 text-base text-gray-700 max-w-xl">
              Har insaan ek specific type ki watch pe naturally attract hota
              hai — square dial, round dial, leather strap, metal strap…  
              Ye sab random nahi hota.
            </p>

            <ul className="mt-4 space-y-3 text-base text-gray-800">
              <li className="flex items-start gap-2">
                <span className="text-[#faa60a] text-lg">›</span>
                Aapki <strong>decision-making energy</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#faa60a] text-lg">›</span>
                Aapka <strong>thinking pattern</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#faa60a] text-lg">›</span>
                Aapka <strong>subconscious behavior</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#faa60a] text-lg">›</span>
                Numerology + Behavioral Insight ka perfect combo
              </li>
            </ul>
          </div>

          {/* RIGHT CARDS — ALWAYS 2×2 */}
        <div
  className="
    grid
    grid-cols-2
    gap-5
    mx-auto
    w-full
    max-w-[420px]
    sm:max-w-[460px]
    md:max-w-[560px]
    lg:max-w-[600px]
  "
>
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Dial Shape"
              subtitle="Mindset"
            />

            <InfoCard
              icon={<Watch className="h-5 w-5" />}
              title="Strap"
              subtitle="Stability"
            />

            <InfoCard
              icon={<Palette className="h-5 w-5" />}
              title="Color"
              subtitle="Energy"
            />

            {/* RESULT CARD */}
            <div className="rounded-xl bg-black text-center p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#faa60a]/20 flex items-center justify-center mb-2">
                <Flag className="h-5 w-5 text-[#faa60a]" />
              </div>
              <h4 className="text-sm font-bold text-[#faa60a]">
                Result
              </h4>
              <p className="text-white text-xs mt-1">
                Total Alignment
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Compact Card ---------- */

const InfoCard = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div className="rounded-xl bg-gray-100 p-4 text-center">
    <div className="w-10 h-10 mx-auto rounded-full bg-[#faa60a]/20 flex items-center justify-center mb-2 text-[#faa60a]">
      {icon}
    </div>
    <h4 className="text-sm font-bold text-black">
      {title}
    </h4>
    <p className="text-xs text-gray-600">
      = {subtitle}
    </p>
  </div>
);