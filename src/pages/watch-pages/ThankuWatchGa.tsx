import { useEffect } from 'react';
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
// import { useFacebookPixel } from "@/hooks/usePIxelWatch"; // Using the hook from your previous reference
import { trackPurchase } from '@/utils/gtm';
import { GA_PRODUCT2, DISCOUNTED_PRICE_WATCH } from '@/utils/product-info';

const WHATSAPP_LINK = "https://hi.switchy.io/hiswitchywatch";

export const ThankuWatchGa = () => {
  // 1. Facebook Pixel Tracking for Free Registration
  // useFacebookPixel({
  //   eventName: "CompleteRegistration_Watch",
  //   eventParams: {
  //     content_name: GA_PRODUCT2.item_name,
  //     content_category: "Free_Workshop",
  //     content_ids: [GA_PRODUCT2.item_id],
  //     content_type: "product",
  //     value: DISCOUNTED_PRICE_WATCH,
  //     currency: "INR",
  //   },
  // });

  useEffect(() => {
    // 2. Get payment/transaction ID from URL (or fallback)
   
    document.title = "Wristwatch Workshop | Ankiit Btra ";
  
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("payment_id") || params.get("razorpay_payment_id") || `free_${Date.now()}`;

    // 3. Prevent duplicate tracking on page refresh
    const alreadyTracked = localStorage.getItem(`tracked_${transactionId}`);
    if (alreadyTracked) return;
    
    localStorage.setItem(`tracked_${transactionId}`, "true");

    // 4. Fire GTM Purchase Event (Value 0 for Free Workshop)
    trackPurchase({
      transaction_id: transactionId,
      value: DISCOUNTED_PRICE_WATCH,
      currency: "INR",
      items: [
        { ...GA_PRODUCT2 }
      ],
    });
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-[#0f0f0f] rounded-3xl p-6 md:p-8 shadow-2xl text-center border border-white/5">
        
        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="h-9 w-9 text-green-400" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-extrabold mb-3">
          You’re Successfully Registered 🎉
        </h1>

        {/* SUBTEXT */}
        <p className="text-white/80 text-sm md:text-base mb-6">
          Your seat for the <span className="text-[#F4C063] font-semibold">
          {GA_PRODUCT2.item_name}
          </span> is confirmed.
        </p>

        {/* PRIMARY CTA */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-extrabold py-4 rounded-xl text-lg transition mb-4 shadow-[0_0_20px_rgba(37,211,102,0.2)]"
        >
          <MessageCircle className="h-5 w-5" />
          Join WhatsApp Group Now
          <ArrowRight className="h-5 w-5" />
        </a>

        {/* WHY JOIN */}
        <p className="text-xs text-red-500 font-bold mb-6">
          ⚠️ Important updates, joining link, reminders & bonuses  
          will be shared **only inside the WhatsApp group**
        </p>

        {/* NEXT STEPS */}
        <div className="bg-[#111] rounded-xl p-4 text-left space-y-2 text-sm mb-6 border border-white/10">
          <p className="font-semibold text-white">What happens next?</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Join the WhatsApp group</li>
            <li>Get workshop access link</li>
            <li>Receive bonus tips before session</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <p className="text-xs text-white/50">
          Didn’t get WhatsApp access?  
          Please check spam or try again using the button above.
        </p>

      </div>
    </section>
  );
};