"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { ProcessedTestimonial } from "../page";

const TestimonialsCarousel: React.FC<{ testimonials: ProcessedTestimonial[] }> = ({ testimonials }) => {
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
        {testimonials.map((testimony, idx) => (
          <div key={idx} className="keen-slider__slide px-6 text-center">
            {/* Render the document content */}
            <div className="text-lg italic mb-4">
              <DocumentRenderer document={testimony.content} />
            </div>
            <p className="font-semibold">— {testimony.title}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="d-flex justify-content-center">
        {testimonials.map((_, idx) => (
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
