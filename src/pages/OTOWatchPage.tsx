import { useState, useEffect } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Gift,
  TrendingUp,
  ShieldCheck,
  Clock,
  Loader2
} from 'lucide-react';
// import { useFacebookPixel } from "@/hooks/usePIxelWatch";
import { useUTMParams } from "@/hooks/useUTMParams";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "sonner";
import { trackAddToCart, trackFormSubmit, trackPurchase } from "@/utils/gtm";
// Updated import to include PRODUCT2
import { ORDER, PRODUCT2, PRODUCT2_OTO, RAZORPAY_DESCRIPTION, RAZORPAY_PRODUCT_NAME, WEBINAR_NAME_2 } from "@/utils/product-info";

/* 🔗 APPS SCRIPT URL */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby6O9cD_HsMp9Ws8QJmI2UtvCAmY1uyTDa7wgBfCnEJtSNH-L0GOoTiFMonqlcQZjxu/exec";

const SCRIPT_URL_NEW ="https://script.google.com/macros/s/AKfycbwyFQFUerEL2TwXkBBQUuH0bfDLWUgCXZBCuu0j9VRXL5y9FEAwIK89yTD6nblyGRXcZQ/exec"

/* 🔗 DATE & TIME & WHATSAPP CSV */
const DATE_TIME_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSA1mZDhz4voyKH_izB4TrrAX2MXMc5Dm3AiGjuLftCweG8I_FY9Z1SZcTHwd_ymhP2LtrFPrU-feDX/pub?gid=18023713&single=true&output=csv";

const books = [
  { title: 'Money Flow Mastery', desc: 'Paisa stable karne ke liye', image: '/3.png' },
  { title: 'Name Numerology Blueprint', desc: 'Naam ka power samajhne ke liye', image: '/4.png' },
  { title: 'Attract The Right Clients', desc: 'Sahi clients attract karne ke liye', image: '/2.png' },
  { title: '10X Your Business', desc: 'Business growth ke liye', image: '/1.png' },
  { title: 'Numerology Success Diary', desc: '30 din ka guided routine', image: '/5.png' },
];

