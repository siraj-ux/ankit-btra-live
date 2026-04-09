import { Check } from "lucide-react";
import SubscribeButton from '../../SubscribeButton';

/* 🔁 ADD / REMOVE LOGOS HERE */
const logos = [
  "/ndtv.png",
  "/indianX.png",
  "/ted.png",
  "/vedic.png",
  "/mind2.png",
  "/forbes.png"
];

export const Coach = () => {
  return (
    <section className="relative py-8 md:py-16 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* LEFT — CONTENT */}
          <div className="space-y-6">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-semibold">
              🛡️ India’s Most Trusted Modern Numerologist
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-5xl font-extrabold leading-tight">
              Why Ankiit Stands Out
            </h2>

            {/* Description */}
            <p className="text-white/80 text-md leading-relaxed max-w-xl">
              Ankiit Btra is known for his modern, clean, no-nonsense numerology
              style. He combines deep numerology frameworks, behavioral
              observation, and accurate life-cycle reading.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 text-base">
              {[
                "Deep numerology framework",
                "Behavioral observation",
                "Accurate life-cycle reading",
                "Calm, respectful delivery",
                "100% practical guidance",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#F4C063] mt-0.5" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <SubscribeButton
              href="#register"
              ctaLocation="coach_section"
              onClick={() =>
                document.getElementById("register")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              label="FREE Wristwatch Workshop"
              className="mt-6 inline-flex bg-[#F4C063] hover:bg-[#eab14f] text-black font-bold px-8 py-4 rounded-xl text-lg transition items-center justify-center"
            />
          </div>

          {/* RIGHT — IMAGE + LOGO MARQUEE */}
          <div className="space-y-6">

            {/* Coach Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
              <img
                src="/ankiit-btra.webp"
                alt="Ankiit Btra"
                className="w-full h-full object-cover"
              />
            </div>

            {/* LOGO AUTO-SCROLL (NO OVERFLOW GUARANTEED) */}
            <div className="relative bg-white rounded-xl py-4 overflow-hidden">
              <div className="relative h-10 overflow-hidden">

                {/* Moving Track */}
                <div className="absolute left-0 top-0 flex gap-10 logo-marquee">
                  {[...logos, ...logos].map((logo, i) => (
                    <img
                      key={i}
                      src={logo}
                      alt="Media logo"
                      className="h-8 w-auto flex-shrink-0"
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};