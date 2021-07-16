import { useState } from "react";
import axios from "axios";

const CardHeader = ({
  routine: { id, name, goal, isPublic },
  setUpdateRoutines,
  updateRoutines,
}) => {
  isPublic === null ? (isPublic = false) : (isPublic = true);

  const [editMode, setEditMode] = useState(false);
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [routinePublic, setRoutinePublic] = useState(isPublic);

  function handleSubmit(name, goal, isPublic) {
    try {
      const token = localStorage.getItem("token");
      axios
        .patch(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/routines/${id}`,
          {
            name,
            goal,
            isPublic,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(({ data }) => console.log(data))
        .then(setEditMode(false));
    } catch (error) {
      console.error(error);
    }
  }
  function deleteRoutine(id) {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/routines/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setUpdateRoutines(!updateRoutines);
      });
  }

  return (
    <div className='Routine-Card-Header'>
      {editMode ? (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(routineName, routineGoal, routinePublic, id);
            }}>
            <label htmlFor='routine-name'>Routine Name</label>
            <input
              id='routine-name'
              type='text'
              value={routineName}
              onChange={(event) => {
                setRoutineName(event.target.value);
              }}
            />
            <label htmlFor='routine-goal'>Routine Goal</label>
            <input
              id='routine-goal'
              type='text'
              value={routineGoal}
              onChange={(event) => {
                setRoutineGoal(event.target.value);
              }}
            />
            <label htmlFor='routine-privacy'>Privacy</label>
            <select
              id='routine-privacy'
              onChange={(event) => {
                setRoutinePublic(event.target.value);
              }}>
              <option value='true'>Public</option>
              <option value='false'>Private</option>
            </select>
            <input type='submit' value='Submit' />
            <input
              type='button'
              value='Delete Routine'
              onClick={(event) => {
                deleteRoutine(id);
              }}></input>
          </form>
        </>
      ) : (
        <>
          <h1>Name: {routineName}</h1>
          <h1>Goal: {routineGoal}</h1>
          <button
            className='Routine-Edit'
            onClick={() => {
              setEditMode(true);
            }}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default CardHeader;
