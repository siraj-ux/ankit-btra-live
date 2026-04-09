import { useEffect } from 'react';
import { CheckCircle, ArrowRight, Users, Clock } from 'lucide-react';
// import { useFacebookPixel } from "@/hooks/usePIxelWatch";
import { trackPurchase } from '@/utils/gtm';
import { GA_ORDER, GA_PRODUCT2_OTO, OTO_OG_PRICE_WATCH } from '@/utils/product-info';

const WHATSAPP_LINK = "https://hi.switchy.io/hiswitchywatch";

export const OTOThankYouPageGa = () => {

  useEffect(() => {
    // 2. Get payment ID from URL
     document.title = "Wristwatch Workshop | Ankiit Btra ";
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("payment_id") || params.get("razorpay_payment_id");
    const transactionId = params.get("transaction_id")

    if (paymentId) {
      // 3. Prevent duplicate tracking on page refresh
      const alreadyTracked = localStorage.getItem(`tracked_oto_${paymentId}`);
      if (alreadyTracked) return;
      
      

      trackPurchase({
            ...GA_ORDER,
            value: OTO_OG_PRICE_WATCH,
            items: [
              {
                item_id: GA_PRODUCT2_OTO.item_id,
                item_name: GA_PRODUCT2_OTO.item_name,
                item_category: GA_PRODUCT2_OTO.item_category,
                price: GA_PRODUCT2_OTO.price,
                quantity: 1,
              }
            ],
            transaction_id: paymentId || transactionId, 
            
          });

      localStorage.setItem(`tracked_oto_${paymentId}`, "true");
    }
  }, []);

  return (
    <section className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 text-white font-sans">
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
            Upgrade Successful 🎉
          </h1>

          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Aapka <span className="font-semibold text-white">{GA_PRODUCT2_OTO.item_name} (₹{GA_PRODUCT2_OTO.price})</span>{' '}
            successfully activate ho chuka hai.
          </p>

          {/* Info box */}
          <div className="mt-6 bg-[#0b0b0b] border border-white/10 rounded-xl p-4 text-left">
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span>
                  Payment verify hone ke baad saare ebooks 
                  <span className="font-semibold text-white"> WhatsApp / Email</span> par share kiye jaayenge.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span>
                  Updates aur workshop guidance ke liye 
                  <span className="font-semibold text-white"> WhatsApp group join karna zaroori</span> hai.
                </span>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                bg-[#25D366] hover:bg-[#1ebe5d]
                text-black font-extrabold
                px-8 py-4 rounded-full
                transition w-full sm:w-auto shadow-[0_0_20px_rgba(37,211,102,0.2)]
              "
            >
              <Users className="h-5 w-5" />
              Join WhatsApp Group
              <ArrowRight className="h-5 w-5" />
            </a>

            <p className="text-[11px] text-red-500 font-bold mt-3">
              Important updates sirf WhatsApp group mein milengi
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-white/40 mt-4 italic">
          Please join the WhatsApp group before closing this page to receive your bonuses.
        </p>
      </div>
    </section>
  );
};