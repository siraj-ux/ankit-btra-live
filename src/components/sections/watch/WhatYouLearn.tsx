import { Check } from "lucide-react";
import SubscribeButton from '../../SubscribeButton';

export const WhatYouLearnSection = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 md:py-8 bg-black text-white">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-left md:text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
            What You'll Learn & Get
          </h2>
          <p className="text-white/70 text-base">
            Simple, Easy aur Fun Session me Kya Kya Hoga:
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-6">

          <StepCard
            step="Step 1"
            title="Your Energy Blueprint"
            description="DOB + Name + Life Cycle → who you naturally are."
          />

          <StepCard
            step="Step 2"
            title="Watch Element Analysis"
            description="Dial, strap, metal, numbers, layout, colours — sabka meaning hota hai."
          />

          <StepCard
            step="Step 3"
            title="Therapy & Action Plan"
            description="Kaunsi watch aapke goals ko support karegi, aur kaunsi aapko slow kar rahi hai."
          />

        </div>

        {/* CHECKLIST */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10 text-left">

          <Checklist
            items={[
              "Live wristwatch analysis",
              "What boosts your success energy",
            ]}
          />

          <Checklist
            items={[
              "Personality + energy decoding",
              "7-day micro-therapy routine",
            ]}
          />

          <Checklist
            items={[
              "What to avoid (Negative Triggers)",
              "Watch recommendations (style, element, material)",
            ]}
          />

        </div>

        {/* CTA */}
        <div className="text-center flex justify-center">
          <SubscribeButton
            href="#register"
            ctaLocation="what_you_learn_section"
            onClick={scrollToRegister}
            label="FREE Wristwatch Workshop"
            className="bg-[#F4C063] hover:bg-[#eab14f] text-black font-bold px-8 py-3 rounded-xl text-base transition flex items-center justify-center"
          />
        </div>

      </div>
    </section>
  );
};

/* ---------- STEP CARD (Compact) ---------- */

const StepCard = ({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) => (
  <div className="border border-white/20 rounded-xl p-5 text-center bg-white/5">
    <div className="text-[#F4C063] text-3xl font-extrabold mb-2">*</div>

    <p className="text-[#F4C063] font-semibold text-sm mb-1">
      {step}
    </p>

    <h3 className="text-base font-bold mb-2">
      {title}
    </h3>

    <p className="text-white/70 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

/* ---------- CHECKLIST (Unchanged) ---------- */

const Checklist = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <Check className="h-4 w-4 text-[#F4C063] mt-1" />
        <span className="text-white/90 text-sm">{item}</span>
      </li>
    ))}
  </ul>
);