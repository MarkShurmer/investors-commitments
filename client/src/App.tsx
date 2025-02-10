import { Route, Routes } from "react-router";
import { InvestorsPage } from "./Investors/InvestorsPage";
import styles from "./App.module.css";
import { CommitmentPage } from "./Commitments/Commitment.page";

function App() {
  return (
    <section className={styles.container}>
      <h1>Investors and the commitments application</h1>
      <Routes>
        <Route path="/" element={<InvestorsPage />} />
        <Route path="/commitment/:inv_id" element={<CommitmentPage />} />
      </Routes>
    </section>
  );
}

export default App;
