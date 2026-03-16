import { useState } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Gift,
  TrendingUp,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { useFacebookPixel } from "@/hooks/usePIxelWatch";

const books = [
  { title: 'Money Flow Mastery', desc: 'Paisa stable karne ke liye', image: '/3.png' },
  { title: 'Name Numerology Blueprint', desc: 'Naam ka power samajhne ke liye', image: '/4.png' },
  { title: 'Attract The Right Clients', desc: 'Sahi clients attract karne ke liye', image: '/2.png' },
  { title: '10X Your Business', desc: 'Business growth ke liye', image: '/1.png' },
  { title: 'Numerology Success Diary', desc: '30 din ka guided routine', image: '/5.png' },
];

export const OTOWatchPage = () => {
  useFacebookPixel({
    eventName: "Lead_Watch",
  });

  // INITIAL STATE SET TO NULL (No radio button selected by default)
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);

  const params = new URLSearchParams(window.location.search);
  const fullName = params.get('full_name') || '';
  const email = params.get('email') || '';
  const phone = params.get('phone') || '';
  const city = params.get('city') || 'NA';

  const handleContinue = () => {
    if (choice === 'yes') {
      const razorpayBase = 'https://pages.razorpay.com/pl_S6a2oIr2Ld8yo0/view';
      const queryParams = new URLSearchParams({
        full_name: fullName,
        email: email,
        phone: phone,
        city: city,
        course_name: 'Wrist Watch Workshop - FB',
      }).toString();
      window.location.href = `${razorpayBase}?${queryParams}`;
    }

    if (choice === 'no') {
      window.location.href = 'https://go.viralvigyapan.com/watchf';
    }
  };

  const MiniWhatsAppLogo = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );

  return (
    <section className="min-h-screen bg-[#0b0b0b] py-10 md:py-20 text-white font-sans">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* TOP WHATSAPP BUTTON WITH RED NOTE */}
        <div className="flex flex-col items-center mb-12">
          <a
            href="https://go.viralvigyapan.com/watchf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <MiniWhatsAppLogo />
            Join WhatsApp Group
          </a>
          <p className="mt-3 text-red-600 font-bold text-[11px] md:text-sm text-center">
            Note: WhatsApp Group join karna mandatory hai.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#d4af37]/30 rounded-full px-4 py-1 text-sm font-semibold text-[#d4af37] mb-5">
              <Sparkles className="h-4 w-4" />
              Upgrade Option · Only ₹99 Today
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Ab paisa + success ko{' '}
              <span className="text-[#d4af37]">fast-track</span> kijiye
            </h1>

            <p className="text-lg text-white/80 mt-4 max-w-2xl leading-relaxed">
              Aapka <span className="font-semibold text-white">Wristwatch Analysis unlock</span> ho gaya hai.
              <br />
              Ab next step hai{' '}
              <span className="font-semibold text-white">paisa + clients + growth</span> ko boost karna — sirf{' '}
              <span className="font-semibold text-[#d4af37]">₹99</span> mein.
            </p>

            {/* Bundle UI */}
            <div className="mt-10 bg-[#121212] rounded-2xl border border-white/10 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Gift className="h-5 w-5 text-[#d4af37]" />
                Aapko kya milega (5 Ebooks Bundle)
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:hidden">
                {books.slice(0, 3).map((book, i) => (
                  <div key={i} className="bg-[#0b0b0b] border border-white/10 rounded-xl p-2 text-center">
                    <img src={book.image} alt={book.title} className="w-full h-24 object-contain mb-2" />
                    <h4 className="font-semibold text-white text-[10px]">{book.title}</h4>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-3 sm:hidden">
                {books.slice(3).map((book, i) => (
                  <div key={i} className="bg-[#0b0b0b] border border-white/10 rounded-xl p-2 text-center w-[30%]">
                    <img src={book.image} alt={book.title} className="w-full h-24 object-contain mb-2" />
                    <h4 className="font-semibold text-white text-[10px]">{book.title}</h4>
                  </div>
                ))}
              </div>
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, i) => (
                  <div key={i} className="bg-[#0b0b0b] border border-white/10 rounded-xl p-4 text-center">
                    <img src={book.image} alt={book.title} className="w-full h-40 object-contain mb-3" />
                    <h4 className="font-semibold text-white text-sm">{book.title}</h4>
                    <p className="text-xs text-white/60 mt-1">{book.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CHOICE BOX */}
          <div className="bg-white text-[#0b0b0b] rounded-3xl shadow-2xl p-6 md:p-8 sticky top-6">
            <p className="text-[10px] text-gray-500 text-center mb-1 uppercase tracking-widest font-bold">One last step</p>
            <h3 className="text-xl font-bold text-center mb-6 px-2">Choose Yes / No in this section</h3>
            
            <div className="space-y-4">
              {/* YES CHOICE */}
              <label className={`flex items-center justify-between flex-wrap gap-2 border rounded-2xl p-3 md:p-4 cursor-pointer transition-all duration-300
                ${choice === 'yes' ? 'border-[#d4af37] bg-[#fff9e6]' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <input type="radio" name="oto" checked={choice === 'yes'} onChange={() => setChoice('yes')} className="w-4 h-4 md:w-5 md:h-5 accent-[#d4af37] shrink-0" />
                  <span className="font-bold text-black text-[13px] sm:text-sm md:text-base whitespace-nowrap">
                    Haan, ₹99 Upgrade
                  </span>
                </div>
                <span className="shrink-0 flex items-center gap-1 bg-green-600 text-white text-[10px] md:text-[11px] px-2 py-1 rounded-lg font-bold uppercase tracking-tighter">
                  + <MiniWhatsAppLogo /> WhatsApp Group Join
                </span>
              </label>

              {/* NO CHOICE */}
              <label className={`flex items-center justify-between flex-wrap gap-2 border rounded-2xl p-3 md:p-4 cursor-pointer transition-all duration-300
                ${choice === 'no' ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <input type="radio" name="oto" checked={choice === 'no'} onChange={() => setChoice('no')} className="w-4 h-4 md:w-5 md:h-5 accent-gray-600 shrink-0" />
                  <span className="font-bold text-gray-600 text-[13px] sm:text-sm md:text-base whitespace-nowrap">
                    Nahi, Upgrade Skip
                  </span>
                </div>
                <span className="shrink-0 flex items-center gap-1 bg-green-600 text-white text-[10px] md:text-[11px] px-2 py-1 rounded-lg font-bold uppercase tracking-tighter">
                  + <MiniWhatsAppLogo /> WhatsApp Group Join
                </span>
              </label>
            </div>

            {/* DYNAMIC BUTTONS */}
            {choice === 'no' ? (
              <button
                onClick={handleContinue}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-lg py-4 rounded-full transition-all duration-300 shadow-lg active:scale-95"
              >
                <MiniWhatsAppLogo />
                Join WhatsApp Group
              </button>
            ) : (
              <button
                disabled={!choice}
                onClick={handleContinue}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#c9a634] text-black font-bold text-lg py-4 rounded-full transition-all duration-300 disabled:opacity-40 shadow-lg active:scale-95"
              >
                Confirm & Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            {/* RED BOLD MANDATORY NOTE */}
            <p className="mt-4 text-center text-red-600 font-bold text-[11px] md:text-xs">
              WhatsApp Group join karna mandatory hai.
            </p>

            {/* FOOTER INFO */}
            <p className="text-[10px] md:text-xs text-gray-500 text-center mt-5 flex items-center justify-center gap-1.5 font-semibold">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              Payment ke baad ebooks WhatsApp / Email par share ki jaayengi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};