"use client";

import { useGetProjectsQuery } from "@/src/redux/features/project/projectApi";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Lightbulb,
  Route,
  Target,
} from "lucide-react";

 

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
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

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CaseStudies() {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery();

  const caseStudies = [...projects]
    .filter(
      (project) =>
        project.isPublished !== false &&
        project.caseStudy &&
        (
          project.caseStudy.overview ||
          project.caseStudy.challenge ||
          project.caseStudy.solution ||
          project.caseStudy.process ||
          project.caseStudy.result
        )
    )
    .sort(
      (a, b) =>
        (a.order ?? 999) -
        (b.order ?? 999)
    );

  return (
    <section
      id="case-studies"
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

        {/* ================= HEADER ================= */}

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
               — Case Studies
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
              Stories
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
            A closer look at the thinking, strategy and
            creative decisions behind selected projects.
          </p>
        </motion.div>

        {/* ================= LOADING ================= */}

        {isLoading && (
          <div
            className="
              mt-20
              grid
              gap-6
              lg:grid-cols-2
            "
          >
            {[1, 2].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse
                  rounded-[30px]
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  p-7
                  md:p-9
                "
              >
                <div className="h-3 w-24 rounded bg-[var(--foreground)]/10" />

                <div className="mt-6 h-10 w-4/5 rounded bg-[var(--foreground)]/10" />

                <div className="mt-4 h-3 w-32 rounded bg-[var(--foreground)]/10" />

                <div className="mt-10 h-20 rounded bg-[var(--foreground)]/10" />

                <div className="mt-8 h-16 rounded bg-[var(--foreground)]/10" />
              </div>
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}

        {isError && (
          <div className="mt-20 text-center">
            <p className="text-sm text-[var(--muted)]">
              Unable to load case studies.
            </p>
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!isLoading &&
          !isError &&
          caseStudies.length === 0 && (
            <div
              className="
                mt-20
                rounded-[30px]
                border
                border-[var(--border)]
                bg-[var(--card)]
                px-8
                py-20
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-[var(--muted)]
                "
              >
                Case studies are coming soon.
              </p>
            </div>
          )}

        {/* ================= CARDS ================= */}

        {!isLoading &&
          !isError &&
          caseStudies.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.08,
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="
                mt-20
                grid
                gap-6
                lg:grid-cols-2
              "
            >
              {caseStudies.map(
                (project, index) => {
                  const category =
                    typeof project.category ===
                    "string"
                      ? project.category
                      : project.category?.name;

                  const hasBehance =
                    Boolean(project.behanceUrl);

                  return (
                    <motion.article
                      key={project._id}
                      variants={itemVariants}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-[30px]
                        border
                        border-[var(--border)]
                        bg-[var(--card)]
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-[var(--border-strong)]
                        hover:shadow-[0_25px_80px_rgba(0,0,0,0.06)]
                        dark:hover:shadow-[0_25px_80px_rgba(0,0,0,0.3)]
                      "
                    >
                      {/* Top accent */}
                      <div
                        className="
                          absolute
                          inset-x-0
                          top-0
                          h-px
                          origin-left
                          scale-x-0
                          bg-[var(--foreground)]
                          transition-transform
                          duration-700
                          group-hover:scale-x-100
                        "
                      />

                      <div className="p-7 md:p-9">

                        {/* Card header */}
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-5
                          "
                        >
                          <div>
                            <p
                              className="
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.28em]
                                text-[var(--muted)]
                              "
                            >
                              Case Study{" "}
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </p>

                            <h3
                              className="
                                mt-5
                                max-w-xl
                                text-3xl
                                font-medium
                                leading-[0.95]
                                tracking-[-0.055em]
                                md:text-4xl
                              "
                            >
                              {project.title}
                            </h3>

                            {category && (
                              <p
                                className="
                                  mt-4
                                  text-[11px]
                                  uppercase
                                  tracking-[0.2em]
                                  text-[var(--muted)]
                                "
                              >
                                {category}
                              </p>
                            )}
                          </div>

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
                              text-xs
                              text-[var(--muted)]
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Divider */}
                        <div
                          className="
                            my-8
                            h-px
                            bg-[var(--border)]
                          "
                        />

                        {/* Overview */}
                        {project.caseStudy
                          ?.overview && (
                          <div>
                            <p
                              className="
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.25em]
                                text-[var(--muted)]
                              "
                            >
                              Overview
                            </p>

                            <p
                              className="
                                mt-4
                                text-sm
                                leading-7
                                text-[var(--muted)]
                              "
                            >
                              {
                                project
                                  .caseStudy
                                  .overview
                              }
                            </p>
                          </div>
                        )}

                        {/* Content grid */}
                        <div
                          className="
                            mt-8
                            grid
                            gap-x-6
                            gap-y-8
                            sm:grid-cols-2
                          "
                        >
                          {/* Problem */}
                          {project.caseStudy
                            ?.challenge && (
                            <div>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[var(--border)]
                                  "
                                >
                                  <Target
                                    size={14}
                                    strokeWidth={1.5}
                                  />
                                </div>

                                <span
                                  className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                  "
                                >
                                  Problem
                                </span>
                              </div>

                              <p
                                className="
                                  mt-4
                                  text-sm
                                  leading-6
                                  text-[var(--muted)]
                                "
                              >
                                {
                                  project
                                    .caseStudy
                                    .challenge
                                }
                              </p>
                            </div>
                          )}

                          {/* Solution */}
                          {project.caseStudy
                            ?.solution && (
                            <div>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[var(--border)]
                                  "
                                >
                                  <Lightbulb
                                    size={14}
                                    strokeWidth={1.5}
                                  />
                                </div>

                                <span
                                  className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                  "
                                >
                                  Solution
                                </span>
                              </div>

                              <p
                                className="
                                  mt-4
                                  text-sm
                                  leading-6
                                  text-[var(--muted)]
                                "
                              >
                                {
                                  project
                                    .caseStudy
                                    .solution
                                }
                              </p>
                            </div>
                          )}

                          {/* Process */}
                          {project.caseStudy
                            ?.process && (
                            <div>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[var(--border)]
                                  "
                                >
                                  <Route
                                    size={14}
                                    strokeWidth={1.5}
                                  />
                                </div>

                                <span
                                  className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                  "
                                >
                                  Process
                                </span>
                              </div>

                              <p
                                className="
                                  mt-4
                                  text-sm
                                  leading-6
                                  text-[var(--muted)]
                                "
                              >
                                {
                                  project
                                    .caseStudy
                                    .process
                                }
                              </p>
                            </div>
                          )}

                          {/* Result */}
                          {project.caseStudy
                            ?.result && (
                            <div>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[var(--border)]
                                  "
                                >
                                  <CheckCircle2
                                    size={14}
                                    strokeWidth={1.5}
                                  />
                                </div>

                                <span
                                  className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                  "
                                >
                                  Result
                                </span>
                              </div>

                              <p
                                className="
                                  mt-4
                                  text-sm
                                  leading-6
                                  text-[var(--muted)]
                                "
                              >
                                {
                                  project
                                    .caseStudy
                                    .result
                                }
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Bottom */}
                        <div
                          className="
                            mt-10
                            flex
                            flex-col
                            gap-5
                            border-t
                            border-[var(--border)]
                            pt-6
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >
                          {/* Tools */}
                          <div className="flex flex-wrap gap-2">
                            {project.tools
                              ?.slice(0, 4)
                              .map((tool) => (
                                <span
                                  key={tool}
                                  className="
                                    rounded-full
                                    border
                                    border-[var(--border)]
                                    px-3
                                    py-1.5
                                    text-[9px]
                                    uppercase
                                    tracking-[0.12em]
                                    text-[var(--muted)]
                                  "
                                >
                                  {tool}
                                </span>
                              ))}
                          </div>

                          {/* Behance */}
                          {hasBehance ? (
                            <a
                              href={
                                project.behanceUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                group/button
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                bg-[var(--foreground)]
                                px-5
                                py-3
                                text-xs
                                font-medium
                                text-[var(--background)]
                                transition-all
                                duration-300
                                hover:gap-4
                              "
                            >
                              View Case Study

                              <ArrowUpRight
                                size={15}
                                className="
                                  transition-transform
                                  duration-300
                                  group-hover/button:rotate-45
                                "
                              />
                            </a>
                          ) : (
                            <span
                              className="
                                text-xs
                                text-[var(--muted)]
                              "
                            >
                              Behance link coming soon
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </motion.div>
          )}
      </div>
    </section>
  );
}