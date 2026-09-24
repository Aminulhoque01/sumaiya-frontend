"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sumaiya-backend.vercel.app/api";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

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
    y: 30,
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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sumaiyasiddiqa823@gmail.com",
    href: "mailto:sumaiyasiddiqa823@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1624884128",
    href: "tel:+8801624884128",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Dhaka, Bangladesh",
  },
];

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] =
    useState<ContactFormData>(initialForm);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch(
        `${API_URL}/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
      setFormData(initialForm);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[var(--background)]
        py-14
        transition-colors
        duration-500
        md:py-12
        lg:py-20
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-[var(--border)]
          opacity-40
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          top-40
          h-[320px]
          w-[320px]
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
          left-[-120px]
          bottom-[-180px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[var(--foreground)]
          opacity-[0.025]
          blur-3xl
        "
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={containerVariants}
          className="mb-16 md:mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="
              mb-7
              flex
              items-center
              gap-3
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-[var(--muted)]
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-500
              "
            />

             — Contact
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="
              max-w-5xl
              text-[clamp(3.2rem,8vw,8.5rem)]
              font-medium
              leading-[0.88]
              tracking-[-0.065em]
              text-[var(--foreground)]
            "
          >
            Let&apos;s create
            <br />

            <span className="text-[var(--muted)]">
              something meaningful.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="
              mt-8
              max-w-2xl
              text-base
              leading-7
              text-[var(--muted)]
              md:text-lg
              md:leading-8
            "
          >
            Have a project in mind, a brand to build,
            or simply want to say hello? Send a message
            and let&apos;s start a conversation.
          </motion.p>
        </motion.div>

        {/* Main contact layout */}
        <div
          className="
            grid
            gap-8
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-10
          "
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-7
              md:p-9
              lg:p-10
            "
          >
            {/* Top glow */}
            <div
              aria-hidden="true"
              className="
                absolute
                -right-16
                -top-16
                h-40
                w-40
                rounded-full
                bg-[var(--foreground)]
                opacity-[0.035]
                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  mb-10
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--background)]
                  text-[var(--foreground)]
                "
              >
                <Send
                  size={22}
                  strokeWidth={1.5}
                />
              </div>

              <p
                className="
                  mb-3
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[var(--muted)]
                "
              >
                Start a conversation
              </p>

              <h3
                className="
                  max-w-sm
                  text-3xl
                  font-medium
                  leading-tight
                  tracking-[-0.04em]
                  text-[var(--foreground)]
                  md:text-4xl
                "
              >
                Have something
                <br />
                <span className="text-[var(--muted)]">
                  interesting in mind?
                </span>
              </h3>

              <p
                className="
                  mt-5
                  max-w-md
                  text-sm
                  leading-6
                  text-[var(--muted)]
                "
              >
                Whether it&apos;s a new brand identity,
                social campaign, digital design or a
                completely different idea, Sumaiya would
                love to hear about it.
              </p>

              {/* Contact information */}
              <div
                className="
                  mt-10
                  divide-y
                  divide-[var(--border)]
                  border-y
                  border-[var(--border)]
                "
              >
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        gap-4
                        py-5
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[var(--border)]
                            bg-[var(--background)]
                            text-[var(--foreground)]
                            transition-transform
                            duration-300
                            group-hover:scale-105
                          "
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.6}
                          />
                        </div>

                        <div>
                          <p
                            className="
                              mb-1
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-[0.18em]
                              text-[var(--subtle)]
                            "
                          >
                            {item.label}
                          </p>

                          <p
                            className="
                              text-sm
                              font-medium
                              text-[var(--foreground)]
                              break-all
                            "
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>

                      {item.href && (
                        <ArrowUpRight
                          size={17}
                          className="
                            shrink-0
                            text-[var(--muted)]
                            transition-transform
                            duration-300
                            group-hover:-translate-y-1
                            group-hover:translate-x-1
                            group-hover:text-[var(--foreground)]
                          "
                        />
                      )}
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Availability */}
              <div
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--background)]
                  px-4
                  py-2.5
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[var(--foreground)]
                      opacity-50
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-cyan-500
                    "
                  />
                </span>

                <span
                  className="
                    text-xs
                    font-medium
                    text-[var(--foreground)]
                  "
                >
                  Available for new projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              rounded-[2rem]
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-6
              md:p-9
              lg:p-10
            "
          >
            {submitted ? (
              <div
                className="
                  flex
                  min-h-[600px]
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <motion.div
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    mb-7
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--foreground)]
                    text-[var(--background)]
                  "
                >
                  <Check
                    size={32}
                    strokeWidth={2}
                  />
                </motion.div>

                <h3
                  className="
                    text-4xl
                    font-medium
                    tracking-[-0.04em]
                    text-[var(--foreground)]
                    md:text-5xl
                  "
                >
                  Message received.
                </h3>

                <p
                  className="
                    mt-5
                    max-w-md
                    text-sm
                    leading-6
                    text-[var(--muted)]
                  "
                >
                  Thank you for reaching out. Your
                  message has been sent successfully.
                  Sumaiya will get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="
                    mt-8
                    rounded-full
                    border
                    border-[var(--border)]
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-[var(--foreground)]
                    transition-all
                    duration-300
                    hover:border-[var(--border-strong)]
                    hover:bg-[var(--background)]
                  "
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                {/* Form heading */}
                <div className="mb-9">
                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-2
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-[var(--muted)]
                    "
                  >
                    <Sparkles size={14} />

                    Get in touch
                  </div>

                  <h3
                    className="
                      text-3xl
                      font-medium
                      tracking-[-0.04em]
                      text-[var(--foreground)]
                      md:text-4xl
                    "
                  >
                    Tell me about
                    <br />
                    <span className="text-[var(--muted)]">
                      your project.
                    </span>
                  </h3>
                </div>

                {/* Name + Email */}
                <div
                  className="
                    grid
                    gap-6
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2.5
                        block
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[var(--muted)]
                      "
                    >
                      Your name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--background)]
                        px-5
                        text-sm
                        text-[var(--foreground)]
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-[var(--subtle)]
                        focus:border-[var(--foreground)]
                        focus:ring-2
                        focus:ring-[var(--foreground)]/5
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2.5
                        block
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[var(--muted)]
                      "
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--background)]
                        px-5
                        text-sm
                        text-[var(--foreground)]
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-[var(--subtle)]
                        focus:border-[var(--foreground)]
                        focus:ring-2
                        focus:ring-[var(--foreground)]/5
                      "
                    />
                  </div>
                </div>

                {/* Phone + Subject */}
                <div
                  className="
                    grid
                    gap-6
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="phone"
                      className="
                        mb-2.5
                        block
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[var(--muted)]
                      "
                    >
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXXXXXXXX"
                      required
                      className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--background)]
                        px-5
                        text-sm
                        text-[var(--foreground)]
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-[var(--subtle)]
                        focus:border-[var(--foreground)]
                        focus:ring-2
                        focus:ring-[var(--foreground)]/5
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="
                        mb-2.5
                        block
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[var(--muted)]
                      "
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brand Identity Project"
                      required
                      className="
                        h-14
                        w-full
                        rounded-2xl
                        border
                        border-[var(--border)]
                        bg-[var(--background)]
                        px-5
                        text-sm
                        text-[var(--foreground)]
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-[var(--subtle)]
                        focus:border-[var(--foreground)]
                        focus:ring-2
                        focus:ring-[var(--foreground)]/5
                      "
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="
                      mb-2.5
                      block
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-[var(--muted)]
                    "
                  >
                    Your message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me a little about your project, goals and what you have in mind..."
                    required
                    rows={7}
                    className="
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--background)]
                      px-5
                      py-4
                      text-sm
                      leading-6
                      text-[var(--foreground)]
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-[var(--subtle)]
                      focus:border-[var(--foreground)]
                      focus:ring-2
                      focus:ring-[var(--foreground)]/5
                    "
                  />
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-red-500/20
                      bg-red-500/5
                      px-4
                      py-3
                      text-sm
                      leading-6
                      text-red-500
                    "
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group
                    flex
                    min-h-14
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[var(--foreground)]
                    px-7
                    text-sm
                    font-medium
                    text-[var(--background)]
                    transition-all
                    duration-300
                    hover:scale-[1.01]
                    hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Sending message...
                    </>
                  ) : (
                    <>
                      Send message

                      <ArrowUpRight
                        size={18}
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          
                        "
                      />
                    </>
                  )}
                </button>

                <p
                  className="
                    text-center
                    text-[11px]
                    leading-5
                    text-[var(--subtle)]
                  "
                >
                  Your message will be securely sent
                  to Sumaiya&apos;s portfolio dashboard.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}