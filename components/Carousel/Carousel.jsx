'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

const AUTOPLAY_MS = 5000;

export default function Carousel({ slides = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      const total = slides.length;
      setActiveIndex(((index % total) + total) % total);
    },
    [slides.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return undefined;
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, slides.length]);

  if (!slides.length) return null;

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Featured banking offers"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          aria-live="polite"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <figure key={slide.id} className={styles.slide} aria-hidden={index !== activeIndex}>
              <img
                src={slide.image}
                alt={slide.alt}
                className={styles.slideImage}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <figcaption className={styles.caption}>
                <h2 className={styles.captionHeading}>{slide.heading}</h2>
                <p className={styles.captionSub}>{slide.subheading}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goPrev} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={goNext} aria-label="Next slide">
        ›
      </button>

      <div className={styles.dots} role="tablist" aria-label="Choose slide">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show slide ${index + 1}: ${slide.heading}`}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
