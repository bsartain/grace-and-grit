"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const TestimonialsCarousel: React.FC<{ testimonials: any }> = ({ testimonials }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 2,
      spacing: 16,
    },
  });

  return (
    <div className="max-w-xl mx-auto">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((t: any, idx: number) => (
          <div key={idx} className="keen-slider__slide px-6 text-center">
            <p className="text-lg italic mb-4">{t.testimonialText}</p>
            <p className="font-semibold">— {t.testimonialName}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="d-flex justify-content-center">
        {testimonials.map((_: any, idx: number) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className="h-3 w-3 rounded-full bg-gray-300 mt-5"
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
