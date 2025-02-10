import { Investor } from "../common/types";

export async function fetchInvestors(): Promise<Array<Investor>> {

    const res = await fetch('http://localhost:5219/investors');
    const jsonRes = await res.json();
    return jsonRes as Array<Investor>;
}