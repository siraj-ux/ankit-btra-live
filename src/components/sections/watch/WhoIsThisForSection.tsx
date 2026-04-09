import SubscribeButton from '../../SubscribeButton';

export const WhoIsThisForSection = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-4 md:py-6 bg-white">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <h2 className="text-left md:text-center text-2xl md:text-3xl font-extrabold text-black mb-8 max-w-4xl mx-auto">
          Kiske Liye Yeh Session Important Hai?
        </h2>

        {/* Grid – 2 cards per row */}
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">

          <AudienceCard
            title="Working Pros"
            description="Stuck in overthinking or corporate ladder."
          />

          <AudienceCard
            title="Entrepreneurs"
            description="Who need better flow and decision power."
          />

          <AudienceCard
            title="Students / Creators"
            description="Who want clarity in their path."
          />

          <AudienceCard
            title="Luxury Lovers"
            description="People who love watches but want them lucky."
          />

          <AudienceCard
            title="Transitions"
            description="People going through major life changes."
          />

          <AudienceCard
            title='Feeling "Off"'
            description="Anyone feeling energy is blocked."
          />

        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto flex justify-center text-center">
          <SubscribeButton
            href="#register"
            ctaLocation="who_is_this_for_section"
            onClick={scrollToRegister}
            label="FREE Wristwatch Workshop"
            className="bg-[#F4C063] hover:bg-[#eab14f] text-black font-bold px-6 py-3 rounded-xl text-base transition flex items-center justify-center"
          />
        </div>

      </div>
    </section>
  );
};

/* ---------- Card (Compact) ---------- */

const AudienceCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 rounded-md p-4 flex gap-3">
    {/* Left Accent */}
    <div className="w-1 bg-[#F4A61D] rounded-full" />

    {/* Content */}
    <div>
      <h3 className="font-bold text-black text-sm mb-1">
        {title}
      </h3>
      <p className="text-gray-600 text-xs leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);