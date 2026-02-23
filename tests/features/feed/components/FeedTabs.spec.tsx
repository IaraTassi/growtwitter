import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { TabType } from "../../../../src/features/feed/types";
import { render, screen } from "@testing-library/react";
import { FeedTabs } from "../../../../src/features/feed/components/FeedTabs";
import { useState } from "react";

describe("FeedTabs", () => {
  it("renders both tabs with correct labels and switches tab on click", async () => {
    const user = userEvent.setup();

    function Wrapper() {
      const [tab, setTab] = useState<TabType>("foryou");
      return <FeedTabs tab={tab} setTab={setTab} />;
    }

    render(<Wrapper />);

    const tabParaVoce = screen.getByRole("tab", { name: /Para Você/i });
    const tabSeguindo = screen.getByRole("tab", { name: /Seguindo/i });

    expect(tabParaVoce).toBeInTheDocument();
    expect(tabSeguindo).toBeInTheDocument();

    expect(tabParaVoce).toHaveAttribute("aria-selected", "true");
    expect(tabSeguindo).toHaveAttribute("aria-selected", "false");

    await user.click(tabSeguindo);

    expect(tabParaVoce).toHaveAttribute("aria-selected", "false");
    expect(tabSeguindo).toHaveAttribute("aria-selected", "true");
  });
});
