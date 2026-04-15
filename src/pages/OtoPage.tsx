import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CountdownTimer } from "@/components/CountdownTimer";
import { User, Mail, Phone, MapPin, Loader2, Calendar, Users } from "lucide-react";
import { useUTMParams } from "@/hooks/useUTMParams";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useRazorpay } from "@/hooks/useRazorpay"; 
import AddToCartButton from "@/components/AddToCartButton"; 
import { toast } from "sonner";
import { PRODUCT1, PRODUCT1_OTO, RAZORPAY_DESCRIPTION, RAZORPAY_PRODUCT_NAME, WEBINAR_NAME_1 } from "@/utils/product-info";
import { trackAddToCart, trackFormSubmit } from "@/utils/gtm";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNqQghsxa10pLaJKRryPO0fs0-02M4diS9pJ2RwZVisD0KeN5q97BZehzijb1LBKLlRQ/exec";

const GOOGLE_SCRIPT_URL_NEW = "https://script.google.com/macros/s/AKfycbxvwM7-yIPpgIW-7gdWBuLMEEcDvHq-Xz3piCgolOUkY1TfEPH9oneyOrnxmCpyC38v/exec";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  dob: string;
  gender: string;
  courseName: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  dob?: string;
  gender?: string;
}

export default function OtoPage() {
  const utmParams = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("utm_params") || "{}")
  : {};
  const { initiatePayment, loading: razorpayLoading } = useRazorpay();

  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const prefilledDob = urlParams.get("dob") || "";

  const [upgrade499, setUpgrade499] = useState(false);
  const [fireAddToCart, setFireAddToCart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    dob: prefilledDob,
    gender: "",
    courseName: "Name Numerology NNW Workshop - FB1",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  /* 🔥 FACEBOOK PIXEL TRACKING */
  // useFacebookPixel(
  //   fireAddToCart
  //     ? {
  //         eventName: "AddToCart",
  //         eventParams: {
  //           content_name: formData.courseName,
  //           content_category: upgrade499 ? "LP2_Offer_499" : "LP2_Offer_99",
  //           content_ids: [upgrade499 ? "LP2_IN_499" : "LP2_IN_99"],
  //           content_type: "product",
  //           value: upgrade499 ? 499 : 99,
  //           currency: "INR",
  //         },
  //       }
  //     : undefined
  // );

  /* ✅ UPDATE COURSE NAME DYNAMICALLY */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      courseName: upgrade499
        ? "Name Numerology NNW Workshop + 5 Year Destiny Report - FB"
        : "Name Numerology NNW Workshop - FB1",
      gender: upgrade499 ? prev.gender : "",
      dob: upgrade499 ? prev.dob : "",
    }));
  }, [upgrade499]);

  /* ✅ VALIDATION LOGIC */
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter valid 10-digit number";
    }
    if (!formData.city.trim()) newErrors.city = "City is required";
    
    if (upgrade499) {
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // /* ✅ SYNC DATA TO GOOGLE SHEETS */
  // const sendToGoogleSheets = async () => {
  //   try {
  //     const body = new URLSearchParams({
  //       ...formData,
  //       ...utmParams,
  //       upgrade: upgrade499 ? "499" : "99",
  //       pageUrl: window.location.href,
  //       timestamp: new Date().toISOString(),
  //     });
  //     await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: 'no-cors', body });
  //   } catch (err) {
  //     console.error("Sheet Sync Error:", err);
  //   }
  // };

      const sendToGoogleSheets = async () => {
      try {
        const body = new URLSearchParams({
          ...formData,
          ...utmParams,
          upgrade: upgrade499 ? "499" : "99",
          pageUrl: window.location.href,
          timestamp: new Date().toISOString(),
        });

        // Send to both sheets
        await Promise.all([
          fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", body }),
          fetch(GOOGLE_SCRIPT_URL_NEW, { method: "POST", mode: "no-cors", body })
        ]);

      } catch (err) {
        console.error("Sheet Sync Error:", err);
      }
    };

  /* ✅ FORM SUBMISSION & RAZORPAY POPUP */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
   
    setIsSubmitting(true);

    trackFormSubmit({
      formData: {
        ...formData,
      }, formName: "OTO Form"
      
    });

    // Sync info to sheets before opening popup
    await sendToGoogleSheets();
    const product = upgrade499 ? PRODUCT1_OTO : PRODUCT1 ; // Using OTO product for both since price is dynamic
    const workshopName = upgrade499 ? `${WEBINAR_NAME_1} FB + 5 Year Destiny Report` : `${WEBINAR_NAME_1} FB`;
    trackAddToCart(product)
    // Trigger Razorpay Popup
    const result = await initiatePayment({
      amount: product.price,
      productName: `Ankit Batra's Numerology Workshop`,
      description: RAZORPAY_DESCRIPTION,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        ...formData,
        ...utmParams,
        page_url: window.location.href,
        workshop: workshopName
      }
    });

    if (result.status === "success") {
      // ✅ SUCCESS REDIRECT LOGIC
      const successParams = new URLSearchParams({
        payment_id: result.paymentId || "",
        ...utmParams as any
      });

      // Redirect to specific page based on price
      if (upgrade499) {
        window.location.href = `/ty-oto-fb?${successParams.toString()}`;
      } else {
        window.location.href = `/ty-fb?${successParams.toString()}`;
      }
      
    } else {
      // Handle Failure or Cancel
      if (result.error !== "Payment cancelled by user") {
        toast.error(result.error || "Payment failed");
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: undefined });
  };

  return (
    <section className="relative min-h-screen bg-[#04343b] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-gray-800">
          Reserve Your Spot Now
        </h2>

        <div className="flex justify-center gap-2 mb-3">
          <span className="line-through text-gray-400">₹999</span>
          <span className="text-3xl font-extrabold text-[#04343B]">₹{upgrade499 ? "499" : "99"}</span>
          <span className="bg-yellow-100 text-yellow-800 px-2 rounded text-xs flex items-center">
            {upgrade499 ? "50% OFF" : "90% OFF"}
          </span>
        </div>

        <div className="flex justify-center mb-6">
          <CountdownTimer />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "name", icon: User, placeholder: "Full Name" },
            { key: "email", icon: Mail, placeholder: "Email Address", type: "email" },
            { key: "phone", icon: Phone, placeholder: "Phone Number", type: "tel" },
            { key: "city", icon: MapPin, placeholder: "City" },
          ].map(({ key, icon: Icon, placeholder, type }) => (
            <div key={key} className="relative space-y-1">
              <Icon className="absolute left-3 top-6 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type={type || "text"}
                placeholder={placeholder}
                value={(formData as any)[key]}
                onChange={handleChange(key as keyof FormData)}
                className={`pl-10 h-12 ${errors[key as keyof FormErrors] ? "border-red-500" : ""}`}
              />
              {errors[key as keyof FormErrors] && (
                <p className="text-xs text-red-500 ml-1">{errors[key as keyof FormErrors]}</p>
              )}
            </div>
          ))}

          {/* UPGRADE CHECKBOX */}
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={upgrade499}
                onChange={(e) => setUpgrade499(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#04343b] focus:ring-[#04343b]"
              />
              <span className="leading-tight text-gray-700">
                Yes! Add the <span className="font-extrabold text-green-700">“Destiny Report”</span> for just <span className="font-bold text-red-600">₹499</span> (Worth ₹999)
              </span>
            </label>
          </div>

          {/* CONDITIONAL DOB & GENDER FOR UPGRADE */}
          {upgrade499 && (
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                   <Calendar className="w-4 h-4" /> Date of Birth
                </label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={handleChange("dob")}
                  className={`h-12 ${errors.dob ? "border-red-500" : ""}`}
                />
                {errors.dob && <p className="text-xs text-red-500 ml-1">{errors.dob}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                   <Users className="w-4 h-4" /> Gender
                </label>
                <div className="flex gap-6 px-1">
                  {["male", "female"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => {
                          setFormData({ ...formData, gender: e.target.value });
                          setErrors({ ...errors, gender: undefined });
                        }}
                        className="w-4 h-4 text-[#04343b] focus:ring-[#04343b]"
                      />
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-xs text-red-500 ml-1">{errors.gender}</p>}
              </div>
            </div>
          )}

          {/* ACTION BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting || razorpayLoading}
            className="w-full h-14 text-lg font-bold shadow-lg bg-[#04343b] text-white rounded-xl hover:bg-[#064a54] transition-colors">
              {(isSubmitting || razorpayLoading) ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" /> Processing…
                </div>
              ) : upgrade499 ? (
                "Book My Seat @ ₹499"
              ) : (
                "Book My Seat @ ₹99"
              )}
            </button>
          
          <p className="text-[10px] text-center text-gray-400 mt-2">
            Secure 256-bit SSL Encrypted Payment
          </p>
        </form>
      </div>
    </section>
  );
}