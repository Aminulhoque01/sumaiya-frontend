"use client";

import {
  Project,
  useGetProjectsQuery,
} from "@/src/redux/features/project/projectApi";

import { motion, type Variants } from "framer-motion";

import {
  ArrowUpRight,
  Loader2,
  ExternalLink,
} from "lucide-react";

import { useMemo, useState } from "react";

/* =========================================================
   ANIMATIONS
========================================================= */

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
    scale: 0.97,
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

/* =========================================================
   HELPERS
========================================================= */

function getCategoryName(
  category: Project["category"]
) {
  if (typeof category === "string") {
    return category;
  }

  return category?.name || "Design";
}

function getProjectImage(project: Project) {
  return (
    project.thumbnail?.url ||""
  );
}

/* =========================================================
   EXTERNAL PROJECT URL
========================================================= */

function getExternalProjectUrl(
  project: Project
) {
  const projectData = project as Project & {
    behanceUrl?: string;
    behance?: string;
    projectUrl?: string;
    liveUrl?: string;
    url?: string;
  };

  return (
    projectData.behanceUrl ||
    projectData.behance ||
    projectData.projectUrl ||
    projectData.liveUrl ||
    projectData.url ||
    ""
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProjectsPreview() {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery();

  const [activeCategory, setActiveCategory] =
    useState("All");

  /* =======================================================
     PUBLISHED PROJECTS
  ======================================================= */

  const publishedProjects = useMemo(() => {
    return [...projects]
      .filter(
        (project) =>
          project.isPublished !== false
      )
      .sort(
        (a, b) =>
          (a.order ?? 0) -
          (b.order ?? 0)
      );
  }, [projects]);

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const categoryNames =
      publishedProjects
        .map((project) =>
          getCategoryName(project.category)
        )
        .filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set(categoryNames)
      ),
    ];
  }, [publishedProjects]);

  /* =======================================================
     FILTERED PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return publishedProjects;
    }

    return publishedProjects.filter(
      (project) =>
        getCategoryName(project.category) ===
        activeCategory
    );
  }, [
    activeCategory,
    publishedProjects,
  ]);

  return (
    <section
      id="work"
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--background)]
        py-10
        text-[var(--foreground)]
        transition-colors
        duration-500
        md:py-18
        lg:py-14
      "
    >
      <div className="container-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          {/* Small Label */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-cyan-400
            "
          >
            <span
              className="
                h-px
                w-4
                bg-cyan-400
              "
            />

            Featured Work
          </div>

          {/* Main Heading */}

          <h2
            className="
              mt-4
              max-w-[900px]
              text-[clamp(3rem,7vw,6.5rem)]
              font-semibold
              leading-[0.86]
              tracking-[-0.075em]
            "
          >
            Selected Projects.
          </h2>

          {/* Description */}

          <p
            className="
              mt-6
              max-w-[650px]
              text-[11px]
              leading-5
              text-[var(--muted)]
              md:text-xs
              md:leading-6
            "
          >
            Selected work from my Behance
            portfolio, featuring branding,
            social media design, digital
            experiences and creative visual
            projects crafted with purpose.
          </p>
        </motion.div>

        {/* =================================================
            CATEGORY FILTERS
        ================================================= */}

        {!isLoading &&
          !isError &&
          categories.length > 1 && (
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="
                mt-8
                flex
                flex-wrap
                gap-2
              "
            >
              {categories.map(
                (category) => {
                  const isActive =
                    activeCategory ===
                    category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setActiveCategory(
                          category
                        )
                      }
                      className={`
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              border-cyan-400
                              bg-cyan-400
                              text-slate-950
                              shadow-[0_0_18px_rgba(34,211,238,0.18)]
                            `
                            : `
                              border-[var(--border)]
                              bg-[var(--card)]
                              text-[var(--muted)]
                              hover:border-cyan-400/50
                              hover:text-cyan-400
                            `
                        }
                      `}
                    >
                      {category}
                    </button>
                  );
                }
              )}
            </motion.div>
          )}

        {/* =================================================
            LOADING
        ================================================= */}

        {isLoading && (
          <div
            className="
              flex
              min-h-[400px]
              items-center
              justify-center
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                text-sm
                text-[var(--muted)]
              "
            >
              <Loader2
                size={18}
                className="animate-spin"
              />

              Loading projects...
            </div>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {isError && !isLoading && (
          <div
            className="
              mt-12
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              px-6
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
              Unable to load projects
              right now.
            </p>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!isLoading &&
          !isError &&
          filteredProjects.length === 0 && (
            <div
              className="
                mt-12
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                px-6
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
                No projects found in this
                category.
              </p>
            </div>
          )}

        {/* =================================================
            ALL PROJECTS
        ================================================= */}

        {!isLoading &&
          !isError &&
          filteredProjects.length > 0 && (
            <div
              className="
                mt-10
                flex
                flex-col
                gap-10
                md:mt-12
                md:gap-12
                lg:mt-14
                lg:gap-14
              "
            >
              {filteredProjects.map(
                (project, index) => (
                  <ProjectShowcase
                    key={project._id}
                    project={project}
                    index={index}
                    total={filteredProjects.length}
                  />
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
}

/* =========================================================
   PROJECT SHOWCASE
   EVERY PROJECT USES THE SAME DESIGN
========================================================= */

function ProjectShowcase({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const image =
    getProjectImage(project);

  const category =
    getCategoryName(project.category);

  const externalUrl =
    getExternalProjectUrl(project);

  const projectNumber = String(
    index + 1
  ).padStart(2, "0");

  const totalNumber = String(
    total
  ).padStart(2, "0");

  return (
    <motion.article
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      className="group"
    >
      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          transition-all
          duration-500
          group-hover:border-cyan-400/40
        "
      >

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            aspect-[16/10]
            overflow-hidden

            lg:absolute
            lg:inset-y-0
            lg:left-0
            lg:w-[62%]
            lg:aspect-auto
          "
        >
          {image ? (
            <motion.img
              src={image}
              alt={project.title}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-1000
                ease-out
                group-hover:scale-[1.045]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                min-h-[280px]
                items-center
                justify-center
                text-sm
                text-[var(--muted)]
              "
            >
              No project image
            </div>
          )}

          {/* Image Gradient */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-black/5
              to-transparent

              lg:bg-gradient-to-r
              lg:from-transparent
              lg:via-transparent
              lg:to-black/20
            "
          />

          {/* =================================================
              SELECTED WORK BADGE
          ================================================= */}

          <div
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/20
              bg-black/20
              px-3
              py-1.5
              text-[7px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-white
              backdrop-blur-md
              md:left-5
              md:top-5
            "
          >
            {project.featured
              ? "Featured Work"
              : "Selected Work"}
          </div>

          {/* =================================================
              PROJECT COUNTER
          ================================================= */}

          <div
            className="
              absolute
              bottom-4
              left-4
              rounded-full
              border
              border-white/20
              bg-black/25
              px-3
              py-1.5
              text-[7px]
              font-medium
              text-white
              backdrop-blur-md
              md:bottom-5
              md:left-5
            "
          >
            {projectNumber} / {totalNumber}
          </div>
        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div
          className="
            relative
            ml-0
            flex
            min-h-[330px]
            flex-col
            justify-center
            px-6
            py-9

            md:min-h-[360px]
            md:px-8
            md:py-10

            lg:ml-[62%]
            lg:min-h-[390px]
            lg:px-10
            lg:py-12

            xl:min-h-[420px]
            xl:px-12
          "
        >

          {/* =================================================
              CATEGORY
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-cyan-400
            "
          >
            <span
              className="
                h-px
                w-3
                bg-cyan-400
              "
            />

            {category}
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h3
            className="
              mt-4
              max-w-[430px]
              text-3xl
              font-semibold
              leading-[0.92]
              tracking-[-0.06em]

              md:text-4xl

              lg:text-4xl

              xl:text-5xl
            "
          >
            {project.title}
          </h3>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          {project.description && (
            <p
              className="
                mt-5
                max-w-[410px]
                text-[10px]
                leading-5
                text-[var(--muted)]

                md:text-[11px]
                md:leading-6
              "
            >
              {project.description}
            </p>
          )}

          {/* =================================================
              TOOLS
          ================================================= */}

          {project.tools &&
            project.tools.length > 0 && (
              <div
                className="
                  mt-5
                  flex
                  max-w-[420px]
                  flex-wrap
                  gap-1.5
                "
              >
                {project.tools
                  .slice(0, 5)
                  .map((tool) => (
                    <span
                      key={tool}
                      className="
                        rounded-full
                        border
                        border-[var(--border)]
                        px-2.5
                        py-1
                        text-[7px]
                        uppercase
                        tracking-[0.08em]
                        text-[var(--subtle)]
                      "
                    >
                      {tool}
                    </span>
                  ))}
              </div>
            )}

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            {externalUrl ? (
              <>
                {/* Behance Button */}

                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/button
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-cyan-400
                    bg-cyan-400
                    px-4
                    py-2
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-slate-950
                    transition-all
                    duration-300

                    hover:bg-transparent
                    hover:text-cyan-400
                  "
                >
                  View Behance Project

                  <ArrowUpRight
                    size={13}
                    className="
                      transition-transform
                      duration-300
                      group-hover/button:-translate-y-0.5
                      group-hover/button:translate-x-0.5
                    "
                  />
                </a>

                {/* Circle Arrow */}

                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-cyan-400
                    text-cyan-400
                    transition-all
                    duration-300

                    hover:bg-cyan-400
                    hover:text-slate-950
                  "
                >
                  <ArrowUpRight
                    size={13}
                  />
                </a>
              </>
            ) : (
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--border)]
                  px-4
                  py-2
                  text-[8px]
                  uppercase
                  tracking-[0.08em]
                  text-[var(--muted)]
                "
              >
                Behance Link Coming Soon
              </span>
            )}
          </div>

          {/* =================================================
              CLIENT
          ================================================= */}

          {project.client && (
            <div
              className="
                mt-7
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-[var(--subtle)]
                "
              >
                Client
              </span>

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[var(--muted)]
                "
              >
                {project.client}
              </span>
            </div>
          )}

          {/* =================================================
              LARGE NUMBER DECORATION
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-3
              right-5
              hidden
              text-[80px]
              font-semibold
              leading-none
              tracking-[-0.08em]
              text-cyan-400/[0.10]

              lg:block
            "
          >
            {projectNumber}
          </div>
        </div>
      </div>

      {/* =================================================
          BOTTOM META
      ================================================= */}

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          gap-4
          px-1
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-[var(--subtle)]
          "
        >
          <span>
            {projectNumber}
          </span>

          <span>/</span>

          <span>
            {category}
          </span>
        </div>

        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-1.5
              text-[8px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-cyan-400
              transition-colors
              hover:text-cyan-300
            "
          >
            View Project

            <ExternalLink
              size={10}
            />
          </a>
        )}
      </div>
    </motion.article>
  );
}