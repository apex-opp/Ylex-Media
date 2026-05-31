"use client";

import { useEffect, useMemo, useState } from "react";
import { Scrambler } from "@/lib/scramble";

/**
 * TextScramble
 * - Renders text that briefly scrambles on hover/focus and settles back.
 * - Works for headings, links, and buttons.
 */
export default function TextScramble({
  text,
  as: Tag = "span",
  className = "",
  scrambleOn = "hover", // "hover" | "always" | "none"
  duration = 520,
}) {
  const [value, setValue] = useState(text);

  const scrambler = useMemo(() => new Scrambler(setValue), []);
  useEffect(() => () => scrambler.destroy(), [scrambler]);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const trigger = () => {
    if (scrambleOn === "none") return;
    scrambler.setText(text, { duration });
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
