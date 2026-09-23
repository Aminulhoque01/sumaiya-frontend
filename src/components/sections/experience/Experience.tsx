
"use client";

import {
  ExperienceItem,
  useGetExperiencesQuery,
} from "@/src/redux/features/experience/experienceApi";

import { motion, type Variants } from "framer-motion";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  MapPin,
  Sparkles,
} from "lucide-react";

/* =====================================================
   ANIMATIONS
===================================================== */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
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

/* =====================================================
   DATE HELPERS
===================================================== */

const formatDate = (date?: string): string => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatPeriod = (
  experience: ExperienceItem
): string => {
  const start = formatDate(
    experience.startDate
  );

  const end = experience.isCurrent
    ? "Present"
    : formatDate(experience.endDate);

  if (!start && !end) {
    return "";
  }

  return `${start} — ${end}`;
};

/* =====================================================
   EXPERIENCE
===================================================== */

export default function Experience() {
  const {
    data: experiences = [],
    isLoading,
    isError,
  } = useGetExperiencesQuery();

  const activeExperiences = [...experiences]
    .filter(
      (experience) =>
        experience.isActive !== false
    )
    .sort(
      (a, b) =>
        (a.order ?? 0) -
        (b.order ?? 0)
    );

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--background)]
        py-14
        md:py-22
        lg:py-20
      "
    >

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-60
          top-10
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-400/[0.035]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-60
          bottom-10
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-500/[0.035]
          blur-[120px]
        "
      />

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="container-main relative z-10">

        {/* =================================================
            HEADER
        ================================================= */}

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
            gap-10
            lg:grid-cols-[0.55fr_1.45fr]
            lg:gap-24
          "
        >

          {/* Small label */}

          <motion.div variants={itemVariants}>
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-cyan-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-cyan-400
                "
              >
                — Experience
              </span>
            </div>

           
          </motion.div>

          {/* Heading */}

          <motion.div variants={itemVariants}>

            <h2
              className="
                max-w-5xl
                text-[clamp(3.5rem,7vw,7rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.075em]
                text-[var(--foreground)]
              "
            >
              Professional
              <br />

              <span
                className="
                  text-[var(--subtle)]
                "
              >
                journey.
              </span>
            </h2>

            <div
              className="
                mt-8
                flex
                max-w-xl
                items-start
                gap-4
              "
            >
              <Sparkles
                size={17}
                strokeWidth={1.5}
                className="
                  mt-1
                  shrink-0
                  text-cyan-400
                "
              />

              <p
                className="
                  text-sm
                  leading-6
                  text-[var(--muted)]
                  md:text-base
                "
              >
                Every role has been an opportunity
                to learn, experiment and transform
                ideas into meaningful visual work.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            LOADING
        ================================================= */}

        {isLoading && (
          <ExperienceSkeleton />
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {isError && !isLoading && (
          <div
            className="
              mt-20
              rounded-[30px]
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-12
              text-center
            "
          >
            <p
              className="
                text-sm
                text-[var(--muted)]
              "
            >
              Unable to load experience data.
            </p>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!isLoading &&
          !isError &&
          activeExperiences.length === 0 && (
            <div
              className="
                mt-20
                rounded-[30px]
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-12
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-[var(--muted)]
                "
              >
                Experience information will
                be available soon.
              </p>
            </div>
          )}

        {/* =================================================
            EXPERIENCE TIMELINE
        ================================================= */}

        {!isLoading &&
          !isError &&
          activeExperiences.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.06,
              }}
              variants={containerVariants}
              className="
                relative
                mt-10
                md:mt-18
              "
            >

              {/* Vertical timeline */}

              <div
                className="
                  absolute
                  bottom-8
                  left-[15px]
                  top-2
                  hidden
                  w-px
                  bg-cyan-500
                  from-transparent
                  via-[var(--border)]
                  to-transparent
                  md:block
                "
              />

              <div className="space-y-6 md:space-y-8">

                {activeExperiences.map(
                  (
                    experience,
                    index
                  ) => (
                    <ExperienceCard
                      key={experience._id}
                      experience={experience}
                      index={index}
                    />
                  )
                )}

              </div>
            </motion.div>
          )}

    
        
      </div>
    </section>
  );
}

/* =====================================================
   EXPERIENCE CARD
===================================================== */

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

