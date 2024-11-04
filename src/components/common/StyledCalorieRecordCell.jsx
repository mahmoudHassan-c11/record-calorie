import styles from "./StyledCalorieRecordCell.module.css";
function StyledCalorieRecordCell(props) {
  return <div className={styles["styled-record-cell"]}>{props.children}</div>;
}

export default StyledCalorieRecordCell;
