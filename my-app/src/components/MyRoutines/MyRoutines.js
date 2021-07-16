import { useEffect, useState } from "react";
import axios from "axios";
import AddRoutine from "./AddRoutine.js";
import RoutineCards from "./RoutineCards.js";

const getUsername = (token) => {
  try {
    return axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data: { username } }) => {
        return username;
      });
  } catch (error) {
    console.error(error);
  }
};

const getRoutines = (username, token) => {
  try {
    return axios
      .get(
        `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        return data;
      });
  } catch (error) {
    console.error(error);
  }
};

const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [updateRoutines, setUpdateRoutines] = useState(false);
  let myUsername;
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (token) {
        myUsername = await getUsername(token);
        const routines = await getRoutines(myUsername, token);
        routines.length > 0
          ? setMyRoutines(routines.reverse())
          : setMyRoutines(routines);
        setMyRoutines(routines);
      }
    }
    fetchData();
  }, [updateRoutines]);

  return (
    <>
      <AddRoutine
        myRoutines={myRoutines}
        setMyRoutines={setMyRoutines}
        setUpdateRoutines={setUpdateRoutines}
        updateRoutines={updateRoutines}
      />
      {myRoutines.length > 0 && (
        <RoutineCards
          myRoutines={myRoutines}
          setMyRoutines={setMyRoutines}
          setUpdateRoutines={setUpdateRoutines}
          updateRoutines={updateRoutines}
        />
      )}
    </>
  );
};

export default MyRoutines;
