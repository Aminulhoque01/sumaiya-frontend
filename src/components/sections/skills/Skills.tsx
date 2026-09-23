"use client";

import { useGetSkillsQuery } from "@/src/redux/features/skill/skillApi";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Layers3,
  PenTool,
  Sparkles,
} from "lucide-react";

 

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const getSkillIcon = (icon?: string, name?: string) => {
  const value = `${icon ?? ""} ${name ?? ""}`.toLowerCase();

  if (
    value.includes("photoshop") ||
    value.includes("ps")
  ) {
    return {
      type: "ps",
      label: "Ps",
    };
  }

  if (
    value.includes("illustrator") ||
    value.includes("illustrator")
  ) {
    return {
      type: "ai",
      label: "Ai",
    };
  }

  if (
    value.includes("indesign") ||
    value.includes("id")
  ) {
    return {
      type: "id",
      label: "Id",
    };
  }

  if (value.includes("figma")) {
    return {
      type: "figma",
      label: "F",
    };
  }

  return {
    type: "default",
    label: "✦",
  };
};

const SkillIcon = ({
  icon,
  name,
}: {
  icon?: string;
  name?: string;
}) => {
  const skillIcon = getSkillIcon(icon, name);

  if (skillIcon.type === "figma") {
    return (
      <div className="relative h-10 w-10">
        <div className="absolute left-1 top-0 h-5 w-4 rounded-tl-full bg-[#F24E1E]" />
        <div className="absolute left-5 top-0 h-5 w-4 rounded-tr-full bg-[#FF7262]" />

        <div className="absolute left-1 top-5 h-5 w-4 rounded-bl-full bg-[#A259FF]" />
        <div className="absolute left-5 top-5 h-5 w-4 rounded-br-full bg-[#1ABCFE]" />

        <div className="absolute bottom-0 left-1 h-5 w-4 rounded-bl-full rounded-tl-full bg-[#0ACF83]" />
      </div>
    );
  }

  if (skillIcon.type === "ps") {
    return (
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-[10px]
          border
          border-[var(--border)]
          bg-[#001e36]
          text-[13px]
          font-bold
          tracking-[-0.04em]
          text-[#31a8ff]
        "
      >
        Ps
      </div>
    );
  }

  if (skillIcon.type === "ai") {
    return (
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-[10px]
          border
          border-[var(--border)]
          bg-[#330000]
          text-[13px]
          font-bold
          tracking-[-0.04em]
          text-[#ff9a00]
        "
      >
        Ai
      </div>
    );
  }

  if (skillIcon.type === "id") {
    return (
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-[10px]
          border
          border-[var(--border)]
          bg-[#49021f]
          text-[13px]
          font-bold
          tracking-[-0.04em]
          text-[#ff3366]
        "
      >
        Id
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-[10px]
        border
        border-[var(--border)]
        bg-[var(--foreground)]
        text-sm
        text-[var(--background)]
      "
    >
      {skillIcon.label}
    </div>
  );
};

export default function Skills() {
  const {
    data: skills = [],
    isLoading,
    isError,
  } = useGetSkillsQuery();

  const activeSkills = [...skills]
    .filter((skill) => skill.isActive !== false)
    .sort(
      (a, b) =>
        (a.order ?? 999) - (b.order ?? 999)
    );

  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        py-14
        md:py-16
      "
    >
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="
            grid
            gap-8
            lg:grid-cols-[1.2fr_0.8fr]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-cyan-500
              "
            >
               Skills & Tools
            </p>

            <h2
              className="
                mt-6
                max-w-4xl
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.065em]
                sm:text-6xl
                md:text-8xl
              "
            >
              Tools
              <br />
              <span className="text-[var(--muted)]">
                behind the work.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-[var(--muted)]
              lg:ml-auto
            "
          >
            Every idea needs the right tool. These are
            the creative tools I use to transform concepts
            into refined visual experiences.
          </p>
        </motion.div>

        {/* Main 2 column */}
        <div
          className="
            mt-16
            grid
            gap-6
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* LEFT CREATIVE CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={reveal}
            className="
              group
              relative
              min-h-[520px]
              overflow-hidden
              rounded-[32px]
              border
              border-[var(--border)]
              bg-[var(--foreground)]
              p-8
              text-[var(--background)]
              md:p-10
            "
          >
            {/* decorative circles */}
            <div
              className="
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                border
                border-[var(--background)]/10
              "
            />

            <div
              className="
                absolute
                -right-8
                top-10
                h-52
                w-52
                rounded-full
                border
                border-[var(--background)]/10
              "
            />

            <div
              className="
                absolute
                bottom-[-120px]
                left-[-80px]
                h-72
                w-72
                rounded-full
                border
                border-[var(--background)]/10
              "
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    opacity-60
                  "
                >
                  Creative Toolkit
                </span>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--background)]/20
                  "
                >
                  <ArrowUpRight size={17} />
                </div>
              </div>

              {/* Center visual */}
              <div className="relative flex flex-1 items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 8, 0, -8, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    relative
                    flex
                    h-52
                    w-52
                    items-center
                    justify-center
                    rounded-[42px]
                    border
                    border-[var(--background)]/20
                    bg-[var(--background)]/5
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      absolute
                      inset-5
                      rounded-[32px]
                      border
                      border-[var(--background)]/10
                    "
                  />

                  <Sparkles
                    size={38}
                    strokeWidth={1.2}
                    className="absolute -left-4 -top-4"
                  />

                  <PenTool
                    size={34}
                    strokeWidth={1.2}
                    className="absolute -bottom-3 -right-3"
                  />

                  <Layers3
                    size={32}
                    strokeWidth={1.2}
                    className="absolute -right-7 top-10"
                  />

                  <div className="text-center">
                    <span
                      className="
                        block
                        text-5xl
                        font-medium
                        tracking-[-0.08em]
                      "
                    >
                      98%
                    </span>

                    <span
                      className="
                        mt-2
                        block
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        opacity-50
                      "
                    >
                      Creative precision
                    </span>
                  </div>
                </motion.div>
              </div>

              <div>
                <p
                  className="
                    max-w-md
                    text-3xl
                    font-medium
                    leading-[1]
                    tracking-[-0.045em]
                    md:text-4xl
                  "
                >
                  The right tool
                  <br />
                  shapes the idea.
                </p>

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    gap-3
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    opacity-50
                  "
                >
                  <span className="h-px w-8 bg-current" />
                  Adobe · Figma · Creative Suite
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SKILLS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={stagger}
            className="
              rounded-[32px]
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-6
              md:p-8
            "
          >
            <div
              className="
                mb-8
                flex
                items-end
                justify-between
                border-b
                border-[var(--border)]
                pb-6
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-[var(--muted)]
                  "
                >
                  Software expertise
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-medium
                    tracking-[-0.04em]
                  "
                >
                  Creative tools
                </h3>
              </div>

              <span
                className="
                  text-xs
                  text-[var(--muted)]
                "
              >
                {activeSkills.length
                  .toString()
                  .padStart(2, "0")}{" "}
                tools
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-5">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      animate-pulse
                      rounded-2xl
                      border
                      border-[var(--border)]
                      p-5
                    "
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--foreground)]/10" />

                    <div className="mt-5 h-4 w-32 rounded bg-[var(--foreground)]/10" />

                    <div className="mt-4 h-2 rounded-full bg-[var(--foreground)]/10" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="py-16 text-center">
                <p className="text-sm text-[var(--muted)]">
                  Unable to load skills.
                </p>
              </div>
            ) : activeSkills.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-[var(--muted)]">
                  No skills available yet.
                </p>
              </div>
            ) : (
              <motion.div
                variants={stagger}
                className="space-y-4"
              >
                {activeSkills.map(
                  (skill, index) => {
                    const proficiency = Math.min(
                      100,
                      Math.max(
                        0,
                        skill.proficiency ?? 0
                      )
                    );

                    return (
                      <motion.div
                        key={skill._id}
                        variants={reveal}
                        className="
                          group
                          rounded-[22px]
                          border
                          border-[var(--border)]
                          p-5
                          transition-all
                          duration-500
                          hover:-translate-y-1
                          hover:border-[var(--border-strong)]
                          hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]
                          dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.25)]
                        "
                      >
                        <div className="flex items-center gap-4">
                          <SkillIcon
                            icon={skill.icon}
                            name={skill.name}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <h4
                                  className="
                                    text-base
                                    font-medium
                                    tracking-[-0.02em]
                                  "
                                >
                                  {skill.name}
                                </h4>

                                {skill.experience && (
                                  <p
                                    className="
                                      mt-1
                                      text-xs
                                      text-[var(--muted)]
                                    "
                                  >
                                    {skill.experience}
                                  </p>
                                )}
                              </div>

                              <span
                                className="
                                  shrink-0
                                  text-2xl
                                  font-medium
                                  tracking-[-0.06em]
                                "
                              >
                                {proficiency}%
                              </span>
                            </div>

                            <div className="mt-4">
                              <div
                                className="
                                  h-[5px]
                                  overflow-hidden
                                  rounded-full
                                  bg-[var(--foreground)]/50
                                "
                              >
                                <motion.div
                                  initial={{
                                    width: 0,
                                  }}
                                  whileInView={{
                                    width: `${proficiency}%`,
                                  }}
                                  viewport={{
                                    once: true,
                                  }}
                                  transition={{
                                    duration: 1.1,
                                    delay:
                                      index * 0.08,
                                    ease: [
                                      0.22,
                                      1,
                                      0.36,
                                      1,
                                    ],
                                  }}
                                  className="
                                    h-full
                                    rounded-full
                                    bg-cyan-500
                                  "
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={stagger}
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-3
          "
        >
          {[
            {
              number: "01",
              title: "Precision",
              text: "Every detail has a purpose.",
            },
            {
              number: "02",
              title: "Consistency",
              text: "Visual systems that stay coherent.",
            },
            {
              number: "03",
              title: "Creativity",
              text: "Ideas turned into visual stories.",
            },
          ].map((item) => (
            <motion.div
              key={item.number}
              variants={reveal}
              className="
                rounded-[24px]
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-6
                transition-transform
                duration-500
                hover:-translate-y-1
              "
            >
              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[var(--muted)]
                "
              >
                {item.number}
              </span>

              <h4
                className="
                  mt-8
                  text-xl
                  font-medium
                  tracking-[-0.035em]
                "
              >
                {item.title}
              </h4>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-[var(--muted)]
                "
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}