import { summariseNumber } from "../common/number-summariser";
import {
  getAssetClasses,
  getInvestorTotalCommitment,
  getTotalCommitmentByAssetClass,
} from "../services/commitments-service";
import styles from "./Commitment.module.css";

export type CommitmentFilterProps = {
  actionAssetFilter: (assetClass: string) => void;
  selectedAssetClass: string;
};

export function CommitmentFilter(props: CommitmentFilterProps) {
  const { actionAssetFilter, selectedAssetClass } = props;

  const getButtonStyle = (assetClass: string) => {
    return assetClass === selectedAssetClass ? styles.commitmentFilterItemActive : styles.commitmentFilterItem;
  };

  return (
    <div className={styles.commitmentFilter} role="region">
      <button className={getButtonStyle("")} onClick={() => actionAssetFilter("")}>
        <div>All</div>
        <div>£{summariseNumber(getInvestorTotalCommitment())}</div>
      </button>
      {getAssetClasses().map((assetClass) => (
        <button className={getButtonStyle(assetClass)} key={assetClass} onClick={() => actionAssetFilter(assetClass)}>
          <div>{assetClass}</div>
          <div>£{summariseNumber(getTotalCommitmentByAssetClass(assetClass), 0)}</div>
        </button>
      ))}
    </div>
  );
}
