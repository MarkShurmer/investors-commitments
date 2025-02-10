import { Investor } from "../../common/types";

export const mockInvestors: Array<Investor> = [
  {
    id: 1,
    name: "John Doe",
    type: "Individual",
    dateAdded: "2022-01-01",
    address: "123 Main St",
    totalCommitment: 100000,
  },
  { id: 2, name: "The bank", type: "bank", dateAdded: "2022-02-01", address: "456 Elm St", totalCommitment: 500_000 },
];
