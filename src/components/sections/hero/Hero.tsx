 
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  Sparkles,
  MousePointer2,
  X,
} from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaBehance,
  FaFigma,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import { useGetProfileQuery } from "@/src/redux/features/profile/profileApi";

export default function Hero() {
  const { data: profile, isLoading } = useGetProfileQuery();

  // ============================================================
  // TYPING ROLE ANIMATION
  // ============================================================

  const roles = [
    "I'm a Graphic Designer",
    "I'm a Visual Designer",
    "I'm a Brand Designer",
    "I'm a Logo Designer",
    "I'm a Creative Designer",
    "I'm a Motion Graphic Designer",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(
            currentRole.slice(0, displayText.length + 1)
          );
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(
            displayText.slice(0, displayText.length - 1)
          );
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIndex(
          (prev) => (prev + 1) % roles.length
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // ============================================================
  // MOUSE PARALLAX
  // ============================================================

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 45,
    damping: 25,
    mass: 0.6,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 45,
    damping: 25,
    mass: 0.6,
  });

  const glowX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-45, 45]
  );

  const glowY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [-35, 35]
  );

  const glow2X = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [35, -35]
  );

  const glow2Y = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [25, -25]
  );

  const gridX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-12, 12]
  );

  const gridY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [-10, 10]
  );

  const particleX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-70, 70]
  );

  const particleY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [-50, 50]
  );

  // ============================================================
  // MOUSE MOVE
  // ============================================================

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ============================================================
  // PROFILE DATA
  // ============================================================

  const name = profile?.name || "Sumaiya Haque";

  const bio =
    profile?.shortBio ||
    "I craft modern, creative and impactful visuals that help brands stand out, connect with their audience, and communicate with confidence.";

  const image = profile?.profileImage?.url;

  const experience =
    profile?.yearsOfExperience;

  // ============================================================
  // DYNAMIC AVAILABILITY
  //
  // Backend example:
  //
  // {
  //   "availability": "Available for Freelance & Remote"
  // }
  //
  // ============================================================

  const availability =
    profile?.availability ||
    "Available for Freelance & Remote";

  // ============================================================
  // SCROLL
  // ============================================================

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ============================================================
  // SOCIAL ICONS
  // ============================================================

  const socialLinks = [
    {
      label: "Facebook",
      icon: FaFacebookF,
      href: "https://www.facebook.com/ms.sumaiyasiddiqa",
    },
    {
      label: "X",
      icon: X,
      href: "https://x.com/ms_siddiqa",
    },
    {
      label: "Behance",
      icon: FaBehance,
      href: "https://www.behance.net/sumaiyasiddiqa01",
    },
    {
      label: "LinkedIn",
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/sumaiya-siddiqa01/",
    },
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* =====================================================
          INTERACTIVE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Interactive Grid */}

        <motion.div
          style={{
            x: gridX,
            y: gridY,
          }}
          className="
            absolute
            -inset-20
            opacity-[0.035]
            [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

        {/* Left Glow */}

        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          className="
            absolute
            -left-[15%]
            top-[5%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-cyan-400/[0.035]
            blur-[130px]
          "
        />

        {/* Right Glow */}

        <motion.div
          style={{
            x: glow2X,
            y: glow2Y,
          }}
          className="
            absolute
            -right-[15%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-cyan-300/[0.025]
            blur-[140px]
          "
        />

        {/* Center Animated Aura */}

        <motion.div
          animate={{
            x: [0, 70, 0, -40, 0],
            y: [0, -40, 20, 0, 0],
            scale: [1, 1.08, 1.03, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[30%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-cyan-300/[0.018]
            blur-[110px]
          "
        />

        {/* Large Orbit */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[750px]
            w-[750px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[var(--foreground)]/[0.025]
          "
        />

        {/* Second Orbit */}

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[950px]
            w-[950px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border-dashed
            border
            border-[var(--foreground)]/[0.018]
          "
        />

        {/* Interactive Particles */}

        <motion.div
          style={{
            x: particleX,
            y: particleY,
          }}
          className="absolute inset-0"
        >
          <motion.span
            animate={{
              y: [0, -15, 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
              absolute
              left-[10%]
              h-1
              w-1
              rounded-full
              bg-cyan-300
            "
          />

          <motion.span
            animate={{
              y: [0, 20, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              left-[38%]
              top-[15%]
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-300
            "
          />

          <motion.span
            animate={{
              y: [0, -18, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
            }}
            className="
              absolute
              right-[20%]
              h-1
              w-1
              rounded-full
              bg-cyan-300
            "
          />

          <motion.span
            animate={{
              y: [0, 14, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
            }}
            className="
              absolute
              left-[18%]
              bottom-[25%]
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-300
            "
          />

          <motion.span
            animate={{
              y: [0, -12, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
            }}
            className="
              absolute
              right-[12%]
              bottom-[28%]
              h-1
              w-1
              rounded-full
              bg-cyan-300
            "
          />
        </motion.div>

        {/* Cross Decoration */}

        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          className="
            absolute
            left-[7%]
            opacity-20
          "
        >
          <span
            className="
              absolute
              left-1/2
              h-8
              w-px
              -translate-x-1/2
              bg-cyan-300
            "
          />

          <span
            className="
              absolute
              top-1/2
              h-px
              w-8
              -translate-y-1/2
              bg-cyan-300
            "
          />
        </motion.div>

        {/* Radial Vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_45%,transparent_0%,var(--background)_80%)]
            opacity-50
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          container-main
          relative
          z-10
          flex
          min-h-screen
          flex-col
          justify-center
          pb-12
          pt-28
          md:pt-32
        "
      >

        {/* =====================================================
            HERO GRID
        ====================================================== */}

        <div
          className="
            grid
            items-center
            gap-16
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-10
          "
        >

          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <div className="max-w-[720px]">

            {/* Greeting */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="
                mb-6
                pt-5
                text-sm
                font-semibold
                tracking-tight
                text-cyan-400
                md:text-base
              "
            >
              Hello, I'm {name}
            </motion.p>

            {/* Main Heading */}

            <div className="overflow-hidden">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(3.7rem,7vw,7.5rem)]
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.075em]
                "
              >
                <span className="block">
                  I Turn Ideas
                </span>

                <span className="block">
                  Into Visual
                </span>

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-cyan-300
                    via-sky-400
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Experiences.
                </span>
              </motion.h1>
            </div>

            {/* =================================================
                DYNAMIC ROLE
            ================================================== */}

            <div
              className="
                mt-8
                min-h-[38px]
                overflow-hidden
                md:mt-10
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                }}
              >
                <div className="flex min-h-[42px] items-center">

                  <h2
                    className="
                      text-xl
                      font-bold
                      tracking-[-0.03em]
                      text-[var(--foreground)]
                      md:text-2xl
                      lg:text-3xl
                    "
                  >
                    {displayText}
                  </h2>

                  {/* Typing Cursor */}

                  <motion.span
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      ml-1.5
                      inline-block
                      h-7
                      w-[2px]
                      rounded-full
                      bg-cyan-400
                      md:h-8
                      lg:h-9
                    "
                  />
                </div>

                {/* Small cyan underline */}

                <motion.div
                  initial={{
                    width: 0,
                    opacity: 0,
                  }}
                  animate={{
                    width: 55,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8,
                  }}
                  className="
                    mt-3
                    h-[2px]
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-transparent
                  "
                />
              </motion.div>
            </div>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.55,
              }}
              className="
                mt-6
                max-w-[600px]
                text-[14px]
                leading-7
                text-[var(--muted)]
                md:text-base
              "
            >
              {bio}
            </motion.p>

            {/* =================================================
                CTA
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-4
              "
            >

              {/* View Work */}

              <motion.button
                type="button"
                onClick={() => scrollTo("#work")}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  to-sky-500
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-950
                  shadow-[0_10px_40px_rgba(34,211,238,0.18)]
                  transition-all
                "
              >
                View My Work

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </motion.button>

              {/* Let's Talk */}

              <motion.button
                type="button"
                onClick={() => scrollTo("#contact")}
                whileHover={{
                  scale: 1.04,
                  borderColor:
                    "rgba(34,211,238,0.5)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[var(--border)]
                  px-6
                  py-3.5
                  text-sm
                  font-medium
                  text-[var(--foreground)]
                  transition-all
                  duration-300
                "
              >
                <Sparkles size={16} />

                Let's Talk
              </motion.button>
            </motion.div>

            {/* =================================================
                SOCIAL ICONS
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.9,
              }}
              className="
                mt-8
                flex
                items-center
                gap-3
              "
            >
              {socialLinks.map(
                ({
                  label,
                  icon: Icon,
                  href,
                }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -4,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cyan-400/30
                      text-cyan-400
                      transition-all
                      duration-300
                      hover:border-cyan-400
                      hover:bg-cyan-400/10
                      hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
                    "
                  >
                    <Icon size={15} />
                  </motion.a>
                )
              )}
            </motion.div>
          </div>

          {/* ===================================================
              RIGHT IMAGE
          ==================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 35,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              mx-auto
              -mt-10
              flex
              w-full
              max-w-[500px]
              items-center
              justify-center
              lg:ml-auto
              lg:-mt-35
            "
          >

            {/* Outer Orbit */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                aspect-square
                w-[88%]
                rounded-full
                border
                border-dashed
                border-cyan-400/20
              "
            />

            {/* Second Orbit */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                aspect-square
                w-[100%]
                rounded-full
                border
                border-cyan-400/[0.08]
              "
            />

            {/* Gradient Ring */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                aspect-square
                w-[82%]
                rounded-full
                bg-[conic-gradient(from_0deg,transparent_0deg,#22d3ee_80deg,transparent_150deg,transparent_360deg)]
                opacity-70
                blur-[1px]
              "
            />

            {/* Inner Background */}

            <div
              className="
                absolute
                aspect-square
                w-[78%]
                rounded-full
                bg-[var(--background)]
              "
            />

            {/* Orbit Dot */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                aspect-square
                w-[92%]
                rounded-full
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-0
                  h-3
                  w-3
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_25px_#22d3ee]
                "
              />
            </motion.div>

            {/* Second Orbit Dot */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                aspect-square
                w-[105%]
                rounded-full
              "
            >
              <span
                className="
                  absolute
                  bottom-[8%]
                  left-[12%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-300
                  opacity-60
                "
              />
            </motion.div>

            {/* Photoshop */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                x: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.6,
              }}
              whileHover={{
                scale: 1.12,
                y: -4,
              }}
              className="
                absolute
                right-[3%]
                top-[28%]
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-[var(--background)]/85
                text-cyan-400
                shadow-lg
                backdrop-blur-md
              "
            >
              <span className="text-lg font-bold">
                Ps
              </span>
            </motion.div>

            {/* Illustrator */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                x: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 1,
                duration: 0.6,
              }}
              whileHover={{
                scale: 1.12,
                y: -4,
              }}
              className="
                absolute
                right-[0%]
                top-[48%]
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-[var(--background)]/85
                text-cyan-400
                shadow-lg
                backdrop-blur-md
              "
            >
              <span className="text-lg font-bold">
                Ai
              </span>
            </motion.div>

            {/* Figma */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                x: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 1.1,
                duration: 0.6,
              }}
              whileHover={{
                scale: 1.12,
                y: -4,
              }}
              className="
                absolute
                left-[1%]
                top-[34%]
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-[var(--background)]/85
                text-cyan-400
                shadow-lg
                backdrop-blur-md
              "
            >
              <FaFigma size={20} />
            </motion.div>

            {/* InDesign */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                x: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 1.2,
                duration: 0.6,
              }}
              whileHover={{
                scale: 1.12,
                y: -4,
              }}
              className="
                absolute
                left-[3%]
                top-[55%]
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-[var(--background)]/85
                text-cyan-400
                shadow-lg
                backdrop-blur-md
              "
            >
              <span className="text-lg font-bold">
                Id
              </span>
            </motion.div>

            {/* =================================================
                PROFILE IMAGE
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                aspect-square
                w-[72%]
                overflow-hidden
                rounded-full
                border
                border-cyan-400/20
                bg-[var(--card)]
                shadow-2xl
              "
            >
              {image ? (
                <motion.img
                  src={image}
                  alt={name}
                  initial={{
                    scale: 1.08,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.4,
                  }}
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                    transition-transform
                    duration-1000
                    hover:scale-105
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
                  rounded-full
                  bg-gradient-to-t
                  from-black/25
                  via-transparent
                  to-cyan-300/10
                "
              />

              {/* Shine */}

              <motion.div
                animate={{
                  x: ["-120%", "120%"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  w-1/3
                  rotate-[20deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                  blur-xl
                "
              />
            </motion.div>

            {/* =================================================
                DYNAMIC AVAILABILITY BADGE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.9,
              }}
              className="
                absolute
                right-[1%]
                top-[4%]
                z-30
                flex
                max-w-[190px]
                items-center
                gap-2.5
                rounded-2xl
                border
                border-cyan-400/20
                bg-[var(--background)]/90
                px-4
                py-2.5
                shadow-[0_10px_30px_rgba(34,211,238,0.08)]
                backdrop-blur-md
              "
            >

              {/* Status Dot */}

              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_12px_#22d3ee]
                "
              />

              {/* Backend Dynamic Text */}

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  leading-4
                  tracking-[0.12em]
                  text-cyan-400
                "
              >
                {availability}
              </span>
            </motion.div>

            {/* =================================================
                CREATIVE MIND BADGE
            ================================================== */}

            <motion.div
              animate={{
                y: [0, 7, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-[13%]
                left-[1%]
                flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-[var(--background)]/85
                px-3
                py-2
                shadow-lg
                backdrop-blur-md
              "
            >
              <Sparkles
                size={12}
                className="text-cyan-400"
              />

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-[var(--muted)]
                "
              >
                Creative Mind
              </span>
            </motion.div>

            {/* =================================================
                EXPERIENCE
            ================================================== */}

            {experience && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.1,
                }}
                className="
                  absolute
                  bottom-[2%]
                  right-[7%]
                  hidden
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-[var(--background)]/90
                  px-4
                  py-3
                  shadow-xl
                  backdrop-blur-md
                  sm:block
                "
              >
                <p
                  className="
                    text-2xl
                    font-semibold
                    tracking-[-0.05em]
                  "
                >
                  {experience}+
                </p>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    uppercase
                    tracking-[0.18em]
                    text-[var(--subtle)]
                  "
                >
                  Years Experience
                </p>
              </motion.div>
            )}

            {/* Cursor Decoration */}

            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
              }}
              className="
                absolute
                left-[5%]
                top-[17%]
                hidden
                rounded-full
                border
                border-cyan-400/20
                bg-[var(--background)]/80
                p-3
                backdrop-blur-md
                sm:block
              "
            >
              <MousePointer2
                size={14}
                className="text-cyan-400"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
 
