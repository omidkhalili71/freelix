import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders Hello World as the only content", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main.children).toHaveLength(1);
    expect(screen.getByRole("heading").textContent).toBe("Hello World");
  });
});
