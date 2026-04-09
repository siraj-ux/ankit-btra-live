import { useEffect, useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Calendar, Clock, Globe, Video, Star } from "lucide-react";
import { ScrollZodiac } from "@/components/sections/ScrollZodiac";
import { Link } from "react-router-dom";
import SubscribeButton from "@/components/SubscribeButton";
import {  DISCOUNTED_PRICE, OTO_OG_PRICE, OTO_DISCOUNTED_PRICE } from '@/utils/product-info';

/** ✅ Your published CSV url */
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVeDQWx-YmpXyEWEDUd4QGndsnGwymqcMj7dzGqilpRng7oysfqqtPdhDJYavMzFuY-uCrDCkF-CwS/pub?gid=1706335492&single=true&output=csv";

/** Small CSV parser that handles commas + quotes */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && next === '"') {
      cell += '"';
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++; // handle CRLF
      row.push(cell.trim());
      cell = "";
      if (row.some((v) => v.length > 0)) rows.push(row);
      row = [];
      continue;
    }

    cell += char;
  }

  // last cell
  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((v) => v.length > 0)) rows.push(row);
  }

  return rows;
}

export const HeroSection = () => {
  const [webinarDate, setWebinarDate] = useState<string>("29th & 30th January");
  const [webinarTime, setWebinarTime] = useState<string>("8 PM - 10 PM");
  const [loadingSheet, setLoadingSheet] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDateTime() {
      try {
        setLoadingSheet(true);

        // cache-bust so Google/Browser doesn’t show old CSV
        const res = await fetch(`${SHEET_CSV_URL}&_ts=${Date.now()}`, {
          method: "GET",
        });

        if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
        const csvText = await res.text();

        const table = parseCSV(csvText);
        if (table.length < 2) throw new Error("CSV has no data rows");

        const headers = table[0].map((h) => h.trim().toLowerCase());
        const row1 = table[1];

        const dateIdx = headers.indexOf("date");
        const timeIdx = headers.indexOf("time");

        const dateVal =
          dateIdx >= 0 && row1[dateIdx] ? row1[dateIdx].trim() : "";
        const timeVal =
          timeIdx >= 0 && row1[timeIdx] ? row1[timeIdx].trim() : "";

        if (!cancelled) {
          if (dateVal) setWebinarDate(dateVal);
          if (timeVal) setWebinarTime(timeVal);
        }
      } catch (err) {
        // Keep fallback values if fetch fails
        console.error("Failed to load sheet date/time:", err);
      } finally {
        if (!cancelled) setLoadingSheet(false);
      }
    }

    loadDateTime();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#04343b] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none"
        style={{ backgroundImage: "url('/bg3.jpg')" }}
        aria-hidden="true"
      />

      <ScrollZodiac />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl">✧</div>
        <div className="absolute top-40 right-20 text-4xl">☆</div>
        <div className="absolute bottom-40 left-20 text-5xl">⚝</div>
        <div className="absolute top-60 right-40 text-3xl">✦</div>
        <div className="absolute bottom-20 right-10 text-6xl">✧</div>
      </div>

      <div className="container relative pt-8 pb-6 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="text-white space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>
                Live 2-Day Masterclass
                {loadingSheet ? " • updating…" : ""}
              </span>
            </div>

            <h1 className="text-4xl md:text-4xl lg:text-5xl font-philosopher font-bold leading-tight">
              Aapka Naam Aapka{" "}
              <span className="text-yellow-400">Future Bana Raha</span> Hai Ya{" "}
              <span className="text-yellow-400">Bigaad Raha Hai ?</span>
            </h1>

            <p className="text-lg md:text-xl font-semibold text-white/90">
              You are doing everything right, but still feel stuck?
            </p>

            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0">
              Learn if your name&apos;s frequency is helping or blocking your
              financial and love life success
            </p>

            {/* Webinar Details */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Date</p>
                  <p className="font-semibold text-sm">{webinarDate}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Time</p>
                  <p className="font-semibold text-sm">{webinarTime}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                <Globe className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Language</p>
                  <p className="font-semibold text-sm">Hindi</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                <Video className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                  <p className="text-xs text-white/70">Venue</p>
                  <p className="font-semibold text-sm">Online</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – MENTOR CARD */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-xl max-w-md mx-auto overflow-hidden">
              <img
                src="./coach2.webp"
                alt="Ankiit Btra - India's Top Numerologist"
                className="w-full h-[400px] md:h-[420px] object-cover"
                loading="lazy"
              />

              <div className="p-2 text-center">
                <h3 className="text-2xl font-extrabold text-gray-900">
                  ANKIIT BTRA
                </h3>

                <p className="text-sm font-semibold text-gray-600 mt-1 uppercase">
                  India’s Top Numerologist
                </p>

                <div className="w-12 h-1 bg-[#04343B] mx-auto my-4 rounded-full" />

                {/* <Link to="/oto-ga">
                  <button
                    className="
                      w-full
                      bg-[#FEA116]
                      hover:bg-[#FEA116]
                      text-white
                      font-bold
                      py-4
                      rounded-xl
                      text-lg
                      transition-all
                      duration-300
                      shadow-lg
                    "
                  >
                    Reserve Your Seat @ ₹99
                  </button>
                </Link> */}
                <Link to="/oto-ga">
                <SubscribeButton
                  className="
                    w-full
                    bg-[#FEA116]
                    hover:bg-[#FEA116]
                    text-white
                    font-bold
                    py-4
                    rounded-xl
                    text-lg
                    transition-all
                    duration-300
                    shadow-lg
                  "
                  label={`Reserve Your Seat @ ${DISCOUNTED_PRICE}`}
                  ctaLocation="hero-section"
                />
              </Link>

                <div className="flex justify-center mt-4">
                  <CountdownTimer />
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Limited seats • Live 2-Day Masterclass
                </p>
              </div>
            </div>
          </div>

          {/* Mobile trust logos */}
          <div className="flex items-center justify-center lg:justify-start gap-4 lg:hidden">
            <img src="/ted.png" alt="TEDx Speaker" className="h-6" />
            <img src="/iso.png" alt="ISO Certified" className="h-7" />
          </div>
        </div>
      </div>
    </section>
  );
};
