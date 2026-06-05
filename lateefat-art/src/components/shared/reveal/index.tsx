import * as React from "react";

export function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const observeNewElements = () => {
      const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
      els.forEach((el) => {
        io.observe(el);
      });
    };

    // Initial check
    observeNewElements();

    // Observe body for addition of new DOM elements
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      io.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function Reveal({ children, delay, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
