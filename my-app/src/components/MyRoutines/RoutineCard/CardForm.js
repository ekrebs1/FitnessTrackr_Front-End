import { useState, useEffect } from "react";
import axios from "axios";

const CardForm = ({
  routine: { id },
  routineActivities,
  setRoutineActivities,
}) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityCount, setActivityCount] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [allActivities, setAllActivities] = useState([]);

  const routineId = id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/activities`)
      .then(({ data }) => setAllActivities(data));
  }, []);

  async function addActivity(activityId, count, duration, routineId, name) {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/routines/${routineId}/activities`,
          { activityId, count, duration }
        )
        .then(({ data }) => {
          console.log(data);
          const newRoutineActivities = [...routineActivities];
          newRoutineActivities.push({ count, duration, name, activityId, id });
          setRoutineActivities(newRoutineActivities);
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='Add-Routine-Activity-Form'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addActivity(
            selectedActivity.id,
            activityCount,
            activityDuration,
            routineId,
            selectedActivity.name
          );
        }}>
        <select
          onChange={(event) => {
            const selectData = JSON.parse(event.target.value);
            console.log(selectData);
            setSelectedActivity(selectData);
          }}>
          <option value=''>-- Select an activity --</option>
          {allActivities.map((activity) => {
            return (
              <option
                key={activity.id}
                value={JSON.stringify({
                  id: activity.id,
                  name: activity.name,
                })}>
                {activity.name}
              </option>
            );
          })}
        </select>
        <input
          type='text'
          value={activityCount}
          placeholder='Count'
          onChange={(event) => {
            setActivityCount(event.target.value);
          }}
        />
        <input
          type='text'
          value={activityDuration}
          placeholder='Duration'
          onChange={(event) => {
            setActivityDuration(event.target.value);
          }}
        />
        <input type='submit' value='Add activity' />
      </form>
    </div>
  );
};

export default CardForm;
