import { fetchCommitments, getAssetClasses } from "../services/commitments-service";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommitmentPage } from "./Commitment.page";
import { mockCommitments } from "../services/__mocks__/mock-commitments";
import { createRoutesStub } from "react-router";

vi.mock("../services/commitments-service");

describe("Commitment page", () => {
  beforeAll(() => {
    vi.mocked(getAssetClasses).mockReturnValue(["Equity", "Debt", "Option"]);
  });

  it("should display loading when no data", () => {
    const Stub = createRoutesStub([
      {
        path: "/commitment/1",
        Component: CommitmentPage,
      },
    ]);

    render(<Stub initialEntries={["/commitment/1"]} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display commitments when data is available", async () => {
    vi.mocked(fetchCommitments).mockResolvedValueOnce(mockCommitments);
    const Stub = createRoutesStub([
      {
        path: "/commitment/:inv_id",
        Component: CommitmentPage,
      },
    ]);

    render(<Stub initialEntries={["/commitment/1"]} />);

    const rows = await screen.findAllByRole("row");
    expect(rows.length).toBe(6);
    expect(rows[1].children[0].textContent).toBe("1");
    expect(rows[rows.length - 1].children[3].textContent).toBe("0.0M");
  });
});
