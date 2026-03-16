import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Whether this science works on not?',
    answer: 'Yes, it works because your name holds a unique numerological energy that shapes your life. At The Batraa Numerology (TBN), we align names with numbers to boost luck and success.',
  },
  {
    question: 'Whether Recordings will be Provided? ',
    answer: 'Recordings will not be provided. It will be a Live 2-3 hours beginner friendly session, so don’t miss it.',
  },
  {
    question: 'Is this live workshop or recorded?',
    answer: 'This is a LIVE Workshop designed to help you Analyse your Life Patterns affected by your Name.',
  },
  {
    question: 'How will the workshop be conducted?',
    answer: 'The Workshop will be Conducted on Zoom. So Please make sure you are ready by downloading Zoom on your Phone/Laptop or whichever device you use.',
  },
  {
    question: 'Whether I will be able to learn this science?',
    answer: 'You will be able to understand the Basics of Name Numerology and how your Name is Impacting your Life.',
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#04343b]">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-philosopher font-bold text-background mb-2">
            FAQs
          </h2>
          <p className="text-muted">Got questions? We've got answers.</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-muted/10 rounded-xl border-none px-6"
              >
                <AccordionTrigger className="text-background hover:no-underline text-left font-semibold py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted pb-5">
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
