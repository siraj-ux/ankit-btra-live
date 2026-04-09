import { Heart, Coins, Shield } from "lucide-react";
import SubscribeButton from './SubscribeButton'; // Import the SubscribeButton

export const EnergyConnectionSection = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 md:py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-left md:text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-black leading-tight">
            Love, Health, Wealth… Sabka Connection Aapki <br />
            <span className="text-black">Watch Ki Energy Se Hoti Hai.</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Agar life ke important areas me delay, confusion ya imbalance chal
            raha hai — ho sakta hai problem aapki energy nahi, aapki wristwatch
            ki vibration ho.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <InfoCard
            icon={<Heart className="h-7 w-7 text-red-500" />}
            title="Love & Relationships"
            description="Galat dial = emotional friction. Sahi watch = clarity & balance."
          />

          <InfoCard
            icon={<Coins className="h-7 w-7 text-green-600" />}
            title="Wealth & Career"
            description="Misaligned colours/metals = decision blocks. Aligned watch = success energy ON."
          />

          <InfoCard
            icon={<Shield className="h-7 w-7 text-blue-600" />}
            title="Health & Peace"
            description="Strap + dial combo = direct impact on mood & stability."
          />
        </div>

        {/* CTA BOX */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-black text-left md:text-center px-6 py-12">
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Wristwatch Analysis bata deta hai kya aapko drain kar raha hai — aur
            kaunsi watch aapki growth, clarity & breakthroughs ko support karegi.
          </p>

          {/* UPDATED SUBSCRIBE BUTTON */}
          <div className="flex justify-center">
            <SubscribeButton
              href="#register"
              ctaLocation="energy_connection_section"
              onClick={scrollToRegister}
              label="FREE Wristwatch Workshop →"
              className="
                w-full md:w-auto
                bg-[#FEA116]
                hover:bg-[#e89214]
                text-white
                font-bold
                py-4 px-10
                rounded-xl
                text-lg
                transition-all
                duration-300
                shadow-lg
                flex items-center justify-center gap-2
              "
            />
          </div>
        </div>

      </div>
    </section>
  );
};

/* ---------- Card Component ---------- */
const InfoCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-black mb-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);