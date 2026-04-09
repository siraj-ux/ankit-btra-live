import { CheckCircle, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react'; // ✅ Added useEffect
// import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { trackPurchase } from "@/utils/gtm"; // ✅ Added GTM tracking
import { ORDER, OTO_OG_PRICE, PRODUCT1_OTO } from "@/utils/product-info"; // ✅ Added Order info

export const ThankYouPageOtoFb = () => {
  // /* 🔥 FACEBOOK PIXEL TRACKING (Value: 499) */
  // useFacebookPixel({
  //   eventName: "Purchase",
  //   eventParams: {
  //     content_name: "LP2_OTO_Product",
  //     content_category: "LP2_OTO",
  //     content_ids: ["LP2_IN_OTO_199"],
  //     content_type: "product",
  //     value: 499,
  //     currency: "INR",
  //   },
  // });

  /* ✅ GTM PURCHASE TRACKING (Value: 499) */
  useEffect(() => {
    // 1. Get payment ID from URL
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("payment_id") || params.get("razorpay_payment_id");

    if (paymentId) {
      // 2. Refresh Protection
      const alreadyTracked = localStorage.getItem(`tracked_${paymentId}`);
      if (alreadyTracked) return;
      
      localStorage.setItem(`tracked_${paymentId}`, "true");
    }

    // 3. Fire GTM Event (Specifically for the 499 OTO)
    trackPurchase({
          ...ORDER,
          value: OTO_OG_PRICE,
          items: [
            {...PRODUCT1_OTO}
          ],
      transaction_id: paymentId || `txn_oto_${Date.now()}`,
    });
  }, []);

  return (
    <section className="min-h-screen bg-[#04343b] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center animate-in fade-in zoom-in duration-500">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#04343b] mb-2 leading-tight">
          Upgrade Confirmed! 🎉
        </h1>

        {/* Sub Text */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for joining the <strong>Numerology Webinar (NNW)</strong> and
          upgrading to the <strong>Destiny Report</strong>.  
          You’ve just taken the fastest route to real results.
        </p>

        {/* Report Delivery Info */}
        <div className="bg-[#04343b]/5 border border-[#04343b]/10 rounded-xl p-5 mb-6 flex gap-3 items-start text-left">
          <FileText className="h-6 w-6 text-[#04343b] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Your <strong>Destiny Report</strong> will be delivered shortly to
            your registered <strong>WhatsApp number</strong>.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://hi.switchy.io/hiswitchynamennw"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Button
            size="lg"
            className="
              w-full h-14
              bg-green-500 hover:bg-green-600
              text-white
              font-bold
              text-lg
              rounded-xl
              flex items-center justify-center gap-2
              shadow-lg
              transition-all
              group-hover:scale-[1.02]
            "
          >
            <MessageCircle className="h-5 w-5" />
            Join WhatsApp Group Now
            <ArrowRight className="h-5 w-5 animate-bounce-x" />
          </Button>
        </a>

        {/* Trust Line */}
        <p className="text-[11px] text-gray-500 mt-5 font-medium italic">
          Join the WhatsApp group to receive updates, reminders, and bonus guidance
        </p>

      </div>
    </section>
  );
};

export default ThankYouPageOtoFb;