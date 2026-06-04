import * as React from "react";
import { Box, Text } from "@mantine/core";

export function Preloader() {
  const [status, setStatus] = React.useState<"idle" | "reveal" | "done">("idle");
  const [removed, setRemoved] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRemoved(true);
      return;
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const tReveal = setTimeout(() => {
      setStatus("reveal");
    }, 50);

    const tDone = setTimeout(() => {
      setStatus("done");
      document.body.style.overflow = "";
    }, 1500);

    const tRemove = setTimeout(() => {
      setRemoved(true);
    }, 2600);

    return () => {
      clearTimeout(tReveal);
      clearTimeout(tDone);
      clearTimeout(tRemove);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  return (
    <Box
      component="div"
      className={`preloader ${status === "reveal" ? "reveal" : ""} ${
        status === "done" ? "done" : ""
      }`}
      id="intro"
    >
      <Box className="pl-stage">
        <Text className="pl-mark">✦ Lateefat&nbsp;Art</Text>
        <Box className="pl-line">
          <Text component="span" className="pl-name">
            The world is your <i>canvas</i>
          </Text>
        </Box>
        <Text className="pl-sub">Multidisciplinary Artist &amp; Digital Couturier</Text>
      </Box>
      <Box className="pl-bar" />
    </Box>
  );
}
