import { CheckCircle, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

export const ThankYouPageOtoGa = () => {
  return (
    <section className="min-h-screen bg-[#04343b] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-philosopher font-bold text-[#04343b] mb-2">
          Upgrade Confirmed!
        </h1>

        {/* Sub Text */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for joining the <strong>Numerology Webinar (NNW)</strong> and
          upgrading to the <strong>Destiny Report</strong>.  
          You’ve just taken the fastest route to real results.
        </p>

        {/* Report Delivery Info */}
        <div className="bg-[#04343b]/5 border border-[#04343b]/10 rounded-xl p-4 mb-6 flex gap-3 items-start text-left">
          <FileText className="h-5 w-5 text-[#04343b] mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Your <strong>Destiny Report</strong> will be delivered shortly to
            your registered <strong>WhatsApp number</strong>.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://go.viralvigyapan.com/nnw"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            size="xl"
            className="
              w-full
              bg-green-500 hover:bg-green-600
              text-white
              font-bold
              rounded-xl
              flex items-center justify-center gap-2
              shadow-lg
            "
          >
            <MessageCircle className="h-5 w-5" />
            Join WhatsApp Group Now
            <ArrowRight className="h-5 w-5" />
          </Button>
        </a>

        {/* Trust Line */}
        <p className="text-xs text-gray-500 mt-4">
          Join the WhatsApp group to receive updates, reminders, and bonus guidance
        </p>

      </div>
    </section>
  );
};
