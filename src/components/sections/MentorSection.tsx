export const MentorSection = () => {
  return (
    <section className="py-6 md:py-24 bg-[#04343b]">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-5 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold">
            India’s Leading Numerology Mentor
          </span>

          <h2 className="text-4xl md:text-5xl font-philosopher font-bold text-white">
            Meet Your Mentor
          </h2>
        </div>

        {/* Mentor Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">

            {/* Image + Authority (FULLY CENTERED) */}
            <div className="flex-shrink-0 text-center flex flex-col items-center">
              <div className="w-56 h-72 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/coach2.jpg"
                  alt="Ankiit Btra"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-2 font-bold text-[#04343b]">
                India’s Top Numerologist
              </p>

              <div className="flex justify-center gap-2 mt-0">
                <img src="/iso.png" className="h-12" alt="ISO Certified" />
              </div>
            </div>

            {/* Content (CENTER ALIGNED) */}
            <div className="flex-1 text-center">

              <h3 className="text-4xl font-philosopher font-bold text-[#04343b] mb-1">
                Ankiit Btra
              </h3>

              <p className="text-sm font-semibold text-gray-500 mb-4">
                Numerologist • Motivational Speaker • Life Coach
              </p>

              {/* STATS CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { value: '23,000+', label: 'Trained' },
                  { value: '6+ Years', label: 'Experience' },
                  { value: '40K+', label: 'YouTube' },
                  { value: '104K+', label: 'Instagram' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#f7931e] text-white rounded-2xl py-4 text-center shadow-md"
                  >
                    <p className="text-xl font-bold">{item.value}</p>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                I am a Numerologist, Motivational speaker, and Life coach. I’ve spent
                10 years of my life in Information Technology and worked as a Business
                Analyst across the globe in Multi-National companies.
                <br /><br />
                I spent 3 years in Singapore working on international projects, which
                made me a practical, rational, and pragmatic thinker.
                <br /><br />
                My passion for spiritualism drew me towards the occult field. Today,
                my rational and holistic approach makes me a trusted friend,
                philosopher, guide, and Numerologist for thousands.
              </p>

            </div>
          </div>
        </div>

        {/* FEATURED LOGOS */}
        <div className="mt-10 text-center">
          <p className="text-white/80 text-sm mb-4 uppercase tracking-wide">
            Featured In
          </p>

          <div className="flex flex-wrap justify-center gap-6 items-center">
            <img src="/ted.png" className="h-10" alt="TEDx" />
            <img src="/vedic.png" className="h-16" alt="Vedic Vox" />
            <img src="/mind2.png" className="h-10" alt="Mindtree" />
          </div>
        </div>

      </div>
    </section>
  );
};
