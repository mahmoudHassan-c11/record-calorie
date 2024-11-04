import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledCalorieRecordCell from "../common/StyledCalorieRecordCell";
import { useEffect } from "react";

function CalorieRecord(props) {
  if (props.calorie < 0) {
    return null;
  }
  useEffect(() => {
    props.addCalories((prevTotal) => prevTotal + props.calorie);
    return () => {
      props.addCalories((prevTotal) => prevTotal - props.calorie);
    };
  }, []);
  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li>
        <StyledCalorieRecordCell>{props.calorie}</StyledCalorieRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
