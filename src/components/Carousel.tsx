import { useEffect, useId, useState } from 'react';
import { Button } from './Button';
import { cn } from '../lib/cn';

export interface CarouselSlide {
  id: string;
  /** Short name of the slide, added to its position: "2 of 4: Linen shirt". */
  label?: string;
  content: React.ReactNode;
}

export interface CarouselProps {
  /** Accessible name of the carousel, e.g. "Featured products". */
  label: string;
  slides: CarouselSlide[];
  /**
   * Delay between automatic slide changes, in milliseconds. Leave undefined
   * for a carousel that only moves when the user asks, which is the safer
   * default.
   */
  autoPlayInterval?: number;
  className?: string;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Accessible carousel following the WAI-ARIA Carousel pattern.
 *
 * Accessibility notes:
 * - Previous and Next are real buttons with names, placed before the slides
 *   in the DOM so they are reached first (WCAG 4.1.2, 2.4.3).
 * - Only the current slide is rendered to assistive technology; each slide is
 *   a group announced with its position ("2 of 4").
 * - Without rotation, the slide area is a polite live region: the new slide
 *   is announced when the user changes it.
 * - With rotation, a Pause button comes first, rotation also pauses while the
 *   pointer or keyboard focus is inside, and it stops for good as soon as the
 *   user presses Previous or Next (2.2.2 Pause, Stop, Hide). The live region
 *   is switched off while slides rotate, so nothing interrupts the user.
 * - Rotation never starts when the user asks for reduced motion (2.3.3).
 */
export function Carousel({ label, slides, autoPlayInterval, className }: CarouselProps) {
  const slidesId = useId();
  const [index, setIndex] = useState(0);
  const canRotate = autoPlayInterval !== undefined && slides.length > 1;
  const [isPlaying, setIsPlaying] = useState(() => canRotate && !prefersReducedMotion());
  const [isHeld, setIsHeld] = useState(false);
  const isRotating = canRotate && isPlaying && !isHeld;

  useEffect(() => {
    if (!isRotating) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [isRotating, autoPlayInterval, slides.length]);

  const go = (step: number) => {
    setIsPlaying(false);
    setIndex((current) => (current + step + slides.length) % slides.length);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('flex flex-col gap-3', className)}
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={(event) => {
        // Focus moving between two controls of the carousel is not a leave.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsHeld(false);
      }}
    >
      <div className="flex items-center gap-2">
        {canRotate && (
          <Button variant="secondary" size="sm" onClick={() => setIsPlaying((playing) => !playing)}>
            {isPlaying ? 'Pause rotation' : 'Start rotation'}
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          iconOnlyLabel="Previous slide"
          aria-controls={slidesId}
          onClick={() => go(-1)}
        >
          <span aria-hidden="true">‹</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconOnlyLabel="Next slide"
          aria-controls={slidesId}
          onClick={() => go(1)}
        >
          <span aria-hidden="true">›</span>
        </Button>
      </div>

      <div id={slidesId} aria-live={isRotating ? 'off' : 'polite'}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}${slide.label ? `: ${slide.label}` : ''}`}
            hidden={slideIndex !== index}
          >
            {slide.content}
          </div>
        ))}
      </div>
    </section>
  );
}
