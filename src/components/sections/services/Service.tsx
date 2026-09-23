 
"use client";

import {
  Service,
  useGetServicesQuery,
} from "@/src/redux/features/service/serviceApi";

import { motion, type Variants } from "framer-motion";

import {
  ArrowUpRight,
  Layers3,
  Palette,
  Package,
  PenTool,
  Sparkles,
  Megaphone,
  Image as ImageIcon,
  Type,
  Monitor,
  Check,
} from "lucide-react";

import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

/* =====================================================
   ANIMATION
===================================================== */

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

/* =====================================================
   ICON MAP
===================================================== */

const iconMap: Record<string, React.ElementType> = {
  branding: Palette,
  "brand identity": Palette,

  "graphic design": PenTool,

  packaging: Package,
  "packaging design": Package,

  "social media": Layers3,
  "social media design": Layers3,

  advertising: Megaphone,
  "advertising design": Megaphone,

  poster: ImageIcon,
  "poster design": ImageIcon,

  typography: Type,

  "ui design": Monitor,
  ui: Monitor,

  "creative direction": Sparkles,

  default: Sparkles,
};

/* =====================================================
   SERVICE ICON
===================================================== */

function getServiceIcon(service: Service) {
  const title = service.title.trim().toLowerCase();

  const exactIcon = iconMap[title];

  if (exactIcon) {
    return exactIcon;
  }

  const matchedIcon = Object.entries(iconMap).find(
    ([key]) => title.includes(key)
  )?.[1];

  return matchedIcon || iconMap.default;
}

/* =====================================================
   SERVICES SECTION
===================================================== */

export default function Services() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useGetServicesQuery();

  const visibleServices = [...services]
    .filter((service) => service.isActive !== false)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0)
    );

  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        border-t
        border-[var(--border)]
        bg-[var(--background)]
        py-10
        md:py-18
        lg:py-16
      "
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-96
          w-96
          rounded-full
          bg-cyan-400/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-10
          h-96
          w-96
          rounded-full
          bg-purple-500/5
          blur-3xl
        "
      />

      <div className="container-main relative z-10">

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
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Left */}

          <div className="max-w-4xl">

            {/* Eyebrow */}

            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
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
                Services
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                text-[clamp(3.2rem,7vw,7rem)]
                font-medium
                leading-[0.86]
                tracking-[-0.07em]
                text-[var(--foreground)]
              "
            >
              What I
              <span
                className="
                  ml-3
                  text-[var(--subtle)]
                "
              >
                do Best.
              </span>
            </h2>
          </div>

          {/* Right description */}

          <div
            className="
              max-w-sm
              lg:pb-2
            "
          >
            
          </div>
        </motion.div>

        {/* =================================================
            SERVICE GRID
        ================================================= */}

        <div className="mt-16 md:mt-24">

          {/* Loading */}

          {isLoading && <ServiceSkeleton />}

          {/* Error */}

          {isError && (
            <div
              className="
                rounded-[28px]
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
                Unable to load services.
              </p>
            </div>
          )}

          {/* Empty */}

          {!isLoading &&
            !isError &&
            visibleServices.length === 0 && (
              <div
                className="
                  rounded-[28px]
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
                  No services available yet.
                </p>
              </div>
            )}

          {/* Services */}

          {!isLoading &&
            !isError &&
            visibleServices.length > 0 && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  lg:grid-cols-4
                "
              >
                {visibleServices.map(
                  (service, index) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                      index={index}
                    />
                  )
                )}
              </div>
            )}
        </div>

        {/* =================================================
            BOTTOM LINE
        ================================================= */}
 
      </div>
    </section>
  );
}

