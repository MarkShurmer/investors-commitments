export type Investor = {
    id: number;
    name: string;
    type: string;
    dateAdded: string;
    address: string;
    totalCommitment: number;
};

export type Commitment = {   id: number; assetClass: string; amount: number; currency: string; };  