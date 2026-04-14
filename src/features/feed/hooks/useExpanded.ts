import { useState } from "react";

export function useExpanded() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isExpanded = (id: string) => !!expanded[id];

  return { toggle, isExpanded };
}
