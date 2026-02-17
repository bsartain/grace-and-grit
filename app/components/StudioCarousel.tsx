"use client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Modal } from "react-bootstrap";
import "keen-slider/keen-slider.min.css";

interface CarouselSlide {
  readonly image: string | null;
  readonly heading: string;
  readonly subheading: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

const StudioCarousel: React.FC<{ slides: readonly CarouselSlide[] }> = ({ slides }) => {
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [carouselInfo, setCarouselInfo] = useState({
    image: "",
    heading: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [slidesLength, setSlidesLength] = useState(0); // Track total slides

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 5,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 5,
        },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setLoaded(true);
      setSlidesLength(slider.track.details.slides.length);
    },
  });

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {slides?.length > 0
            ? slides.map((slide, index: number) => {
                return (
                  <div
                    key={index}
                    className={`keen-slider__slide number-slide${index} studio-slide-background-image`}
                    style={{ backgroundImage: `url("${slide.image}")` }}
                    onClick={() => {
                      setShowCarouselModal(true);
                      setCarouselInfo({ image: slide.image ?? "", heading: slide.heading });
                    }}
                  />
                );
              })
            : null}
        </div>
        {loaded && (
          <>
            <Arrow
              left
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={currentSlide === slidesLength - 1}
            />
          </>
        )}
      </div>
      <Modal
        show={showCarouselModal}
        onHide={() => {
          setShowCarouselModal(false);
          setCarouselInfo({ image: "", heading: "" });
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{carouselInfo.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={carouselInfo.image} alt="Rock Hill Spin Studio" className="carousel-modal-image" />
        </Modal.Body>
      </Modal>
    </>
  );
};

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: React.MouseEvent) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}

export default StudioCarousel;
