import { useState, useEffect } from "react";
import { Commitment } from "../common/types";
import { fetchCommitments, getCommitmentsByAssetClass } from "../services/commitments-service";
import { useParams } from "react-router-dom";
import { summariseNumber } from "../common/number-summariser";
import styles from "./Commitment.module.css";
import { CommitmentFilter } from "./CommitmentFilter";

export function CommitmentPage() {
  const { inv_id } = useParams<{ inv_id: string }>();
  const [data, setData] = useState<Array<Commitment>>([]);
  const [selectedAssetClass, setSelectedAssetClass] = useState("");

  useEffect(() => {
    if (inv_id) {
      fetchCommitments(parseInt(inv_id)).then((data) => setData(data));
    }
  }, []);

  const actionAssetFilter = (assetClass: string) => {
    setSelectedAssetClass(assetClass);
    setData(getCommitmentsByAssetClass(assetClass));
  };

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.commitmentsSection} role="contentinfo">
      <h2>Commitments</h2>
      <CommitmentFilter actionAssetFilter={actionAssetFilter} selectedAssetClass={selectedAssetClass} />
      <table className={styles.commitmentsList}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Asset Class</th>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((investment) => (
            <tr key={investment.id}>
              <td>{investment.id}</td>
              <td>{investment.assetClass}</td>
              <td>{investment.currency}</td>
              <td>{summariseNumber(investment.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
