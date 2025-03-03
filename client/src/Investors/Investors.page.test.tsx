import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockInvestors } from "./__mocks__/mock-investors";
import { InvestorsPage } from "./InvestorsPage";
import { fetchInvestors } from "../services/investors-service";
import { createRoutesStub } from "react-router";

vi.mock("../services/investors-service");

describe("Investors Page", () => {
  it("should show header", async () => {
    vi.mocked(fetchInvestors).mockResolvedValueOnce(mockInvestors);
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: InvestorsPage,
      },
    ]);

    render(<Stub initialEntries={["/"]} />);

    expect(screen.getByText("Investors")).toBeInTheDocument();
  });

  it("should show table and both mock entries", async () => {
    vi.mocked(fetchInvestors).mockResolvedValueOnce(mockInvestors);
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: InvestorsPage,
      },
    ]);

    render(<Stub initialEntries={["/"]} />);

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("The bank")).toBeInTheDocument();
  });

  it("should show link for each investor", async () => {
    vi.mocked(fetchInvestors).mockResolvedValueOnce(mockInvestors);
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: InvestorsPage,
      },
    ]);

    render(<Stub initialEntries={["/"]} />);

    const links = (await screen.findAllByRole("link")) as Array<HTMLLinkElement>;

    expect(links.length).toBe(mockInvestors.length);

    expect(links[0].href).toBe("http://localhost:3000/commitment/1");
    expect(links[1].href).toBe("http://localhost:3000/commitment/2");
  });
});
