import ListngSection from "./components/calorieRecordSection/ListingSection";
import CalorieRecordEdit from "./components/edit/CalorieRecordEdit";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./App.css";

const LOCAL_STORAGE_KEY = "caloriRecord";

function App() {
  const [records, setRecords] = useState();

  const [isModelOpen, setIsModelOpen] = useState(false);
  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }
  function loadRecord() {
    const recordStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recordStorage != null && recordStorage !== "undefined") {
      setRecords(
        JSON.parse(recordStorage).map((record) => ({
          ...record,
          date: new Date(),
          calorie: Number(record.calorie),
        }))
      );
    } else {
      setRecords([]);
    }
  }
  useEffect(() => {
    if (!records) {
      loadRecord();
    } else {
      save();
    }
  }, [records]);

  const modelStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: "0px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const hundleOpenModel = () => {
    setIsModelOpen(true);
  };
  const hundleCloseModel = () => {
    setIsModelOpen(false);
  };

  const formFunction = (record) => {
    const formattDate = {
      ...record,
      date: new Date(record.date),
      id: crypto.randomUUID(),
    };

    setRecords((prevous) => [formattDate, ...prevous]);

    hundleCloseModel();
  };
  return (
    <div>
      <h1>Welcome To Calorie Record With Mahmoud</h1>
      <Modal
        isOpen={isModelOpen}
        onRequestClose={hundleCloseModel}
        contentLabel="Modal"
        style={modelStyle}
      >
        <CalorieRecordEdit
          onFormSubmit={formFunction}
          onCancle={hundleCloseModel}
        />
      </Modal>
      {records && <ListngSection allRecord={records}></ListngSection>}
      <button onClick={hundleOpenModel} className="track">
        Track Food
      </button>
    </div>
  );
}

export default App;
