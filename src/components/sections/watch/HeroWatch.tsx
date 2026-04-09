import React, { useEffect, useState } from "react";
import { Calendar, Clock, Globe, Video } from "lucide-react";
import SubscribeButton from "../../SubscribeButton";
import { getUTMParams, trackAddToCart, trackLead } from "@/utils/gtm";
import { PRODUCT1, PRODUCT2, WEBINAR_NAME_2 } from "@/utils/product-info";

/* 🔗 DATE & TIME CSV */
const DATE_TIME_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSA1mZDhz4voyKH_izB4TrrAX2MXMc5Dm3AiGjuLftCweG8I_FY9Z1SZcTHwd_ymhP2LtrFPrU-feDX/pub?gid=18023713&single=true&output=csv";

export const HeroSectionWatch = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age_range: "",
    profession: "",
  });

  const [loading, setLoading] = useState(false);
  const [eventDate, setEventDate] = useState("Loading...");
  const [eventTime, setEventTime] = useState("Loading...");

  /* =====================
     FETCH DATE & TIME
  ===================== */
  useEffect(() => {
    fetch(DATE_TIME_CSV)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n");
        if (rows.length > 1) {
          const cols = rows[1].split(",");
          setEventDate(cols[0]?.trim());
          setEventTime(cols[1]?.trim());
        }
      })
      .catch(() => {
        setEventDate("To be announced");
        setEventTime("To be announced");
      });
  }, []);

  /* =====================
     INPUT HANDLER
  ===================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =====================
     VALIDATIONS
  ===================== */
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone: string) =>
    /^[0-9]{10}$/.test(phone);

  /* =====================
     SUBMIT HANDLER
  ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.age_range ||
      !form.profession
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPhone(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    trackLead(PRODUCT2, form)
    const transactionId = `${Date.now()}-${form.name.slice(0,5)}`;
    // SAVE DATA TO SESSION STORAGE AS BACKUP
    const userData = {
      transactionId: transactionId,
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      profession: form.profession,
      age_range: form.age_range,
      workshop: `${WEBINAR_NAME_2} FB`,
    };
    sessionStorage.setItem("user_details", JSON.stringify(userData));

    // Construct Query Parameters to pass data to OTO page
    const query = new URLSearchParams({
      // utm_source: "facebook",
      // utm_campaign: "wristwatch_workshop",
      ...getUTMParams(),
      transaction_id: transactionId,
    }).toString();


    trackAddToCart(PRODUCT2)
    // Redirect to OTO Page (Data is sent to sheet from there)
    window.location.href = `/oto-watch-fb?${query}`;
  };

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/horoscope.svg')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <div className="text-left md:text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                WAQT WAQT KI BAAT HAI!!!
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-xl">
                Aapki Watch Sirf Time Nahi Dikhati…  
                Woh Aapki Life Ki Direction Bhi Batati Hai.
              </p>
            </div>

            <div className="bg-[#111] rounded-2xl max-w-md mx-auto shadow-xl p-4">
              <img
                src="/coach3.webp"
                alt="Ankiit Btra"
                className="w-full h-[300px] object-contain"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-yellow-400">Ankiit Btra</h3>
                <p className="text-sm text-white/70 font-bold">Energy • Identity • Alignment</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Detail icon={<Calendar />} label="Date" value={eventDate} />
              <Detail icon={<Clock />} label="Time" value={eventTime} />
              <Detail icon={<Globe />} label="Language" value="Hindi" />
              <Detail icon={<Video />} label="Venue" value="Online" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full text-black" id="register">
              <h3 className="text-2xl font-bold text-center mb-6">Fill Your Details</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input label="Full Name *" name="name" type="text" value={form.name} onChange={handleChange} />
                <Input label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} />
                <Input label="Phone Number *" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                <Select label="Age *" name="age_range" value={form.age_range} onChange={handleChange}>
                  <option value="not_selected">Select Age Range</option>
                  <option value="below_18">Below 18</option>
                  <option value="18_24">18-24</option>
                  <option value="25_34">25–34</option>
                  <option value="35_44">35–44</option>
                  <option value="45_above">45 & Above</option>
                </Select>
                <Select label="Profession *" name="profession" value={form.profession} onChange={handleChange}>
                  <option value="not_selected">Select Profession</option>
                  <option value="business_owner">Business Owner / Entrepreneur</option>
                  <option value="working_professional">Working Professional (Job)</option>
                  <option value="student">Student</option>
                  <option value="freelancer">Freelancer / Self-Employed</option>
                  <option value="homemaker">Homemaker</option>
                </Select>
                <SubscribeButton
                  label={loading ? "Redirecting..." : "FREE Wristwatch Workshop"}
                  ctaLocation="hero_section_watch"
                  onClick={() => {
                    if (!loading) {
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      handleSubmit(fakeEvent);
                    }
                  }}
                  className={`w-full mt-4 bg-[#F4C063] hover:bg-[#eab14f] text-black font-bold py-4 rounded-xl text-lg transition flex items-center justify-center ${
                    loading ? "opacity-60 pointer-events-none" : ""
                  }`}
                />
              </form>
            </div>
            <div className="max-w-md text-left mt-6 space-y-4">
              <p className="text-sm text-white leading-relaxed font-bold">
                Decode the hidden energy behind your wristwatch with India’s ONLY Trusted Numerologist —{" "}
                <span className="text-yellow-400 font-semibold">Ankiit Btra</span>.
              </p>
              <div className="flex justify-center gap-6 text-xs font-semibold text-white/70">
                <span>⏳ Limited Slots</span>
                <span>🔥 High Demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Reusable Components ---------- */
const Detail = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; }) => (
  <div className="flex items-center gap-3 bg-[#111] rounded-xl p-3 border border-white">
    <div className="text-yellow-400">{icon}</div>
    <div>
      <p className="text-xs text-white/60">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);

const Input = ({ label, name, value, onChange, type}: { label: string; name: string; value: string; type: string; onChange: React.ChangeEventHandler<HTMLInputElement>; }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input
      type={type || "text"}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
);

const Select = ({ label, name, value, onChange, children }: { label: string; name: string; value: string; onChange: React.ChangeEventHandler<HTMLSelectElement>; children: React.ReactNode; }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      {children}
    </select>
  </div>
);