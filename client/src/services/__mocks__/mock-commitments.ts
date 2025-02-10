import { Commitment } from "../../common/types";

export const mockCommitments:Array<Commitment> = [
    { id: 1, assetClass: "Equity", amount: 1000, currency: "USD"},
    { id: 2, assetClass: "Debt", amount: 500, currency: "USD"},
    { id: 3, assetClass: "Equity", amount: 2000, currency: "USD"},
    { id: 4, assetClass: "Debt", amount: 100, currency: "USD"},
    { id: 5, assetClass: "Bond", amount: 3000, currency: "USD"},
] 