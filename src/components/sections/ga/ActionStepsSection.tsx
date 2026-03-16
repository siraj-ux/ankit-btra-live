import { Target, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const actions = [
  {
    icon: Target,
    title: 'Name Diagnosis',
    description: 'Get the exact calculation of your name frequency and its impact',
  },
  {
    icon: Sparkles,
    title: 'Personalized Remedies',
    description: 'Specific fixes for money blocks, career stagnation, or love issues',
  },
  {
    icon: Zap,
    title: 'Quick Wins',
    description: 'Switchwords, rituals & remedies you can apply the same day',
  },
];

interface ActionStepsSectionProps {
  onCTAClick: () => void;
}

export const ActionStepsSection = ({ onCTAClick }: ActionStepsSectionProps) => {
  return (
    <section className="relative py-10 md:py-16 bg-white overflow-hidden">
      <div className="container relative z-10">

        {/* STANDOUT FLOATING CARD */}
        <div className="relative mx-auto max-w-6xl rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(1,40,64,0.45)]">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/result.jpg')" }}
            aria-hidden="true"
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-[#012840]/20 backdrop-blur-xs" />

          {/* Content */}
          <div className="relative text-white px-6 py-10 md:px-12 md:py-14 border border-white/10 rounded-3xl">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Practical Results
              </span>

              <h2 className="text-3xl md:text-4xl font-philosopher font-bold leading-tight">
                This Is NOT Just "Gyaan" —{' '}
                <span className="text-yellow-400">You'll Get Action Steps</span>
              </h2>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {actions.map((action, index) => (
                <div
                  key={index}
                  className="
                    group
                    text-center
                    rounded-2xl
                    p-6
                    bg-white/10
                    border border-white/15
                    hover:border-yellow-400/40
                    transition-all duration-300
                    backdrop-blur-sm
                  "
                >
                  {/* ICON WITH REAL GLOW */}
                  <div className="relative w-14 h-14 mx-auto mb-4">

                    {/* Glow layer */}
                    <div
                      className="
                        absolute inset-0
                        rounded-2xl
                        bg-yellow-400/40
                        blur-xl
                        opacity-80
                        transition-all duration-300
                        group-hover:opacity-100
                        group-hover:blur-2xl
                      "
                    />

                    {/* Icon container */}
                    <div
                      className="
                        relative
                        w-14 h-14
                        rounded-2xl
                        gradient-gold
                        flex items-center justify-center
                        shadow-[0_0_35px_rgba(234,179,8,0.65)]
                      "
                    >
                      <action.icon className="h-7 w-7 text-secondary-foreground" />
                    </div>

                  </div>

                  <h3 className="font-bold text-lg mb-2">
                    {action.title}
                  </h3>

                  <p className="text-white/85 text-sm">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/oto-ga">
              <Button variant="gold" size="xl">
                Book Now @ ₹99
              </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
