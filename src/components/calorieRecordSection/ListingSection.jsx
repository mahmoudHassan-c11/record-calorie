import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { useEffect, useState } from "react";
function ListingSection(props) {
  const { allRecord } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterRecords, setFilterRecords] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilterRecords(allRecord.filter(dateFilter));
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentDate]);

  const dateChangeHundler = (event) => {
    setCurrentDate(new Date(event.target.value));
  };
  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <>
      <label className={styles["listing-data-label"]} htmlFor="listingDate">
        Select Date:
      </label>
      <input
        className={styles["listing-data-input"]}
        type="date"
        id="listingDate"
        value={currentDate.toISOString().split("T")[0]}
        onChange={dateChangeHundler}
      />
      <RecordList records={filterRecords} />
    </>
  );
}

export default ListingSection;
