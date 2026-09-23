
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useGetTestimonialsQuery } from "@/src/redux/features/testimonial/testimonialApi";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 0.97,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const contentVariants: Variants = {
  enter: {
    opacity: 0,
    y: 15,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Testimonials() {
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useGetTestimonialsQuery();

  const publishedTestimonials = testimonials
    .filter((testimonial) => testimonial.isPublished !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const activeTestimonial = publishedTestimonials[activeIndex];

  /*
   * Keep active index valid when API data changes.
   */
  useEffect(() => {
    if (
      publishedTestimonials.length > 0 &&
      activeIndex >= publishedTestimonials.length
    ) {
      setActiveIndex(0);
    }
  }, [publishedTestimonials.length, activeIndex]);

  /*
   * Auto slide
   * 5 seconds per testimonial.
   */
  useEffect(() => {
    if (
      publishedTestimonials.length <= 1 ||
      isPaused ||
      !activeTestimonial
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setDirection(1);

      setActiveIndex(
        (current) => (current + 1) % publishedTestimonials.length
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    activeTestimonial,
    isPaused,
    publishedTestimonials.length,
  ]);

  const goNext = () => {
    if (publishedTestimonials.length <= 1) return;

    setDirection(1);

    setActiveIndex(
      (current) => (current + 1) % publishedTestimonials.length
    );
  };

  const goPrevious = () => {
    if (publishedTestimonials.length <= 1) return;

    setDirection(-1);

    setActiveIndex(
      (current) =>
        (current - 1 + publishedTestimonials.length) %
        publishedTestimonials.length
    );
  };

  const goTo = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const renderStars = (rating = 5) => {
    const safeRating = Math.min(Math.max(rating, 0), 5);

    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        strokeWidth={1.6}
        fill={index < safeRating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        py-10
        md:py-14
        lg:py-18
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-500/[0.025]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-500/[0.02]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.015]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              var(--foreground) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              var(--foreground) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "90px 90px",
        }}
      />

      <div className="container-main relative">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={containerVariants}
          className="
            grid
            gap-8
            lg:grid-cols-[0.65fr_1.35fr]
            lg:gap-20
          "
        >
          {/* Label */}

          <motion.div variants={itemVariants}>
            <span
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.25em]
                text-cyan-500
              "
            >
              - Testimonials
            </span>
          </motion.div>

          {/* Heading */}

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-[var(--muted)]">
              <Sparkles size={15} />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                "
              >
                Client Stories
              </span>
            </div>

            <h2
              className="
                mt-5
                max-w-5xl
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.065em]
                text-[var(--foreground)]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              Words that
              <br />

              <span className="text-[var(--muted)]">
                speak for the work.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-[var(--muted)]
                md:text-lg
              "
            >
              A few thoughts from clients and collaborators
              who have experienced the creative process firsthand.
            </p>
          </motion.div>
        </motion.div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {isLoading && (
          <div
            className="
              mt-16
              overflow-hidden
              rounded-[32px]
              border
              border-[var(--border)]
              bg-[var(--card)]
            "
          >
            <div className="grid lg:grid-cols-[0.42fr_1fr]">
              <div
                className="
                  min-h-[380px]
                  animate-pulse
                  border-b
                  border-[var(--border)]
                  bg-[var(--foreground)]/[0.02]
                  lg:border-b-0
                  lg:border-r
                "
              />

              <div className="min-h-[380px] animate-pulse p-8 lg:p-14">
                <div className="h-5 w-24 rounded-full bg-[var(--border)]" />

                <div className="mt-10 h-8 w-full rounded-lg bg-[var(--border)]" />

                <div className="mt-4 h-8 w-4/5 rounded-lg bg-[var(--border)]" />
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR
        ====================================================== */}

        {isError && !isLoading && (
          <div
            className="
              mt-16
              rounded-[32px]
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-12
              text-center
            "
          >
            <p className="text-sm text-[var(--muted)]">
              Unable to load testimonials right now.
            </p>
          </div>
        )}

        {/* =====================================================
            EMPTY
        ====================================================== */}

        {!isLoading &&
          !isError &&
          publishedTestimonials.length === 0 && (
            <div
              className="
                mt-16
                rounded-[32px]
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-12
                text-center
              "
            >
              <p className="text-sm text-[var(--muted)]">
                Client testimonials will be available soon.
              </p>
            </div>
          )}

        {/* =====================================================
            TESTIMONIAL
        ====================================================== */}

        {!isLoading &&
          !isError &&
          activeTestimonial && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              variants={itemVariants}
              className="mt-16"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Main Card */}

              <div
                className="
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  shadow-[0_20px_70px_rgba(0,0,0,0.035)]
                "
              >
                <div
                  className="
                    grid
                    lg:grid-cols-[0.42fr_1fr]
                  "
                >
                  {/* =================================================
                      CLIENT IMAGE
                  ================================================== */}

                  <div
                    className="
                      relative
                      flex
                      min-h-[360px]
                      items-center
                      justify-center
                      overflow-hidden
                      border-b
                      border-[var(--border)]
                      bg-[var(--foreground)]/[0.025]
                      p-8
                      lg:min-h-[540px]
                      lg:border-b-0
                      lg:border-r
                    "
                  >
                    {/* Simple decorative frame */}

                    <div
                      className="
                        absolute
                        inset-6
                        rounded-[24px]
                        
                        opacity-60
                        lg:inset-8
                      "
                    />

                    {/* Quote */}

                    <div
                      className="
                        absolute
                        left-7
                        top-7
                        z-20
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--border)]
                        bg-[var(--card)]
                        text-[var(--foreground)]
                        md:left-9
                        md:top-9
                      "
                    >
                      <Quote
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Client Image */}

                    <AnimatePresence
                      mode="wait"
                      custom={direction}
                    >
                      <motion.div
                        key={activeTestimonial._id}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="
                          relative
                          z-10
                          h-40
                          w-40
                          overflow-hidden
                          rounded-full
                          
                          border-[var(--border)]
                          bg-[var(--card)]
                          p-1.5
                          shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                          md:h-48
                          md:w-48
                        "
                      >
                        {activeTestimonial.avatar?.url ? (
                          <img
                            src={activeTestimonial.avatar.url}
                            alt={activeTestimonial.name}
                            className="
                              h-full
                              w-full
                              rounded-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              rounded-full
                              bg-[var(--foreground)]
                              text-5xl
                              font-medium
                              text-[var(--background)]
                            "
                          >
                            {activeTestimonial.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Client Name */}

                    <div
                      className="
                        absolute
                        bottom-7
                        left-7
                        right-7
                        flex
                        items-end
                        justify-between
                        md:bottom-9
                        md:left-9
                        md:right-9
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-[var(--subtle)]
                          "
                        >
                          Client
                        </p>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-medium
                            text-[var(--foreground)]
                          "
                        >
                          {activeTestimonial.name}
                        </p>
                      </div>

                      <div
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          text-[var(--subtle)]
                        "
                      >
                        {String(activeIndex + 1).padStart(2, "0")}
                        {" / "}
                        {String(
                          publishedTestimonials.length
                        ).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div
                    className="
                      flex
                      min-h-[540px]
                      flex-col
                      justify-between
                      p-7
                      md:p-10
                      lg:p-14
                      xl:p-16
                    "
                  >
                    <AnimatePresence
                      mode="wait"
                      custom={direction}
                    >
                      <motion.div
                        key={activeTestimonial._id}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        {/* Rating */}

                        <div className="flex items-center gap-4">
                          <div
                            className="
                              flex
                              gap-1
                              text-yellow-200
                            "
                          >
                            {renderStars(
                              activeTestimonial.rating
                            )}
                          </div>

                          <span
                            className="
                              h-1
                              w-1
                              rounded-full
                              bg-[var(--border-strong)]
                            "
                          />

                          <span
                            className="
                              text-[10px]
                              uppercase
                              tracking-[0.18em]
                              text-[var(--muted)]
                            "
                          >
                            {activeTestimonial.rating || 5}.0 / 5
                          </span>
                        </div>

                        {/* Message */}

                        <div className="mt-10">
                          <span
                            className="
                              block
                              text-6xl
                              font-medium
                              leading-none
                              text-[var(--muted)]
                              opacity-25
                            "
                          >
                            “
                          </span>

                          <p
                            className="
                              -mt-5
                              max-w-4xl
                              text-3xl
                              font-medium
                              leading-[1.08]
                              tracking-[-0.045em]
                              text-[var(--foreground)]
                              md:text-4xl
                              lg:text-5xl
                              xl:text-6xl
                            "
                          >
                            {activeTestimonial.message}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom */}

                    <div className="mt-14">
                      <div
                        className="
                          border-t
                          border-[var(--border)]
                          pt-7
                        "
                      >
                        <div
                          className="
                            flex
                            flex-col
                            gap-7
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                          "
                        >
                          {/* Client */}

                          <div>
                            <p
                              className="
                                text-lg
                                font-medium
                                tracking-[-0.02em]
                                text-[var(--foreground)]
                              "
                            >
                              {activeTestimonial.name}
                            </p>

                            <p
                              className="
                                mt-1.5
                                text-sm
                                text-[var(--muted)]
                              "
                            >
                              {[
                                activeTestimonial.role,
                                activeTestimonial.company,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          </div>

                          {/* Navigation */}

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={goPrevious}
                              aria-label="Previous testimonial"
                              className="
                                group
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[var(--border)]
                                text-[var(--foreground)]
                                transition-all
                                duration-300
                                hover:-translate-x-0.5
                                hover:bg-[var(--foreground)]
                                hover:text-[var(--background)]
                              "
                            >
                              <ArrowLeft
                                size={16}
                                strokeWidth={1.7}
                              />
                            </button>

                            <button
                              type="button"
                              onClick={goNext}
                              aria-label="Next testimonial"
                              className="
                                group
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[var(--border)]
                                text-[var(--foreground)]
                                transition-all
                                duration-300
                                hover:translate-x-0.5
                                hover:bg-[var(--foreground)]
                                hover:text-[var(--background)]
                              "
                            >
                              <ArrowRight
                                size={16}
                                strokeWidth={1.7}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  BOTTOM CONTROLS
              ====================================================== */}

              {publishedTestimonials.length > 1 && (
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                  "
                >
                  {/* Dots */}

                  <div className="flex items-center gap-2">
                    {publishedTestimonials.map(
                      (testimonial, index) => (
                        <button
                          key={testimonial._id}
                          type="button"
                          onClick={() => goTo(index)}
                          aria-label={`View testimonial ${
                            index + 1
                          }`}
                          className="
                            flex
                            h-6
                            items-center
                          "
                        >
                          <span
                            className={`
                              block
                              h-1.5
                              rounded-full
                              transition-all
                              duration-500
                              ${
                                index === activeIndex
                                  ? "w-10 bg-[var(--foreground)]"
                                  : "w-2 bg-[var(--border-strong)] hover:w-5 hover:bg-[var(--muted)]"
                              }
                            `}
                          />
                        </button>
                      )
                    )}
                  </div>

                  {/* Auto-slide status */}

                  <div
                    className="
                      hidden
                      items-center
                      gap-3
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-[var(--subtle)]
                      sm:flex
                    "
                  >
                    <span>
                      {isPaused
                        ? "Paused"
                        : "Auto play"}
                    </span>

                    <span className="h-px w-5 bg-[var(--border)]" />

                    <span>
                      {String(activeIndex + 1).padStart(
                        2,
                        "0"
                      )}
                      {" / "}
                      {String(
                        publishedTestimonials.length
                      ).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
      </div>
    </section>
  );
}
 
