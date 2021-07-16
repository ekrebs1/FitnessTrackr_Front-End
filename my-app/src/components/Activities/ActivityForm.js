import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const ActivityForm = ({ activities, setActivities }) => {
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [error, setError] = useState("");

  async function addActivity(name, description) {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .post(
          `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/activities`,
          { name, description },
          axiosConfig
        )
        .then(({ data }) => {
          const newActivities = [...activities];
          newActivities.unshift(data);
          setActivities(newActivities);
        });
    } catch (error) {
      setError("Activity already exists!");
    }
  }

  return (
    <div className='Add-Activity-Form-Container'>
      <form
        className='Add-Activity-Form'
        onSubmit={(event) => {
          event.preventDefault();
          addActivity(activityName, activityDesc);
        }}>
        <TextField
          required
          className='Activity-Input'
          label='Activity Name'
          value={activityName}
          onChange={(event) => setActivityName(event.target.value)}
        />
        <TextField
          required
          className='Activity-Input'
          label='Description'
          value={activityDesc}
          onChange={(event) => {
            setActivityDesc(event.target.value);
          }}
        />
        <Button
          className='Add-Activity-Submit'
          type='submit'
          variant='contained'>
          Add Activitiy
        </Button>
      </form>
      {error && <p className='Error-Message'>{error}</p>}
    </div>
  );
};

export default ActivityForm;
