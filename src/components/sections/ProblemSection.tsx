import { AlertCircle, TrendingDown, Heart, Frown } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    title: 'Money Blocks',
    description: 'Working hard but income stays stagnant? Your name frequency might be blocking wealth.',
  },
  {
    icon: Heart,
    title: 'Relationship Issues',
    description: 'Facing constant misunderstandings or delays in marriage/love life?',
  },
  {
    icon: Frown,
    title: 'Career Stagnation',
    description: 'Stuck in the same position while others get promoted easily?',
  },
  {
    icon: AlertCircle,
    title: 'Health & Energy',
    description: 'Chronic fatigue, stress, or unexplained health issues despite a healthy lifestyle?',
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-destructive/10 text-destructive px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Sound Familiar?
          </span>
          <h2 className="text-3xl md:text-4xl font-philosopher font-bold text-foreground mb-4">
            Sab kuch sahi kar rahe ho....{' '}
            <span className="text-primary">phir bhi universe cooperate nahi kar raha ?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hidden reason: tumhare NAME ki numerology frequency match hi nahi ho rahi
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
