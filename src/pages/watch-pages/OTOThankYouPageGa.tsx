import { CheckCircle, ArrowRight, Users, Clock } from 'lucide-react';

import { useFacebookPixel } from "@/hooks/usePIxelWatch";



export const OTOThankYouPageGa = () => {

   useFacebookPixel({
       eventName: "OTO_Watch_99",
       eventParams: {
         content_name: "OTO_Product",
         content_category: "OTO",
         value: 99,
         currency: "INR",
       },
     });

  return (
    <section className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-2xl">

        <div className="bg-[#121212] border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 shadow-xl text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-[#d4af37]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Upgrade Successful
          </h1>

          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Aapka <span className="font-semibold text-white">Success Upgrade Bundle (₹99)</span>{' '}
            successfully activate ho chuka hai.
          </p>

          {/* Info box */}
          <div className="mt-6 bg-[#0b0b0b] border border-white/10 rounded-xl p-4 text-left">
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#d4af37] mt-0.5" />
                Payment verify hone ke baad saare ebooks
                <span className="font-semibold"> WhatsApp / Email</span> par share kiye jaayenge.
              </li>

              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 text-[#d4af37] mt-0.5" />
                Updates aur guidance ke liye
                <span className="font-semibold"> WhatsApp group join karna zaroori</span> hai.
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6">
            <a
              href="https://go.viralvigyapan.com/watchf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                bg-[#25D366] hover:bg-[#1ebe5d]
                text-black font-bold
                px-6 py-3 rounded-full
                transition w-full sm:w-auto
              "
            >
              <Users className="h-5 w-5" />
              Join WhatsApp Group
              <ArrowRight className="h-5 w-5" />
            </a>

            <p className="text-[11px] text-white/50 mt-3">
              Important updates sirf WhatsApp group mein milengi
            </p>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-white/40 mt-4">
          Please join the WhatsApp group before closing this page.
        </p>

      </div>
    </section>
  );
};
