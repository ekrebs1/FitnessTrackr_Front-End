import axios from "axios";
import { useState } from "react";

const ActivityRow = ({
  activity: { name, count, duration, routineActivityId },
}) => {
  const [editMode, setEditMode] = useState(false);
  const [activityCount, setActivityCount] = useState(count);
  const [activityDuration, setActivityDuration] = useState(duration);

  function handleSubmit(count, duration) {
    try {
      const token = localStorage.getItem("token");
      axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/routine_activities/${routineActivityId}`,
          {
            count: parseInt(count),
            duration: parseInt(duration),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(({ data }) => console.log(data))
        .then(() => {
          setEditMode(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function deleteActivity() {
    try {
      const token = localStorage.getItem("token");
      axios
        .delete(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/routine_activities/${routineActivityId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setEditMode(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='Routine-Card-Activity'>
        <h1>{name}</h1>
        {editMode ? (
          <>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(activityCount, activityDuration);
              }}>
              <label htmlFor='countInput'>Count</label>
              <input
                id='countInput'
                type='text'
                value={activityCount}
                onChange={(event) => {
                  setActivityCount(event.target.value);
                }}
              />
              <label htmlFor='durationInput'>Count</label>
              <input
                id='durationInput'
                type='text'
                value={activityDuration}
                onChange={(event) => {
                  setActivityDuration(event.target.value);
                }}
              />
              <input type='submit' value='Submit' />
            </form>

            <button
              onClick={() => {
                deleteActivity();
              }}>
              Delete
            </button>
          </>
        ) : (
          <>
            <h1>Count: {activityCount}</h1>
            <h1>Duration: {activityDuration}</h1>
            <button
              onClick={() => {
                setEditMode(true);
              }}>
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ActivityRow;
