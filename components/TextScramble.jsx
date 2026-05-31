"use client";

import { useEffect, useMemo, useState } from "react";
import { Scrambler } from "@/lib/scramble";

/**
 * TextScramble
 * - Readable micro-interaction (partial scramble, fast resolve).
 * - Best used sparingly: CTAs, small labels, section headings.
 *
 * If you apply this to every title, it reads as "the text keeps changing".
 * This repo intentionally avoids that mistake.
 */
export default function TextScramble({
  text,
  as: Tag = "span",
  className = "",
  scrambleOn = "hover", // "hover" | "always" | "none"
  duration = 320,
  intensity = 0.28,
}) {
  const [value, setValue] = useState(text);

  const scrambler = useMemo(() => new Scrambler(setValue), []);
  useEffect(() => () => scrambler.destroy(), [scrambler]);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const trigger = () => {
    if (scrambleOn === "none") return;
    scrambler.setText(text, { duration, intensity });
  };

  const props =
    scrambleOn === "always"
      ? {}
      : {
          onMouseEnter: trigger,
          onFocus: trigger,
        };

  return (
    <Tag className={className} {...props}>
      {value}
    </Tag>
  );
}
