import { Heart, Coins, Shield, ArrowDown } from "lucide-react";

export const EnergyConnectionSection = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 md:py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-left md:text-center max-w-4xl mx-auto mb-8">
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

          <button
            onClick={scrollToRegister}
            className="inline-flex items-center gap-2 bg-[#F4C063] hover:bg-[#eab14f] text-black font-bold px-10 py-4 rounded-xl text-lg transition"
          >
            FREE Wristwatch Workshop
            
          </button>
        </div>

      </div>
    </section>
  );
};

/* ---------- Updated Card (Icon Left, Text Right) ---------- */

const InfoCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className="flex-shrink-0">
        {icon}
      </div>

      {/* Text */}
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