export const OTOWatchPage = () => {
  const utmParams = useUTMParams();
  const { initiatePayment, loading: razorpayLoading } = useRazorpay();
  const [fireAddToCart, setFireAddToCart] = useState(false);
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);
  const [loading, setLoading] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("https://hi.switchy.io/hiswitchywatch");

  useEffect(() => {
    document.title = "Wristwatch Workshop | Ankiit Btra";
    fetch(DATE_TIME_CSV)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n");
        if (rows.length > 1) {
          const cols = rows[1].split(",");
          const dynamicLink = cols[2]?.trim();
          if (dynamicLink && dynamicLink.startsWith("http")) {
            setWhatsappLink(dynamicLink);
          }
        }
      })
      .catch(() => console.error("Failed to fetch WhatsApp link from sheet"));
  }, []);

  // --- RETRIEVE DATA FROM PARAMS OR SESSION STORAGE ---
  const params = new URLSearchParams(window.location.search);
  const savedData = JSON.parse(sessionStorage.getItem("user_details") || "{}")

  console.log("Saved Data from Session Storage:", savedData);
  const fullName = savedData.full_name || params.get('full_name') || '';
  const email = savedData.email || params.get('email') || '';
  const phone = savedData.phone || params.get('phone') || '';
  const city = savedData.city || params.get('city') || '';
  const profession = savedData.profession || params.get('profession') || '';
  const ageRange = savedData.age_range || params.get('age_range') || '';
  const transactionId = savedData.transaction_id || '';
  const workshop = savedData.workshop || '';

  const trackToSheet = async (status: string) => {
  try {
    // ✅ OLD SHEET BODY (unchanged)
    const oldBody = new URLSearchParams({
      name: fullName,
      email: email,
      phone: phone,
      profession: profession,
      age_range: ageRange,
      transactionId: transactionId,
      workshop: workshop,
      ...utmParams,
      utm_source: "facebook",
      utm_campaign: "wristwatch_workshop",
      utm_term: status,
    });

    // ✅ NEW SHEET BODY (as per your new columns)
    const newBody = new URLSearchParams({
      name: fullName,
      email: email,
      phone: phone,
      profession: profession,
      age_range: ageRange,

      // 🔥 NEW REQUIRED FIELDS
      workshop_name: "wristwatch_workshop_fb",
      product_type: status, // free_skip / paid_selected
      page_url: window.location.href,

      // 🔥 UTM PARAMS
      utm_source: utmParams.utm_source || "",
      utm_medium: utmParams.utm_medium || "",
      utm_campaign: utmParams.utm_campaign || "",
      utm_term: utmParams.utm_term || "",
      utm_content: utmParams.utm_content || "",
      gclid: utmParams.gclid || "",
      fbclid: utmParams.fbclid || ""
    });

    // ✅ SEND TO BOTH (different payloads)
    await Promise.all([
      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: oldBody,
      }),
      fetch(SCRIPT_URL_NEW, {
        method: "POST",
        mode: "no-cors",
        body: newBody,
      })
    ]);

  } catch (error) {
    console.error("Sheet update failed", error);
  }
};

  const handleTopJoin = async () => {
    if (loading) return;
    setLoading(true);
    
    // GTM: Track Add to Cart for the free product when clicking top button
    // trackAddToCart(PRODUCT2);

    if (fullName || email || phone) {
      await trackToSheet("free_skip");
    }
    window.location.href = whatsappLink;
  };

  const handleContinue = async () => {
    if (!choice || loading || razorpayLoading) return; 
    setLoading(true);
    
    const status = choice === 'yes' ? "paid_selected" : "free_skip";
    
    if (fullName || email || phone) {
      await trackToSheet(status);
    }

    if (choice === 'yes') {
      const product = PRODUCT2_OTO;
      const workshop = `${WEBINAR_NAME_2} FB + 5 ebooks bundle`;
      // setFireAddToCart(true);
      trackAddToCart(product);
      trackFormSubmit({
        formData: {
          name: fullName,
          email: email,
          phone: phone,
          city: city,
          courseName: product.item_name,
          oto: "yes"
        }, 
        formName: "OTO Watch Form"
      });
      console.log(fullName,email,phone);
      
      const result = await initiatePayment({
        amount: product.price,
        productName: RAZORPAY_PRODUCT_NAME,
        description: RAZORPAY_DESCRIPTION,
        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },
        notes: {
          ...utmParams,
          page_url: window.location.href,
          workshop: workshop,
          payment_id : transactionId,
        }
      });

      if (result.status === "success") {
        const successParams = new URLSearchParams({
          payment_id: result.paymentId || "",
          order_id: result.orderId || "",
          transaction_id: transactionId || "",
          ...utmParams
        });
        window.location.href = `/oto-watch-fb-ty?${successParams.toString()}`;
      } else {
        if (result.error !== "Payment cancelled by user") {
          toast.error(result.error || "Payment failed");
        }
        setLoading(false);
      }
    } else {
      // GTM: Track Add to Cart for PRODUCT2 when "Nahi, Upgrade Skip" is selected
      trackAddToCart(PRODUCT2);
      window.location.href = whatsappLink;
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
        <div className="flex flex-col items-center mb-12">
          <button
            onClick={handleTopJoin}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.3)] disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
              <>
                <MiniWhatsAppLogo />
                Join WhatsApp Group
              </>
            )}
          </button>
          <p className="mt-3 text-red-600 font-bold text-[11px] md:text-sm text-center">Note: WhatsApp Group join karna mandatory hai.</p>
        </div>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#d4af37]/30 rounded-full px-4 py-1 text-sm font-semibold text-[#d4af37] mb-5">
              <Sparkles className="h-4 w-4" /> Upgrade Option · Only ₹99 Today
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Ab paisa + success ko <span className="text-[#d4af37]">fast-track</span> kijiye
            </h1>
            <p className="text-lg text-white/80 mt-4 max-w-2xl leading-relaxed">
              Aapka <span className="font-semibold text-white">Wristwatch Analysis unlock</span> ho gaya hai.
              <br />Ab next step hai <span className="font-semibold text-white">paisa + clients + growth</span> ko boost karna — sirf <span className="font-semibold text-[#d4af37]">₹99</span> mein.
            </p>
            <div className="mt-10 bg-[#121212] rounded-2xl border border-white/10 p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Gift className="h-5 w-5 text-[#d4af37]" /> Aapko kya milega (5 Ebooks Bundle)</h3>
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
          <div className="bg-white text-[#0b0b0b] rounded-3xl shadow-2xl p-6 md:p-8 sticky top-6">
            <p className="text-[10px] text-gray-500 text-center mb-1 uppercase tracking-widest font-bold">One last step</p>
            <h3 className="text-xl font-bold text-center mb-6 px-2">Choose Yes / No in this section</h3>
            <div className="space-y-4">
              <label className={`flex items-center justify-between flex-wrap gap-2 border rounded-2xl p-3 md:p-4 cursor-pointer transition-all duration-300 ${choice === 'yes' ? 'border-[#d4af37] bg-[#fff9e6]' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <input type="radio" name="oto" checked={choice === 'yes'} onChange={() => setChoice('yes')} className="w-4 h-4 md:w-5 md:h-5 accent-[#d4af37] shrink-0" />
                  <span className="font-bold text-black text-[13px] sm:text-sm md:text-base whitespace-nowrap">Haan, ₹99 Upgrade</span>
                </div>
                <span className="shrink-0 flex items-center gap-1 bg-green-600 text-white text-[10px] md:text-[11px] px-2 py-1 rounded-lg font-bold uppercase tracking-tighter">+ <MiniWhatsAppLogo /> WhatsApp Group Join</span>
              </label>
              <label className={`flex items-center justify-between flex-wrap gap-2 border rounded-2xl p-3 md:p-4 cursor-pointer transition-all duration-300 ${choice === 'no' ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <input type="radio" name="oto" checked={choice === 'no'} onChange={() => setChoice('no')} className="w-4 h-4 md:w-5 md:h-5 accent-gray-600 shrink-0" />
                  <span className="font-bold text-gray-600 text-[13px] sm:text-sm md:text-base whitespace-nowrap">Nahi, Upgrade Skip</span>
                </div>
                <span className="shrink-0 flex items-center gap-1 bg-green-600 text-white text-[10px] md:text-[11px] px-2 py-1 rounded-lg font-bold uppercase tracking-tighter">+ <MiniWhatsAppLogo /> WhatsApp Group Join</span>
              </label>
            </div>
            <button
              disabled={!choice || loading || razorpayLoading}
              onClick={handleContinue}
              className={`mt-6 w-full flex items-center justify-center gap-2 font-bold text-lg py-4 rounded-full transition-all duration-300 shadow-lg active:scale-95 disabled:opacity-40
                ${choice === 'no' ? 'bg-[#25D366] text-white hover:bg-[#1ebd5b]' : 'bg-[#d4af37] text-black hover:bg-[#c9a634]'}`}
            >
              {(loading || razorpayLoading) ? <Loader2 className="animate-spin h-6 w-6" /> : (
                <>
                  {choice === 'no' && <MiniWhatsAppLogo />}
                  {choice === 'no' ? 'Join WhatsApp Group' : 'Confirm & Continue'}
                  {choice === 'yes' && <ArrowRight className="h-5 w-5" />}
                </>
              )}
            </button>
            <p className="mt-4 text-center text-red-600 font-bold text-[11px] md:text-xs">WhatsApp Group join karna mandatory hai.</p>
            <p className="text-[10px] md:text-xs text-gray-500 text-center mt-5 flex items-center justify-center gap-1.5 font-semibold">
              <Clock className="h-3.5 w-3.5 text-gray-400" /> Payment ke baad ebooks WhatsApp / Email par share ki jaayengi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};