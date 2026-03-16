import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faq = [
  {
    question: 'Kya mujhe nayi expensive watch buy karni padegi?',
    answer: 'Nahi. Alignment > Price. Mehngi watch zaroori nahi hoti — sahi energy alignment zyada important hai.',
  },
  {
    question: 'Ek session mein clarity mil jaati hai?',
    answer: 'Mostly yes. Ek session 90% logon ke liye kaafi hota hai clarity aur direction ke liye.',
  },
  {
    question: 'Agar mere paas watch hi nahi hai?',
    answer: 'Koi problem nahi. Ankiit aapki personality aur goals ke hisaab se sahi watch recommend karte hain.',
  },
  {
    question: 'Kya yeh superstition hai?',
    answer: 'Bilkul nahi. Yeh subconscious psychology + numerology + energy mapping ka ek modern aur practical blend hai.',
  },
];

export const FAQ = () => {
  return (
    <section className="py-6 md:py-10 bg-black">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            FAQs
          </h2>
          <p className="text-white/70">
            Common questions. Clear answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-white/10 bg-white/5 px-6"
              >
                <AccordionTrigger className="text-white hover:no-underline text-left font-semibold py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};