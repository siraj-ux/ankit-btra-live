import { CheckCircle, ArrowRight, MessageCircle, Calendar, Clock } from "lucide-react";
import { useRef, useEffect } from 'react';

const WHATSAPP_LINK = "https://hi.switchy.io/hiswitchywatch";

export const ThankYouPageWatch = () => {
    
  useEffect(() => {
    document.title = "Wristwatch Workshop | Ankiit Btra ";
  }, []);
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="max-w-lg w-full bg-[#0f0f0f] rounded-3xl p-6 md:p-8 shadow-2xl text-center">

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
          FREE Wristwatch Workshop
          </span> is confirmed.
        </p>

  

        {/* PRIMARY CTA */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-black font-extrabold py-4 rounded-xl text-lg transition mb-4"
        >
          <MessageCircle className="h-5 w-5" />
          Join WhatsApp Group Now
          <ArrowRight className="h-5 w-5" />
        </a>

        {/* WHY JOIN */}
        <p className="text-xs text-white/70 mb-6">
          ⚠️ Important updates, joining link, reminders & bonuses  
          will be shared **only inside the WhatsApp group**
        </p>

        {/* NEXT STEPS */}
        <div className="bg-[#111] rounded-xl p-4 text-left space-y-2 text-sm mb-6">
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