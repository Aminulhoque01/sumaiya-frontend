 
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  Bot,
  Send,
  X,
  Sparkles,
  User,
  MessageCircle
} from "lucide-react";

import {
  AIMessage,
  useGetAIConfigQuery,
  useSendAIMessageMutation,
} from "@/src/redux/features/ai/aiApi";

/* =========================================================
   INITIAL MESSAGE
========================================================= */

const INITIAL_MESSAGE: AIMessage = {
  role: "assistant",
  content:
    "Hi! I'm Sumaiya's portfolio assistant. How can I help you?",
};

/* =========================================================
   QUICK QUESTIONS
========================================================= */

const suggestions = [
  "Tell me about Sumaiya",
  "What services does she offer?",
  "Show me her projects",
  "What are her skills?",
  "Tell me about her experience",
  "How can I contact her?",
  "What tools does she use?",
  "Tell me about her design process",
];

/* =========================================================
   COMPONENT
========================================================= */

export default function AIPortfolioAssistant() {
  const { data: config } =
    useGetAIConfigQuery();

  const [
    sendAIMessage,
    { isLoading },
  ] = useSendAIMessageMutation();

  const [isOpen, setIsOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState<AIMessage[]>([
      INITIAL_MESSAGE,
    ]);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  /* =======================================================
     🔊 NOTIFICATION SOUND
  ======================================================= */

  const playNotificationSound =
    useCallback(() => {
      try {
        const audio = new Audio(
          "/sounds/ai-notification.mp3"
        );

        audio.volume = 0.4;
        audio.currentTime = 0;

        const playPromise =
          audio.play();

        if (playPromise) {
          playPromise.catch((error) => {
            console.log(
              "AI notification sound was blocked:",
              error
            );
          });
        }
      } catch (error) {
        console.log(
          "Notification sound error:",
          error
        );
      }
    }, []);

  /* =======================================================
     🤖 AUTO OPEN AFTER 5 SECONDS
  ======================================================= */

  useEffect(() => {
    if (config?.enabled === false) {
      return;
    }

    const alreadyOpened =
      sessionStorage.getItem(
        "sumaiya-ai-auto-opened"
      );

    if (alreadyOpened) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);

      sessionStorage.setItem(
        "sumaiya-ai-auto-opened",
        "true"
      );

      // 🔊 Popup sound
      playNotificationSound();
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    config?.enabled,
    playNotificationSound,
  ]);

  /* =======================================================
     📜 AUTO SCROLL MESSAGES
  ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, isLoading]);

  /* =======================================================
     ❌ CLOSE CHAT
  ======================================================= */

  const handleClose = () => {
    setIsOpen(false);

    sessionStorage.setItem(
      "sumaiya-ai-auto-opened",
      "true"
    );
  };

  /* =======================================================
     💬 SEND MESSAGE
  ======================================================= */

  const handleSend = async (
    customMessage?: string
  ) => {
    const message =
      customMessage ?? input.trim();

    if (!message || isLoading) {
      return;
    }

    /* -----------------------------------------------
       USER MESSAGE
    ------------------------------------------------ */

    const userMessage: AIMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    /* -----------------------------------------------
       AI REQUEST
    ------------------------------------------------ */

    try {
      const response =
        await sendAIMessage({
          message,
        }).unwrap();

      const reply =
        response.data?.message ||
        response.data?.reply ||
        response.data?.answer ||
        response.reply ||
        response.answer ||
        "Sorry, I couldn't find an answer.";

      /* ---------------------------------------------
         AI MESSAGE
      --------------------------------------------- */

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);

      /* ---------------------------------------------
         🔊 AI REPLY SOUND
      --------------------------------------------- */

      playNotificationSound();
    } catch (error) {
      console.error(
        "AI message error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        },
      ]);

      // 🔊 Error notification
      playNotificationSound();
    }
  };

  /* =======================================================
     BACKEND DISABLED
  ======================================================= */

  if (config?.enabled === false) {
    return null;
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      {/* =================================================
          FLOATING AI BUTTON
      ================================================= */}

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => {
              setIsOpen(true);

              // 🔊 Manual open sound
              playNotificationSound();
            }}
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              fixed
              bottom-6
              right-6
              z-[100]
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[var(--foreground)]
              text-[var(--background)]
              shadow-[0_15px_50px_rgba(0,0,0,0.20)]
              transition-shadow
              duration-300
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]
            "
            aria-label="Open AI assistant"
          >
            <Bot size={23} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              fixed
              bottom-6
              right-6
              z-[100]

              flex
              h-[620px]
              max-h-[calc(100vh-48px)]
              w-[calc(100vw-32px)]
              max-w-[390px]
              flex-col

              overflow-hidden
              rounded-[28px]

              border
              border-[var(--border)]

              bg-[var(--card)]
              text-[var(--card-foreground)]

              shadow-[0_25px_80px_rgba(0,0,0,0.18)]

              backdrop-blur-xl
            "
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-[var(--border)]
                px-5
                py-4
              "
            >
              <div className="flex items-center gap-3">
                {/* AI Icon */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--foreground)]
                    text-[var(--background)]
                  "
                >
                  <Sparkles size={18} />
                </div>

                {/* Title */}

                <div>
                  <p className="text-sm font-semibold">
                    Sumaiya AI
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    Portfolio Assistant
                  </p>
                </div>
              </div>

              {/* Close Button */}

              <button
                type="button"
                onClick={handleClose}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[var(--muted)]
                  transition-all
                  duration-200
                  hover:bg-[var(--background)]
                  hover:text-[var(--foreground)]
                "
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* =================================================
                CHAT MESSAGES

                IMPORTANT:
                flex-1 + min-h-0
                makes ONLY this area scroll.
            ================================================= */}

            <div
              className="
                min-h-0
                flex-1
                space-y-4

                overflow-y-auto

                px-5
                py-5

                [scrollbar-width:thin]
                [scrollbar-color:var(--border-strong)_transparent]

                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[var(--border-strong)]
                [&::-webkit-scrollbar-thumb:hover]:bg-[var(--foreground)]
              "
            >
              {messages.map(
                (message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`
                      flex
                      gap-2
                      ${
                        message.role ===
                        "user"
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    {/* Assistant Icon */}

                    {message.role ===
                      "assistant" && (
                      <div
                        className="
                          mt-1
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[var(--foreground)]
                          text-[var(--background)]
                        "
                      >
                        <MessageCircle size={13} />
                      </div>
                    )}

                    {/* Message Bubble */}

                    <div
                      className={`
                        max-w-[80%]
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        leading-6
                        ${
                          message.role ===
                          "user"
                            ? "bg-[var(--foreground)] text-[var(--background)]"
                            : "bg-[var(--background)] text-[var(--foreground)]"
                        }
                      `}
                    >
                      {message.content}
                    </div>

                    {/* User Icon */}

                    {message.role ===
                      "user" && (
                      <div
                        className="
                          mt-1
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--border)]
                        "
                      >
                        <User size={13} />
                      </div>
                    )}
                  </div>
                )
              )}

              {/* =================================================
                  AI TYPING INDICATOR
              ================================================= */}

              {isLoading && (
                <div className="flex gap-2">
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--foreground)]
                      text-[var(--background)]
                    "
                  >
                    <MessageCircle  size={13} />
                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-[var(--background)]
                      px-4
                      py-3
                    "
                  >
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)]" />

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] [animation-delay:120ms]" />

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll Target */}

              <div ref={messagesEndRef} />
            </div>

            {/* =================================================
                QUICK QUESTIONS

                Horizontal scrolling
            ================================================= */}

            <div
              className="
                shrink-0
                border-t
                border-[var(--border)]
                px-5
                py-3
              "
            >
              <p
                className="
                  mb-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--muted)]
                "
              >
                Ask about
              </p>

              {/* Horizontal Scroll */}

              <div
                className="
                  w-full
                  overflow-x-auto
                  overflow-y-hidden
                  pb-2

                  [scrollbar-width:thin]
                  [scrollbar-color:var(--border-strong)_transparent]

                  [&::-webkit-scrollbar]:h-1.5
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-[var(--border-strong)]
                  [&::-webkit-scrollbar-thumb:hover]:bg-[var(--foreground)]
                "
              >
                <div
                  className="
                    flex
                    w-max
                    flex-nowrap
                    gap-2
                  "
                >
                  {suggestions.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          handleSend(
                            suggestion
                          )
                        }
                        disabled={isLoading}
                        className="
                          shrink-0
                          whitespace-nowrap
                          rounded-full
                          border
                          border-[var(--border)]
                          px-3
                          py-1.5
                          text-xs
                          text-[var(--muted)]
                          transition-all
                          duration-200

                          hover:border-[var(--border-strong)]
                          hover:bg-[var(--background)]
                          hover:text-[var(--foreground)]

                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                INPUT
            ================================================= */}

            <div
              className="
                shrink-0
                border-t
                border-[var(--border)]
                p-4
              "
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handleSend();
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--background)]
                  p-2
                "
              >
                {/* Input */}

                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  placeholder="Ask something..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-2
                    text-sm
                    outline-none
                    placeholder:text-[var(--subtle)]
                  "
                />

                {/* Send */}

                <button
                  type="submit"
                  disabled={
                    !input.trim() ||
                    isLoading
                  }
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--foreground)]
                    text-[var(--background)]
                    transition-all
                    duration-200
                    hover:scale-105
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
 