/* =====================================================
   SERVICE CARD
===================================================== */

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
  const Icon = getServiceIcon(service);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        flex
        min-h-[500px]
        flex-col
        overflow-hidden
        rounded-[30px]
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-6
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[var(--border-strong)]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)]
        dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        md:p-7
      "
    >

      {/* =================================================
          HOVER IMAGE
      ================================================= */}

      {service.image?.url && (
        <div
          className="
            absolute
            inset-0
            overflow-hidden
            opacity-0
            transition-opacity
            duration-700
            group-hover:opacity-100
          "
        >
          <Image
            src={service.image.url}
            alt={
              service.image.alt ||
              service.title
            }
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-[1200ms]
              group-hover:scale-110
            "
          />

          {/* Dark overlay */}

          <div
            className="
              absolute
              inset-0
              bg-black/70
            "
          />

          {/* Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/30
              to-transparent
            "
          />
        </div>
      )}

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
        "
      >

        {/* =================================================
            TOP ROW
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          {/* Number */}

          <span
            className="
              text-[10px]
              font-medium
              tracking-[0.25em]
              text-[var(--subtle)]
              transition-colors
              duration-500
              group-hover:text-white/60
            "
          >
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>

          {/* Arrow */}

          <div
            className="
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
              duration-500
              group-hover:rotate-45
              group-hover:border-white
              group-hover:bg-white
              group-hover:text-black
            "
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* =================================================
            ICON
        ================================================= */}

        <div
          className="
            mt-14
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[20px]
            border
            border-[var(--border)]
            bg-[var(--background)]
            text-[var(--foreground)]
            shadow-sm
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:border-white/30
            group-hover:bg-white/10
            group-hover:text-white
          "
        >
          <Icon
            size={26}
            strokeWidth={1.35}
          />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            mt-7
            max-w-[280px]
            text-[27px]
            font-medium
            leading-[1]
            tracking-[-0.05em]
            text-[var(--foreground)]
            transition-colors
            duration-500
            group-hover:text-white
          "
        >
          {service.title}
        </h3>

       
        {/* =================================================
            DESCRIPTION
        ================================================= */}

        {service.description && (
          <p
            className="
              mt-3
              max-w-[290px]
              text-xs
              leading-5
              text-[var(--muted)]
              transition-colors
              duration-500
              group-hover:text-white/65
            "
          >
            {service.description}
          </p>
        )}

        {/* =================================================
            FEATURES
        ================================================= */}

        {service.features &&
          service.features.length > 0 && (
            <div
              className="
                mt-6
                space-y-2
              "
            >
              {service.features
                .slice(0, 4)
                .map(
                  (
                    feature: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined,
                    featureIndex: any
                  ) => (
                    <div
                      key={`${feature}-${featureIndex}`}
                      className="
                        flex
                        items-center
                        gap-2.5
                        text-[11px]
                        text-[var(--muted)]
                        transition-colors
                        duration-500
                        group-hover:text-white/75
                      "
                    >
                      <span
                        className="
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[var(--foreground)]/5
                          text-[var(--foreground)]
                          transition-all
                          duration-500
                          group-hover:bg-white/15
                          group-hover:text-white
                        "
                      >
                        <Check
                          size={10}
                          strokeWidth={2.2}
                        />
                      </span>

                      <span>
                        {feature}
                      </span>
                    </div>
                  )
                )}
            </div>
          )}

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="mt-auto pt-8">

          <div
            className="
              h-px
              w-full
              bg-[var(--border)]
              transition-colors
              duration-500
              group-hover:bg-white/20
            "
          />

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[var(--subtle)]
                transition-colors
                duration-500
                group-hover:text-white/45
              "
            >
              Design service
            </span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[var(--foreground)]
                transition-colors
                duration-500
                group-hover:bg-white
              "
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =====================================================
   SKELETON
===================================================== */

function ServiceSkeleton() {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {[1, 2, 3, 4].map((item) => (
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
          "
        >
          {/* top */}

          <div className="flex justify-between">
            <div
              className="
                h-3
                w-6
                rounded
                bg-[var(--border)]
              "
            />

            <div
              className="
                h-11
                w-11
                rounded-full
                bg-[var(--border)]
              "
            />
          </div>

          {/* icon */}

          <div
            className="
              mt-14
              h-16
              w-16
              rounded-[20px]
              bg-[var(--border)]
            "
          />

          {/* title */}

          <div
            className="
              mt-7
              h-8
              w-3/4
              rounded
              bg-[var(--border)]
            "
          />

          {/* short description */}

          <div
            className="
              mt-4
              h-4
              w-1/2
              rounded
              bg-[var(--border)]
            "
          />

          {/* description */}

          <div
            className="
              mt-3
              h-4
              w-full
              rounded
              bg-[var(--border)]
            "
          />

          <div
            className="
              mt-2
              h-4
              w-4/5
              rounded
              bg-[var(--border)]
            "
          />

          {/* features */}

          <div className="mt-6 space-y-3">
            {[1, 2, 3].map(
              (feature) => (
                <div
                  key={feature}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      h-4
                      w-4
                      rounded-full
                      bg-[var(--border)]
                    "
                  />

                  <div
                    className="
                      h-3
                      w-2/3
                      rounded
                      bg-[var(--border)]
                    "
                  />
                </div>
              )
            )}
          </div>

          {/* bottom */}

          <div
            className="
              mt-10
              h-px
              w-full
              bg-[var(--border)]
            "
          />
        </div>
      ))}
    </div>
  );
}
 
