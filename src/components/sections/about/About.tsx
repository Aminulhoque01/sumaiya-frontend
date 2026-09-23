"use client";

import { useGetProfileQuery } from "@/src/redux/features/profile/profileApi";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function About() {
  const { data: profile, isLoading } = useGetProfileQuery();

  const name = profile?.name || "Sumaiya Haque";

  const title =
    profile?.title ||
    "Graphic Designer & Visual Creative";

  const bio =
    profile?.bio ||
    "I am a passionate graphic designer who creates meaningful visual identities and engaging digital experiences for modern brands.";

  const experience =
    profile?.yearsOfExperience || 4;

  const image =
    profile?.profileImage?.url;

  const scrollToContact = () => {
    document
      .querySelector("#contact")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--background)]
        text-[var(--foreground)]
        transition-colors
        duration-500
        py-20
        md:py-32
        lg:py-15
      "
    >
      <div className="container-main">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="
            mb-14
            flex
            flex-col
            items-center
            justify-center
            md:mb-15
          "
        >
          <h2
            className="
              text-center
              text-sm
              font-medium
               
              tracking-[0.3em]
              text-[var(--foreground)]
              md:text-base
            "
          >
            About Me
          </h2>

          {/* Small Cyan Line */}
          <span
            className="
              mt-3
              h-[2px]
              w-10
              rounded-full
              bg-cyan-400
              shadow-[0_0_12px_rgba(34,211,238,0.5)]
            "
          />
        </motion.div>

        {/* =========================
            MAIN ABOUT GRID
        ========================== */}
        <div
          className="
            grid
            items-start
            gap-12
            lg:grid-cols-[0.82fr_1.18fr]
            lg:gap-20
            xl:grid-cols-[0.8fr_1.2fr]
            xl:gap-28
          "
        >

          {/* =====================
              LEFT IMAGE
          ====================== */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              relative
              w-full
              max-w-[520px]
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-[2rem]
                bg-[var(--card)]
              "
            >
              {image ? (
                <motion.img
                  src={image}
                  alt={name}
                  loading="lazy"
                  initial={{
                    scale: 1.08,
                  }}
                  whileInView={{
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-sm
                    text-[var(--muted)]
                  "
                >
                  {isLoading
                    ? "Loading..."
                    : "No profile image"}
                </div>
              )}

              {/* Image Overlay */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/35
                  via-transparent
                  to-transparent
                "
              />

              {/* Image Bottom Info */}
              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  flex
                  items-end
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/65
                    "
                  >
                    Visual Creative
                  </p>

                  <p
                    className="
                      mt-1
                      text-xl
                      font-medium
                      tracking-[-0.04em]
                      text-white
                    "
                  >
                    {name}
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/30
                    bg-black/10
                    text-white
                    backdrop-blur-sm
                  "
                >
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                  />
                </div>
              </div>
            </div>

             
          </motion.div>

          {/* =====================
              RIGHT CONTENT
          ====================== */}
          <div className="pt-1 lg:pt-3">

            {/* Small Label */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[var(--muted)]
              "
            >
              <Sparkles size={13} />
              Who I am
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                mt-7
                max-w-[800px]
                text-[clamp(3rem,6vw,6.5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.075em]
              "
            >
              Turning ideas into
              <br />

              <span
                className="
                  font-normal
                  italic
                  text-[var(--foreground)]/[0.58]
                "
              >
                visual stories.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="
                mt-9
                max-w-[620px]
              "
            >
              <p
                className="
                  text-base
                  leading-8
                  text-[var(--muted)]
                  md:text-lg
                  md:leading-9
                "
              >
                {bio}
              </p>
            </motion.div>

            {/* Secondary Text */}
            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="
                mt-6
                max-w-[560px]
                text-sm
                leading-7
                text-[var(--subtle)]
              "
            >
              I believe great design should feel
              intentional, communicate clearly and
              leave a lasting impression. From brand
              identity to digital experiences, every
              detail has a purpose.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="mt-9"
            >
              <button
                type="button"
                onClick={scrollToContact}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[var(--foreground)]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-[var(--background)]
                  transition-all
                  duration-300
                  hover:gap-4
                  hover:scale-[1.02]
                "
              >
                Let's work together

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </motion.div>

            {/* =====================
                STATS
            ====================== */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                mt-8
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >
              {/* EXPERIENCE */}
              <div
                className="
                  group
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[var(--border-strong)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--subtle)]
                    "
                  >
                    Experience
                  </span>

                  <span
                    className="
                      text-[var(--subtle)]
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="mt-7">
                  <span
                    className="
                      text-4xl
                      font-medium
                      tracking-[-0.07em]
                    "
                  >
                    {experience}+
                  </span>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    Years Experience
                  </p>
                </div>
              </div>

              {/* PROJECTS */}
              <div
                className="
                  group
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[var(--border-strong)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--subtle)]
                    "
                  >
                    Projects
                  </span>

                  <span
                    className="
                      text-[var(--subtle)]
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="mt-7">
                  <span
                    className="
                      text-4xl
                      font-medium
                      tracking-[-0.07em]
                    "
                  >
                    500+
                  </span>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    Projects Completed
                  </p>
                </div>
              </div>

              {/* CLIENTS */}
              <div
                className="
                  group
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[var(--border-strong)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--subtle)]
                    "
                  >
                    Clients
                  </span>

                  <span
                    className="
                      text-[var(--subtle)]
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="mt-7">
                  <span
                    className="
                      text-4xl
                      font-medium
                      tracking-[-0.07em]
                    "
                  >
                    50+
                  </span>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    Happy Clients
                  </p>
                </div>
              </div>
            </motion.div>

             
             
          </div>
        </div>
      </div>
    </section>
  );
}