function ExperienceCard({
  experience,
  index,
}: ExperienceCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      className="
        group
        relative
        md:pl-10
      "
    >

      {/* Timeline dot */}

      <div
        className="
          absolute
          left-[9px]
          top-10
          hidden
          h-3
          w-3
          rounded-full
          border-2
          border-[var(--background)]
          bg-[var(--foreground)]
          shadow-[0_0_0_5px_var(--card)]
          transition-all
          duration-500
          group-hover:scale-125
          group-hover:bg-cyan-400
          md:block
        "
      />

      {/* =================================================
          CARD
      ================================================= */}

      <div
        className="
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
          hover:shadow-[0_30px_90px_rgba(0,0,0,0.08)]
          dark:hover:shadow-[0_30px_90px_rgba(0,0,0,0.32)]
          
        "
      >

        {/* Hover glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-64
            w-64
            rounded-full
            bg-cyan-400/0
            blur-3xl
            transition-all
            duration-700
            group-hover:bg-cyan-400/[0.06]
          "
        />

        <div
          className="
            relative
            z-10
            p-6
            md:p-9
            lg:p-10
          "
        >

          {/* =================================================
              TOP META
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-5
              border-b
              border-[var(--border)]
              pb-7
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            {/* Date */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--border)]
                  px-3.5
                  py-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-[var(--muted)]
                "
              >
                <CalendarDays
                  size={13}
                  strokeWidth={1.6}
                />

                <span>
                  {formatPeriod(
                    experience
                  )}
                </span>
              </div>

              {/* Current */}

              {experience.isCurrent && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-emerald-400/10
                    px-3.5
                    py-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-emerald-500
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      animate-pulse
                      rounded-full
                      bg-emerald-400
                    "
                  />

                  Current
                </span>
              )}
            </div>

            {/* Employment type */}

            {experience.employmentType && (
              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[var(--subtle)]
                "
              >
                {experience.employmentType}
              </span>
            )}
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="
              grid
              gap-10
              pt-8
              lg:grid-cols-[1fr_0.72fr]
              lg:gap-16
            "
          >

            {/* LEFT */}

            <div>

              {/* Company */}

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
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--background)]
                    text-[var(--foreground)]
                    transition-all
                    duration-500
                    group-hover:border-cyan-400/30
                    group-hover:bg-cyan-400/10
                    group-hover:text-cyan-400
                  "
                >
                  <BriefcaseBusiness
                    size={17}
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-[var(--subtle)]
                    "
                  >
                    Company
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      text-[var(--muted)]
                    "
                  >
                    {experience.company}
                  </p>
                </div>
              </div>

              {/* Position */}

              <h3
                className="
                  mt-7
                  text-3xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-[var(--foreground)]
                  md:text-5xl
                "
              >
                {experience.position}
              </h3>

              {/* Location */}

              {experience.location && (
                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-[var(--muted)]
                  "
                >
                  <MapPin
                    size={14}
                    strokeWidth={1.6}
                  />

                  <span>
                    {experience.location}
                  </span>
                </div>
              )}

              {/* Description */}

              {experience.description && (
                <p
                  className="
                    mt-7
                    max-w-2xl
                    text-sm
                    leading-7
                    text-[var(--muted)]
                    md:text-base
                  "
                >
                  {experience.description}
                </p>
              )}

            </div>

            {/* RIGHT — QUICK INFO */}

            <div
              className="
                rounded-[24px]
                border
                border-[var(--border)]
                bg-[var(--background)]/50
                p-5
                md:p-6
              "
            >

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[var(--subtle)]
                "
              >
                Role overview
              </p>

              <div
                className="
                  mt-5
                  space-y-4
                "
              >

                <InfoRow
                  label="Position"
                  value={
                    experience.position
                  }
                />

                <InfoRow
                  label="Company"
                  value={
                    experience.company
                  }
                />

                {experience.location && (
                  <InfoRow
                    label="Location"
                    value={
                      experience.location
                    }
                  />
                )}

                <InfoRow
                  label="Period"
                  value={formatPeriod(
                    experience
                  )}
                />

              </div>

            </div>
          </div>

          {/* =================================================
              RESPONSIBILITIES
          ================================================= */}

          {experience.responsibilities &&
            experience.responsibilities.length >
              0 && (
              <div
                className="
                  mt-10
                  border-t
                  border-[var(--border)]
                  pt-8
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-[var(--subtle)]
                    "
                  >
                    Responsibilities
                  </p>

                  <span
                    className="
                      text-[9px]
                      text-[var(--subtle)]
                    "
                  >
                    {String(
                      experience
                        .responsibilities
                        .length
                    ).padStart(2, "0")}{" "}
                    items
                  </span>
                </div>

                <div
                  className="
                    grid
                    gap-x-10
                    gap-y-3
                    sm:grid-cols-2
                  "
                >
                  {experience.responsibilities.map(
                    (
                      responsibility,
                      responsibilityIndex
                    ) => (
                      <div
                        key={`${responsibility}-${responsibilityIndex}`}
                        className="
                          group/item
                          flex
                          items-start
                          gap-3
                          text-sm
                          leading-6
                          text-[var(--muted)]
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[var(--border)]
                            transition-all
                            duration-300
                            group-hover/item:border-cyan-400/40
                            group-hover/item:bg-cyan-400/10
                          "
                        >
                          <Check
                            size={10}
                            strokeWidth={2}
                            className="
                              transition-colors
                              group-hover/item:text-cyan-400
                            "
                          />
                        </span>

                        <span>
                          {responsibility}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* =================================================
              TECHNOLOGIES
          ================================================= */}

          {experience.technologies &&
            experience.technologies.length >
              0 && (
              <div
                className="
                  mt-9
                  border-t
                  border-[var(--border)]
                  pt-7
                "
              >

                <p
                  className="
                    mb-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[var(--subtle)]
                  "
                >
                  Tools & Technologies
                </p>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {experience.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="
                          rounded-full
                          border
                          border-[var(--border)]
                          bg-[var(--background)]
                          px-3.5
                          py-2
                          text-[10px]
                          font-medium
                          text-[var(--muted)]
                          transition-all
                          duration-300
                          hover:border-cyan-400/40
                          hover:bg-cyan-400/5
                          hover:text-cyan-400
                        "
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              mt-9
              flex
              items-center
              justify-between
              border-t
              border-[var(--border)]
              pt-6
            "
          >

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[var(--subtle)]
              "
            >
              Experience{" "}
              {String(index + 1).padStart(
                2,
                "0"
              )}
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
                border-[var(--border)]
                text-[var(--foreground)]
                transition-all
                duration-500
                group-hover:rotate-45
                group-hover:border-cyan-400/40
                group-hover:bg-cyan-400/10
                group-hover:text-cyan-400
              "
            >
              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
              />
            </div>
          </div>

        </div>
      </div>
    </motion.article>
  );
}

/* =====================================================
   INFO ROW
===================================================== */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        border-b
        border-[var(--border)]
        pb-3
        last:border-0
        last:pb-0
      "
    >
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-[var(--subtle)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-xs
          font-medium
          leading-5
          text-[var(--foreground)]
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =====================================================
   SKELETON
===================================================== */

function ExperienceSkeleton() {
  return (
    <div
      className="
        mt-20
        space-y-6
        md:mt-28
      "
    >
      {[1, 2].map((item) => (
        <div
          key={item}
          className="
            min-h-[500px]
            animate-pulse
            rounded-[30px]
            border
            border-[var(--border)]
            bg-[var(--card)]
            p-7
            md:p-10
          "
        >
          {/* top */}

          <div
            className="
              flex
              justify-between
            "
          >
            <div
              className="
                h-9
                w-40
                rounded-full
                bg-[var(--border)]
              "
            />

            <div
              className="
                h-4
                w-24
                rounded
                bg-[var(--border)]
              "
            />
          </div>

          {/* content */}

          <div
            className="
              mt-10
              grid
              gap-10
              lg:grid-cols-[1fr_0.7fr]
            "
          >
            <div>
              <div
                className="
                  h-10
                  w-12
                  rounded-xl
                  bg-[var(--border)]
                "
              />

              <div
                className="
                  mt-6
                  h-12
                  w-3/4
                  rounded
                  bg-[var(--border)]
                "
              />

              <div
                className="
                  mt-3
                  h-5
                  w-1/3
                  rounded
                  bg-[var(--border)]
                "
              />

              <div
                className="
                  mt-7
                  h-5
                  w-full
                  rounded
                  bg-[var(--border)]
                "
              />

              <div
                className="
                  mt-2
                  h-5
                  w-4/5
                  rounded
                  bg-[var(--border)]
                "
              />
            </div>

            <div
              className="
                h-48
                rounded-[24px]
                bg-[var(--border)]
              "
            />
          </div>

          {/* responsibilities */}

          <div
            className="
              mt-10
              border-t
              border-[var(--border)]
              pt-8
            "
          >
            <div
              className="
                h-4
                w-32
                rounded
                bg-[var(--border)]
              "
            />

            <div
              className="
                mt-6
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              {[1, 2, 3, 4].map(
                (feature) => (
                  <div
                    key={feature}
                    className="
                      h-5
                      rounded
                      bg-[var(--border)]
                    "
                  />
                )
              )}
            </div>
          </div>

          {/* technologies */}

          <div
            className="
              mt-8
              flex
              gap-2
            "
          >
            {[1, 2, 3, 4].map(
              (tag) => (
                <div
                  key={tag}
                  className="
                    h-8
                    w-20
                    rounded-full
                    bg-[var(--border)]
                  "
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
 
