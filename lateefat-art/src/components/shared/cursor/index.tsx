import * as React from "react";

export function Cursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const pos = React.useRef({ x: -100, y: -100 });
  const ring = React.useRef({ x: -100, y: -100 });
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const bindElements = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => document.documentElement.classList.add("cur-link"));
        el.addEventListener("mouseleave", () => document.documentElement.classList.remove("cur-link"));
      });
      document.querySelectorAll("[data-cursor='view']").forEach((el) => {
        el.addEventListener("mouseenter", () => document.documentElement.classList.add("cur-media"));
        el.addEventListener("mouseleave", () => document.documentElement.classList.remove("cur-media"));
      });
    };

    bindElements();
    const mutObs = new MutationObserver(bindElements);
    mutObs.observe(document.body, { childList: true, subtree: true });

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("has-cursor");
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="clabel">View</span>
      </div>
    </>
  );
}
