import { Commitment } from "../common/types";
import { groupBy } from "lodash";

let investmentsByAssetClass: Partial<Record<string, Commitment[]>>;
let allInvestments: Commitment[] = [];

export async function fetchCommitments(investorId: number): Promise<Array<Commitment>> {
  const res = await fetch(`http://localhost:5219/investor/${investorId}`);
  const jsonRes = await res.json();

  investmentsByAssetClass = groupBy(jsonRes, (item: Commitment) => item.assetClass);
  allInvestments = jsonRes;
  return allInvestments;
}

export function getCommitmentsByAssetClass(assetClass: string): Commitment[] {
  if (assetClass.length > 0) {
    return investmentsByAssetClass[assetClass] || [];
  }

  return allInvestments;
}

export function getTotalCommitmentByAssetClass(assetClass: string): number {
  return getCommitmentsByAssetClass(assetClass).reduce((total, commitment) => total + commitment.amount, 0);
}

export function getAllCommitments(): Commitment[] {
  return allInvestments;
}

export function getInvestorTotalCommitment(): number {
  return allInvestments.reduce((total, commitment) => total + commitment.amount, 0);
}

export function getAssetClasses(): string[] {
  return Object.keys(investmentsByAssetClass);
}
