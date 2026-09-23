"use client";

import { motion, type Variants } from "framer-motion";
import {
  Search,
  Lightbulb,
  PenTool,
  Sparkles,
  Send,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Research",
    shortTitle: "Discover",
    description:
      "Every strong design starts with understanding. I explore the brand, audience, market and the problem behind the project.",
    icon: Search,
    tags: ["Brand", "Audience", "Research"],
  },
  {
    number: "02",
    title: "Concept",
    shortTitle: "Imagine",
    description:
      "Ideas take shape through references, visual directions, moodboards and creative exploration until the right concept emerges.",
    icon: Lightbulb,
    tags: ["Ideas", "Moodboard", "Direction"],
  },
  {
    number: "03",
    title: "Design",
    shortTitle: "Create",
    description:
      "The selected concept becomes a visual system through typography, composition, color, imagery and thoughtful details.",
    icon: PenTool,
    tags: ["Typography", "Visuals", "Composition"],
  },
  {
    number: "04",
    title: "Refinement",
    shortTitle: "Polish",
    description:
      "Small details make a big difference. I refine the design, balance every element and make sure the visual language feels consistent.",
    icon: Sparkles,
    tags: ["Details", "Balance", "Consistency"],
  },
  {
    number: "05",
    title: "Delivery",
    shortTitle: "Launch",
    description:
      "The final work is prepared with clean, organized and production-ready assets for real-world use across every required platform.",
    icon: Send,
    tags: ["Assets", "Formats", "Ready"],
  },
];

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CreativeProcess() {
  return (
    <section
      id="process"
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
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={reveal}
          className="
            grid
            gap-8
            lg:grid-cols-[1.15fr_0.85fr]
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
               — Creative Process
            </p>

            <h2
              className="
                mt-6
                max-w-5xl
                text-5xl
                font-medium
                leading-[0.88]
                tracking-[-0.07em]
                sm:text-6xl
                md:text-8xl
              "
            >
              From idea
              <br />
              <span className="text-[var(--muted)]">
                to impact.
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
            A thoughtful design process turns an idea
            into something clear, memorable and ready
            to connect with people.
          </p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative mt-20 md:mt-28">
          {/* Desktop line */}
          <div
            className="
              absolute
              left-[10%]
              right-[10%]
              top-[38px]
              hidden
              h-px
              bg-[var(--border)]
              lg:block
            "
          />

          <div
            className="
              grid
              gap-5
              lg:grid-cols-5
            "
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  variants={reveal}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="group relative"
                >
                  {/* Number / node */}
                  <div className="relative z-10 flex items-center justify-between lg:block">
                    <div
                      className="
                        flex
                        h-[76px]
                        w-[76px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--border)]
                        bg-[var(--background)]
                        transition-all
                        duration-500
                        group-hover:border-[var(--foreground)]
                        group-hover:scale-105
                      "
                    >
                      <span
                        className="
                          text-xs
                          font-medium
                          tracking-[0.12em]
                          text-[var(--muted)]
                          transition-colors
                          duration-500
                          group-hover:text-[var(--foreground)]
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--border)]
                        lg:hidden
                      "
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="
                      mt-5
                      min-h-[370px]
                      rounded-[28px]
                      border
                      border-[var(--border)]
                      bg-[var(--card)]
                      p-6
                      transition-all
                      duration-500
                      group-hover:-translate-y-2
                      group-hover:border-[var(--border-strong)]
                      group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.07)]
                      dark:group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)]
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        hidden
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[var(--border)]
                        transition-all
                        duration-500
                        group-hover:bg-[var(--foreground)]
                        group-hover:text-[var(--background)]
                        lg:flex
                      "
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.4}
                      />
                    </div>

                    <div className="mt-8">
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.24em]
                          text-[var(--muted)]
                        "
                      >
                        Step {step.number}
                      </p>

                      <h3
                        className="
                          mt-3
                          text-2xl
                          font-medium
                          tracking-[-0.045em]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-5
                          text-sm
                          leading-6
                          text-[var(--muted)]
                        "
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div
                      className="
                        mt-8
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full
                            border
                            border-[var(--border)]
                            px-3
                            py-1.5
                            text-[9px]
                            uppercase
                            tracking-[0.14em]
                            text-[var(--muted)]
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}