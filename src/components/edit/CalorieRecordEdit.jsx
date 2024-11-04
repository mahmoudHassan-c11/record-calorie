import { useEffect, useReducer, useState } from "react";
import styles from "./CalorieRecordEdit.module.css";
const DEFAULT_VALUE = {
  date: { value: "", valid: false },
  meal: { value: "BreakeFast", valid: true },
  content: { value: "", valid: false },
  calorie: { value: 0, valid: true },
};
function fromReducer(state, action) {
  const { type, key, value } = action;
  if (type === "RESET") {
    return DEFAULT_VALUE;
  }
  let valid = false;

  switch (key) {
    case "content":
      valid =
        (value === "sport" && state.calorie.value < 0) ||
        (value !== "sport" && state.calorie.value >= 0);
      return {
        ...state,
        content: { value, valid: !!value },
        calorie: { ...state.calorie, valid },
      };

    case "calorie":
      valid =
        (state.content.value === "sport" && value < 0) ||
        (state.content.value !== "sport" && value >= 0);
      return {
        ...state,
        calorie: { value, valid },
      };
    default:
      return {
        ...state,
        [key]: { value, valid: !!value },
      };
  }
}
function CalorieRecordEdit(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formState, dispatshFun] = useReducer(fromReducer, DEFAULT_VALUE);
  const {
    date: { valid: isDateValid },
    content: { valid: isContentValid },
    calorie: { valid: isCalorieValid },
  } = formState;

  useEffect(() => {
    setIsFormValid(isDateValid && isContentValid && isCalorieValid);
  }, [isDateValid, isContentValid, isCalorieValid]);

  const onDateChangeHundler = (event) => {
    dispatshFun({
      type: "UPDATE_FIELD",
      key: "date",
      value: event.target.value,
    });
    // setDateValue(event.target.value);
  };
  const onMealChangeHundler = (event) => {
    // setMealValue(event.target.value);
    dispatshFun({
      type: "UPDATE_FIELD",
      key: "meal",
      value: event.target.value,
    });
  };
  const onContentChangeHundler = (event) => {
    // setContentValue(event.target.value);
    dispatshFun({
      type: "UPDATE_FIELD",
      key: "content",
      value: event.target.value,
    });
  };
  const onCalorieChangeHundler = (event) => {
    dispatshFun({
      type: "UPDATE_FIELD",
      key: "calorie",
      value: event.target.value,
    });
  };
  const formSubmitHundeler = (event) => {
    event.preventDefault();
    props.onFormSubmit(
      Object.keys(formState).reduce((agg, cur) => {
        agg[cur] = formState[cur].value;
        return agg;
      }, {})
    );
    dispatshFun({ type: "RESET" });
  };
  const cancleModal = () => {
    dispatshFun({ type: "RESET" });
    props.onCancle();
  };
  return (
    <form className={styles.form} onSubmit={formSubmitHundeler}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        id="date"
        onChange={onDateChangeHundler}
        value={formState.date.value}
        className={`${styles["form-input"]} ${
          !isDateValid ? styles.error : ""
        }`}
      />

      <label htmlFor="meal">Meal:</label>
      <select
        name="meal"
        id="meal"
        onChange={onMealChangeHundler}
        value={formState.content.value}
        className={styles["form-input"]}
      >
        <option value="breakfast">Breakfast</option>

        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snak">Snak</option>
      </select>

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        name="content"
        id="content"
        onChange={onContentChangeHundler}
        value={formState.content.value}
        className={`${styles["form-input"]} ${
          !isContentValid ? styles.error : ""
        }`}
      />

      <label htmlFor="calorie">Calorie:</label>
      <input
        type="number"
        name="calorie"
        id="calorie"
        onChange={onCalorieChangeHundler}
        value={formState.calorie.value}
        className={`${styles["form-input"]} ${
          !isCalorieValid ? styles.error : ""
        }`}
      />

      <div className={styles.footer}>
        <button disabled={!isFormValid}>Add Record</button>
        <button type="button" onClick={cancleModal} className="secendary">
          Cancle
        </button>
      </div>
    </form>
  );
}
export default CalorieRecordEdit;
