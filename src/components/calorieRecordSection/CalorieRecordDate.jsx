import styles from "./CalorieRecordDate.module.css";
import StyledCalorieRecordCell from "../common/StyledCalorieRecordCell";
function CalorieRecordDate(props) {
  const month = props.date.toLocaleString("default", { month: "long" });
  const day = props.date.getDate();
  const year = props.date.getFullYear();
  return (
    <StyledCalorieRecordCell>
      <div className={styles.month}>{month}</div>
      <div className={styles.day}>{day}</div>
      <div className={styles.year}>{year}</div>
    </StyledCalorieRecordCell>
  );
}

export default CalorieRecordDate;
