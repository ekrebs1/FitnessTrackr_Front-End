import axios from "axios";
import { useState } from "react";

import "./AddRoutine.css";

const AddRoutine = ({ updateRoutines, setUpdateRoutines }) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [error, setError] = useState(null);

  async function addRoutine(name, goal) {
    try {
      const token = localStorage.getItem("token");
      await axios
        .post(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/routines`,
          { name, goal },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setUpdateRoutines(!updateRoutines);
          setError("");
        });
    } catch (error) {
      console.log("HEY");
      setError("Routine Name in use!");
    }
  }
  return (
    <div className='Add-Routine-Container'>
      <h1>Add Routine</h1>
      <form
        className='Add-Routine-Form'
        onSubmit={(event) => {
          event.preventDefault();
          addRoutine(routineName, routineGoal);
        }}>
        <input
          type='text'
          placeholder='Routine Name'
          value={routineName}
          onChange={(event) => {
            setRoutineName(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Routine Goal'
          value={routineGoal}
          onChange={(event) => {
            setRoutineGoal(event.target.value);
          }}
        />
        <input type='submit' value='Add Routine' />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddRoutine;
