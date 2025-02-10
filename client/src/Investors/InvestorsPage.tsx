import { useEffect, useState } from "react";
import styles from "./Investors.module.css";
import { Investor } from "../common/types";
import { summariseNumber } from "../common/number-summariser";
import { fetchInvestors } from "../services/investors-service";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export function InvestorsPage() {
  const [data, setData] = useState<Array<Investor>>([]);

  useEffect(() => {
    fetchInvestors().then((data) => setData(data));
  }, []);

  return (
    <section className={styles.investorsSection} role="contentinfo">
      <h2>Investors</h2>
      <table className={styles.investorsList}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date Added</th>
            <th>Address</th>
            <th>Total Commitment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((investor) => (
            <tr key={investor.id}>
              <td>{investor.id}</td>
              <td>{investor.name}</td>
              <td>{investor.type}</td>
              <td>{format(investor.dateAdded, "MMMM do, yyyy")}</td>
              <td>{investor.address}</td>
              <td>
                <Link to={`/commitment/${investor.id}`}> {summariseNumber(investor.totalCommitment)}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
