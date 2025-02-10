import { mockCommitments } from "./__mocks__/mock-commitments";
import {
  fetchCommitments,
  getAllCommitments,
  getCommitmentsByAssetClass,
  getInvestorTotalCommitment,
  getTotalCommitmentByAssetClass,
} from "./commitments-service";
import { vi, describe, expect, beforeAll, it } from "vitest";
import { partialMock } from "partial-mock";
import { Commitment } from "../common/types";

export function createFetchResponse<TData>(data: TData): Response {
  return partialMock({
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
    status: 200,
  });
}

describe("Commitments service", () => {
  beforeAll(() => {
    vi.mocked(fetch).mockResolvedValue(createFetchResponse<Array<Commitment>>(mockCommitments));
  });

  it("should fetch commitments by investor id", async () => {
    const commitments = await fetchCommitments(1);
    expect(commitments).toBeInstanceOf(Array);
    expect(commitments.length).toBe(5);
    expect(commitments[0].id).toBe(1);
    expect(commitments[4].id).toBe(5);
  });

  it("should get commitments by asset class", () => {
    const commitments = getCommitmentsByAssetClass("Equity");
    expect(commitments).toBeInstanceOf(Array);
    expect(commitments.length).toBe(2);
    expect(commitments[0].amount).toBe(1000);
    expect(commitments[1].amount).toBe(2000);
  });

  it("should get total commitment by asset class", () => {
    const total = getTotalCommitmentByAssetClass("Equity");

    expect(total).toBe(3000);
  });

  it("should get total commitment for all", () => {
    const total = getInvestorTotalCommitment();

    expect(total).toBe(6600);
  });

  it("should get all the commitments ", () => {
    const commitments = getAllCommitments();

    expect(commitments.length).toBe(5);
    expect(commitments[0].id).toBe(1);
    expect(commitments[4].id).toBe(5);
  });

  it("should get all commitments when all asset classes are requested", () => {
    const commitments = getCommitmentsByAssetClass("");

    expect(commitments).toBeInstanceOf(Array);
    expect(commitments.length).toBe(5);
    expect(commitments[0].id).toBe(1);
    expect(commitments[4].id).toBe(5);
  });

  it("should return empty array for non existent asset class", () => {
    const commitments = getCommitmentsByAssetClass("Nonexistent");

    expect(commitments).toBeInstanceOf(Array);
    expect(commitments.length).toBe(0);
  });
});
