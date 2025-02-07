import { Route, Routes } from "react-router";
import { InvestorsPage } from "./Investors/InvestorsPage";
import styles from "./App.module.css";

function App() {
  return (
    <section className={styles.container}>
      <h1>Investors and the commitments application</h1>
      <Routes>
        <Route path="/" element={<InvestorsPage />} />
      </Routes>
    </section>
  );
}

export default App;
