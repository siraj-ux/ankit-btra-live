import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountdownTimer } from "@/components/CountdownTimer";
import { User, Mail, Phone, MapPin, Loader2, Calendar, Users } from "lucide-react";
import { useUTMParams, buildRazorpayURL } from "@/hooks/useUTMParams";
// import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { trackAddToCart, trackFormSubmit } from "@/utils/gtm";
import { GA_PRODUCT1, GA_PRODUCT1_OTO, RAZORPAY_DESCRIPTION, WEBINAR_NAME_1 } from "@/utils/product-info";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "@/components/ui/sonner";

// const RAZORPAY_99_URL = "https://pages.razorpay.com/pl_S6ZxgWS0ZZvgE2/view";
// const RAZORPAY_499_URL = "https://pages.razorpay.com/pl_S6aRnHuQsmGTB4/view";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNqQghsxa10pLaJKRryPO0fs0-02M4diS9pJ2RwZVisD0KeN5q97BZehzijb1LBKLlRQ/exec";

const GOOGLE_SCRIPT_URL_NEW = "https://script.google.com/macros/s/AKfycbxvwM7-yIPpgIW-7gdWBuLMEEcDvHq-Xz3piCgolOUkY1TfEPH9oneyOrnxmCpyC38v/exec";


interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  dob: string;
  gender: string; // Added gender back
  courseName: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  dob?: string;
  gender?: string; // Added gender back
}

export default function OtoPage() {
  // const utmParams = useUTMParams();
  const utmParams = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("utm_params") || "{}")
  : {};

  // Fix for SSR: check if window is defined
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
  const {initiatePayment, loading, error} = useRazorpay();
  const [errors, setErrors] = useState<FormErrors>({});

  // useFacebookPixel(
  //   fireAddToCart
  //     ? {
  //         eventName: "AddToCart",
  //         eventParams: {
  //           content_name: "LP2_Product",
  //           content_category: upgrade499 ? "LP2_Offer_499" : "LP2_Offer_99",
  //           content_ids: [upgrade499 ? "LP2_IN_499" : "LP2_IN_99"],
  //           content_type: "product",
  //           value: upgrade499 ? 499 : 99,
  //           currency: "INR",
  //         },
  //       }
  //     : undefined
  // );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      courseName: upgrade499
        ? "Name Numerology NNW Workshop + 5 Year Destiny Report - GA1"
        : "Name Numerology NNW Workshop - GA1",
    }));
  }, [upgrade499]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit number";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (upgrade499) {
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
  //   } catch (e) {
  //     console.error(e);
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



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    trackFormSubmit({
          formData: {
            ...formData,
          }, formName: "OTO Form GA"
          
        });

    setIsSubmitting(true);
    setFireAddToCart(true);

    await sendToGoogleSheets();

    const product = upgrade499 ? GA_PRODUCT1_OTO : GA_PRODUCT1 ;// Using OTO product for both since price is dynamic
    const workshopName = upgrade499 ? `${WEBINAR_NAME_1} GA + 5 Year Destiny Report` : `${WEBINAR_NAME_1} GA`;
    trackAddToCart(product)
        // Trigger Razorpay Popup
    const result = await initiatePayment({
        amount: product.price,
        productName: `Ankit Batra's Numerology Workshop`,
        description: `${RAZORPAY_DESCRIPTION} from GA Page`,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          ...formData,
          ...utmParams,
          page_url: window.location.href,
          workshop: workshopName,
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
        window.location.href = `/ty-oto-ga?${successParams.toString()}`;
      } else {
        window.location.href = `/ty-ga?${successParams.toString()}`;
      }
      
    } else {
      // Handle Failure or Cancel
      if (result.error !== "Payment cancelled by user") {
        toast.error(result.error || "Payment failed");
      }
      setIsSubmitting(false);
    }

    // let razorpayURL = buildRazorpayURL(
    //   upgrade499 ? RAZORPAY_499_URL : RAZORPAY_99_URL,
    //   formData,
    //   utmParams
    // );

    // const sep = razorpayURL.includes("?") ? "&" : "?";
    // razorpayURL += `${sep}course_name=${encodeURIComponent(formData.courseName)}`;

    // if (upgrade499) {
    //   if (formData.dob) razorpayURL += `&dob=${encodeURIComponent(formData.dob)}`;
    //   if (formData.gender) razorpayURL += `&gender=${encodeURIComponent(formData.gender)}`;
    // }

    // window.location.href = razorpayURL;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: undefined });
  };

  return (
    <section className="relative min-h-screen bg-[#04343b] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-gray-800">
          Reserve Your Spot Now
        </h2>

        <div className="flex justify-center gap-2 mb-3">
          <span className="line-through text-gray-400">₹999</span>
          <span className="text-3xl font-extrabold text-[#04343B]">₹99</span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold flex items-center">
            90% OFF
          </span>
        </div>

        <div className="flex justify-center mb-6">
          <CountdownTimer />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Contact Fields */}
          {[
            { key: "name", icon: User, label: "Full Name", placeholder: "e.g. John Doe", name: "name" },
            { key: "email", icon: Mail, label: "Email Address", placeholder: "john@example.com", type: "email", name:"email" },
            { key: "phone", icon: Phone, label: "Phone Number", placeholder: "10-digit mobile number", type: "tel", name: "phone number" },
            { key: "city", icon: MapPin, label: "City", placeholder: "Your current city", type: "text", name: "city"},
          ].map(({ key, icon: Icon, label, placeholder, type }) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={type || "text"}
                  placeholder={placeholder}
                  value={(formData as any)[key]}
                  onChange={handleChange(key as keyof FormData)}
                  className={`pl-10 h-11 ${errors[key as keyof FormErrors] ? "border-red-500" : ""}`}
                />
              </div>
              {errors[key as keyof FormErrors] && (
                <p className="text-[10px] text-red-500 ml-1">{errors[key as keyof FormErrors]}</p>
              )}
            </div>
          ))}

          {/* UPGRADE CHECKBOX */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 mt-2">
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={upgrade499}
                onChange={(e) => setUpgrade499(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#04343b]"
              />
              <span className="text-gray-700 leading-tight">
                Yes! Add the <span className="font-bold text-green-700">“Destiny Report”</span> for just <span className="font-bold text-red-600">₹499</span>
              </span>
            </label>
          </div>

          {/* CONDITIONAL DOB & GENDER */}
          {upgrade499 && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 ml-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Date of Birth
                </label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={handleChange("dob")}
                  className={`h-11 ${errors.dob ? "border-red-500" : ""}`}
                />
                {errors.dob && <p className="text-[10px] text-red-500 ml-1">{errors.dob}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 ml-1 flex items-center gap-1">
                  <Users className="w-3 h-3" /> Gender
                </label>
                <div className="flex gap-4 px-1">
                  {["male", "female"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => {
                          setFormData({ ...formData, gender: e.target.value });
                          setErrors({ ...errors, gender: undefined });
                        }}
                        className="h-4 w-4 text-[#04343b]"
                      />
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-[10px] text-red-500 ml-1">{errors.gender}</p>}
              </div>
            </div>
          )}

          <Button type="submit" size="xl" className="w-full font-bold text-lg h-14 shadow-xl" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Processing…
              </>
            ) : upgrade499 ? (
              "Book My Seat @ ₹499"
            ) : (
              "Book My Seat @ ₹99"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}