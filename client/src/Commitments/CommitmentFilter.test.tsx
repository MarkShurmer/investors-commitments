import { CommitmentFilter } from "./CommitmentFilter";
import {
  getAssetClasses,
  getInvestorTotalCommitment,
  getTotalCommitmentByAssetClass,
} from "../services/commitments-service";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("../services/commitments-service");

describe("Commitment filter component", () => {
  beforeAll(() => {
    vi.mocked(getInvestorTotalCommitment).mockReturnValue(15000000);
    vi.mocked(getTotalCommitmentByAssetClass).mockReturnValue(2000000);
  });

  it("should show all & listed asset classes as filters ", () => {
    vi.mocked(getAssetClasses).mockReturnValue(["Equity", "Debt"]);

    render(<CommitmentFilter selectedAssetClass="Equity" actionAssetFilter={vi.fn()} />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Equity")).toBeInTheDocument();
    expect(screen.getByText("Debt")).toBeInTheDocument();
  });

  it("should filter by Equity when we press it", async () => {
    const user = userEvent.setup();
    const mockActionAssetFilter = vi.fn();

    vi.mocked(getAssetClasses).mockReturnValue(["Equity", "Debt"]);
    render(<CommitmentFilter selectedAssetClass="Equity" actionAssetFilter={mockActionAssetFilter} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);

    await user.click(buttons[1]);

    expect(mockActionAssetFilter).toBeCalledWith("Equity");
  });

  it("should filter by Equity when we press it", async () => {
    const user = userEvent.setup();
    const mockActionAssetFilter = vi.fn();

    vi.mocked(getAssetClasses).mockReturnValue(["Equity", "Debt"]);
    render(<CommitmentFilter selectedAssetClass="Equity" actionAssetFilter={mockActionAssetFilter} />);

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(mockActionAssetFilter).toBeCalledWith("");
  });
});
