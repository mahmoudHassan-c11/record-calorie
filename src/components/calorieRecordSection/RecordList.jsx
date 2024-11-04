import { useEffect, useState } from "react";
import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";

function RecordList(props) {
  const [totalCalories, setTotalCaloreis] = useState(0);
  // useEffect(() => {
  //   setTotalCaloreis(
  //     props.records.reduce((agg, curr) => {
  //       return +agg + +curr.calorie;
  //     }, 0)
  //   );
  // }, [props.records]);
  const result = props.records?.length ? (
    <ul>
      {props.records.map((record) => (
        <li key={record.id}>
          <CalorieRecord
            date={record.date}
            meal={record.meal}
            content={record.content}
            calorie={record.calorie}
            addCalories={setTotalCaloreis}
          ></CalorieRecord>
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.placehold}>No records found for this date</p>
  );
  return (
    <>
      {result}
      <label>Total Calories: {totalCalories}</label>
    </>
  );
}

export default RecordList;
