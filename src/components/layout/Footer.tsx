"use client";

import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";

import {
  FaBehance,
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

import {
  motion,
  type Variants,
} from "framer-motion";

/* =========================================================
   NAVIGATION
========================================================= */

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socials = [
  {
    label: "Behance",
    icon: FaBehance,
    href: "https://www.behance.net/sumaiyasiddiqa01",
  },
  {
    label: "X",
    icon: X,
    href: "https://x.com/ms_siddiqa",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/sumaiya-siddiqa01/",
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/ms.sumaiyasiddiqa",
  },
  
];

/* =========================================================
   FRAMER MOTION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
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

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[720px]
          w-[720px]
          -translate-x-1/2
          -translate-y-[58%]
          rounded-full
          border
          border-[var(--border)]
          opacity-30
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-[58%]
          rounded-full
          border
          border-[var(--border)]
          opacity-20
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[180px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[var(--foreground)]
          opacity-[0.025]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-220px]
          left-[-180px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[var(--foreground)]
          opacity-[0.025]
          blur-[110px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="container-main relative z-10">

        {/* ===================================================
            PREMIUM CTA
        ==================================================== */}

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="
            relative
            overflow-hidden
            border-b
            border-[var(--border)]
            pt-10
            md:py-18
            lg:pt-12
          "
        >
          {/* Decorative circle */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-100px]
              top-1/2
              h-[260px]
              w-[260px]
              -translate-y-1/2
              rounded-full
              border
              border-[var(--border)]
              opacity-40
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-8
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div className="max-w-3xl">

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  px-4
                  py-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[var(--muted)]
                "
              >
                <Sparkles size={13} />

                Let's create something meaningful
              </div>

              <h2
                className="
                  text-4xl
                  font-medium
                  leading-[1.05]
                  tracking-[-0.05em]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                Have a project
                <br />

                <span className="text-[var(--muted)]">
                  in mind?
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-sm
                  leading-7
                  text-[var(--muted)]
                  md:text-base
                "
              >
                From brand identity to digital experiences,
                let's turn your ideas into thoughtful visual
                solutions that people remember.
              </p>
            </div>

            {/* CTA */}

            <a
              href="#contact"
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-3
                rounded-full
                border
                border-[var(--foreground)]
                bg-[var(--foreground)]
                px-6
                py-3.5
                text-xs
                font-medium
                uppercase
                tracking-[0.12em]
                text-[var(--background)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]
              "
            >
              Start a project

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--background)]
                  text-[var(--foreground)]
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              >
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* ===================================================
            MAIN FOOTER GRID
        ==================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            gap-14
            py-16
            md:py-20
            lg:grid-cols-[1.3fr_0.7fr_0.7fr]
            lg:gap-20
            lg:py-24
          "
        >

          {/* =================================================
              BRAND
          ================================================== */}

          <motion.div variants={itemVariants}>

            {/* Badge */}

            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--card)]
                px-4
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[var(--muted)]
              "
            >
              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    animate-ping
                    rounded-full
                    bg-[var(--foreground)]
                    opacity-40
                  "
                />

                <span
                  className="
                    relative
                    h-2
                    w-2
                    rounded-full
                    bg-[var(--foreground)]
                  "
                />
              </span>

              Graphic Designer
            </div>

            {/* Name */}

            <h3
              className="
                text-3xl
                font-medium
                tracking-[-0.05em]
                md:text-4xl
              "
            >
              Sumaiya Haque
            </h3>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-[var(--muted)]
                md:text-base
              "
            >
              Creating thoughtful visual identities,
              memorable brand experiences and meaningful
              digital visuals for people and businesses.
            </p>

            {/* Email */}

            <a
              href="mailto:sumaiyasiddiqa823@gmail.com"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                text-sm
                font-medium
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  transition-all
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:border-[var(--foreground)]
                  group-hover:bg-[var(--foreground)]
                  group-hover:text-[var(--background)]
                "
              >
                <Mail
                  size={16}
                  strokeWidth={1.6}
                />
              </span>

              <span
                className="
                  border-b
                  border-transparent
                  pb-0.5
                  transition-colors
                  duration-300
                  group-hover:border-[var(--foreground)]
                "
              >
                sumaiyasiddiqa823@gmail.com
              </span>

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </motion.div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <motion.div variants={itemVariants}>

            <div
              className="
                mb-6
                flex
                items-center
                gap-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[var(--muted)]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[var(--foreground)]
                "
              />

              Navigation
            </div>

            <nav className="space-y-1">
              {footerLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[var(--border)]
                    py-3.5
                    text-sm
                    transition-colors
                    duration-300
                    hover:text-[var(--foreground)]
                  "
                >
                  <span className="flex items-center gap-4">

                    <span
                      className="
                        text-[9px]
                        text-[var(--subtle)]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      {link.label}
                    </span>

                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      text-[var(--muted)]
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-[var(--foreground)]
                    "
                  />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* =================================================
              CONTACT
          ================================================== */}

          <motion.div variants={itemVariants}>

            <div
              className="
                mb-6
                flex
                items-center
                gap-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[var(--muted)]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[var(--foreground)]
                "
              />

              Contact
            </div>

            <div className="space-y-7">

              {/* Availability */}

              <div>

                <p
                  className="
                    mb-2
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-[var(--subtle)]
                  "
                >
                  Availability
                </p>

                <div className="flex items-center gap-2">

                  <span className="relative flex h-2 w-2">
                    <span
                      className="
                        absolute
                        inset-0
                        animate-ping
                        rounded-full
                        bg-[var(--foreground)]
                        opacity-40
                      "
                    />

                    <span
                      className="
                        relative
                        h-2
                        w-2
                        rounded-full
                        bg-[var(--foreground)]
                      "
                    />
                  </span>

                  <span className="text-sm">
                    Open for freelance
                  </span>

                </div>
              </div>

              {/* Location */}

              <div>

                <p
                  className="
                    mb-2
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-[var(--subtle)]
                  "
                >
                  Location
                </p>

                <div className="flex items-center gap-2">

                  <MapPin
                    size={15}
                    className="text-[var(--muted)]"
                  />

                  <span className="text-sm">
                    Dhaka, Bangladesh
                  </span>

                </div>
              </div>

              {/* Social */}

              <div>

                <p
                  className="
                    mb-3
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-[var(--subtle)]
                  "
                >
                  Follow
                </p>

                <div className="flex flex-wrap gap-2">

                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        title={social.label}
                        className="
                          group
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--border)]
                          bg-[var(--card)]
                          text-[var(--muted)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-[var(--foreground)]
                          hover:bg-[var(--foreground)]
                          hover:text-[var(--background)]
                        "
                      >
                        <Icon
                          size={14}
                          className="
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          "
                        />
                      </a>
                    );
                  })}

                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      
         
      </div>
    </footer>
  );
}

