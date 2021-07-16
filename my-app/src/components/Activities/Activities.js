import { useEffect, useState } from "react";
import axios from "axios";

import ActivityForm from "./ActivityForm.js";
import ActivityCards from "./ActivityCards.js";

import "./Activities.css";

const Activities = ({ auth }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/activities`)
        .then(({ data }) => setActivities(data.reverse()));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <h1 style={{ "text-align": " center" }}>Activities</h1>
      {auth && (
        <ActivityForm activities={activities} setActivities={setActivities} />
      )}
      <ActivityCards activities={activities} />
    </>
  );
};

export default Activities;
