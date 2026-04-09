import SubscribeButton from '../../SubscribeButton';

export const FinalCTA = () => {
  return (
    <section className="py-3 md:py-5 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          {/* BLACK CTA CARD */}
          <div className="rounded-2xl bg-black px-4 py-6 md:px-8 md:py-8 text-left">

            {/* Heading */}
            <h2 className="text-2xl font-extrabold text-white mb-3">
              A Small Accessory. A Big Shift.
            </h2>

            {/* Subtext */}
            <p className="text-white/80 text-sm md:text-base max-w-2xl mb-5">
              Aapki Watch Sirf Time Nahi Dikhati…  
              Woh Aapki Life Ki Direction Bhi Batati Hai.
            </p>

            {/* CTA + Trust (responsive alignment) */}
            <div className="flex flex-col items-start md:items-center md:text-center">

              <SubscribeButton
                href="#register"
                ctaLocation="final_cta_section"
                onClick={() =>
                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
                }
                label="FREE Wristwatch Workshop"
                className="
                  bg-[#F4C063]
                  hover:bg-[#eab14f]
                  text-black
                  font-bold
                  px-20
                  py-3
                  rounded-xl
                  text-sm
                  transition
                  flex items-center justify-center
                "
              />

              {/* Trust note */}
              <div className="flex items-center gap-2 mt-4 text-xs text-[#F4C063] text-center">
                <span className="inline-block w-3 h-3 border border-[#F4C063] rounded-sm" />
                <span>Limited Slot</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};