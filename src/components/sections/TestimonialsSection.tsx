import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

/* 🎥 VIDEO TESTIMONIALS */
const videoTestimonials = [
  { id: 'nv9kB5IepFQ', title: 'Real Experience After Workshop' },
  { id: 'JBnmZUtcW88', title: 'Live Student Feedback' },
  { id: 'xcCX-IvRtWU', title: 'Numerology Results Shared' },
  { id: 'kX513ckG4cw', title: 'Transformation Story' },
  { id: 'm6TgnHVxW_s', title: 'Client Success Journey' },
];

/* ✍️ TEXT TESTIMONIALS */
const testimonials = [
  {
    name: 'Rajat M',
    text: 'Pehle lagta tha meditation sirf shanti ke liye hota hai. Ab clarity mil rahi hai.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    text: 'Webinar ke baad samajh aaya numerology sach mein kaam karti hai.',
    rating: 4,
  },
  {
    name: 'Neha Sharma',
    text: 'Name correction ke baad 1 month mein 2 new clients mile.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    text: 'Workshop ke baad revenue 40% badh gaya.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  /* VIDEO SLIDER */
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);

  /* TEXT SLIDER */
  const [textIndex, setTextIndex] = useState(0);
  const [textPaused, setTextPaused] = useState(false);

  /* AUTO SCROLL – VIDEO */
  useEffect(() => {
    if (videoPaused) return;
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videoTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [videoPaused]);

  /* AUTO SCROLL – TEXT */
  useEffect(() => {
    if (textPaused) return;
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [textPaused]);

  return (
    <section className="py-8 md:py-14 bg-muted/50">
      <div className="container">

        {/* ================= VIDEO TESTIMONIALS ================= */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-6">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-2">
              Video Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl font-philosopher font-bold">
              More Than 20,000 People Love Our Course 
              <span className='text-primary'>  Here Is What They Are Saying :-</span>
            </h2>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setVideoPaused(true)}
            onMouseLeave={() => setVideoPaused(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${videoIndex * 100}%)` }}
              >
                {videoTestimonials.map((video, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-3">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-2xl overflow-hidden shadow-lg bg-black"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-600 ml-1">
                            <path d="M8 5v14l11-7z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white text-sm font-semibold">
                          {video.title}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEO NAV */}
            <div className="flex justify-center gap-2 mt-4">
              {videoTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVideoIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === videoIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= TEXT TESTIMONIALS ================= */}
        <div className="max-w-4xl mx-auto">
          
          <div
            className="relative"
            onMouseEnter={() => setTextPaused(true)}
            onMouseLeave={() => setTextPaused(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${textIndex * 100}%)` }}
              >
                {testimonials.map((t, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-3">
                    <div className="bg-card rounded-2xl p-5 md:p-6 shadow-lg">
                      <Quote className="h-8 w-8 text-secondary/30 mb-3" />
                      <p className="mb-4 leading-relaxed">“{t.text}”</p>
                      <p className="font-bold">{t.name}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < t.rating
                                ? 'text-secondary fill-secondary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TEXT NAV */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={() => setTextIndex((p) => (p - 1 + testimonials.length) % testimonials.length)}>
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTextIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === textIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              <button onClick={() => setTextIndex((p) => (p + 1) % testimonials.length)}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
