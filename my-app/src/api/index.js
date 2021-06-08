import axios from "axios";
import { storeCurrentUser, getCurrentUser } from "../auth";

//GOOD
export async function getRoutines() {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

//GOOD
export async function getActivities() {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}activities`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function updateActivity(id, updatedActivity) {
//   try {
//     const data = await fetch(
//       `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}activities/${id}`,
//       {
//         method: "PATCH",
//         body: JSON.stringify({
//           name: "",
//           description: "",
//         }),
//         header: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const result = await data.json();

//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

//GOOD
export async function registerUser(username, password) {
  return await axios
    .post(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/register`, {
      username,
      password,
    })
    .then(({ data: { token } }) => {
      if (token) {
        storeCurrentUser();
        window.location.href = `${window.location.origin}/home`;
      } else {
        console.error("Something went horribly wrong");
      }
    })
    .catch((error) => {
      console.log(error);

      console.error("Something went horribly wrong");
    });
}

//GOOD
export async function loginUser(username, password) {
  return await axios
    .post(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/login`, {
      username,
      password,
    })
    .then(({ data: { token } }) => {
      if (token) {
        storeCurrentUser();
        window.location.href = `${window.location.origin}/home`;
      } else {
        console.error("Something went wrong");
      }
    })
    .catch((error) => {
      console.log(error);

      console.error("Something went wrong");
    });
}

//GOOD
export async function createRoutine(name, goal) {
  try {
    const myToken = getCurrentUser();

    const response = await fetch(
      `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic: true,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// export async function createActivity(name, description) {
//   try {
//     const myToken = JSON.parse(localStorage.getItem("token"));

//     const response = await fetch(
//       `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}activities`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${myToken}`,
//         },
//         body: JSON.stringify({
//           name,
//           description,
//         }),
//       }
//     );

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

//GOOD
export async function deleteRoutine(id) {
  const myToken = getCurrentUser();

  fetch(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}

// export async function deleteRoutineActivities(id) {
//   try {
//     const myToken = JSON.parse(localStorage.getItem("token"));

//     const response = await fetch(
//       `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routine_activities/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${myToken}`,
//         },
//       }
//     );

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function myId() {
//   try {
//     const myToken = JSON.parse(localStorage.getItem("token"));

//     const response = await fetch(
//       `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/me`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${myToken}`,
//         },
//       }
//     );

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

//GOOD
export async function myUsernameFetch(myToken) {
  try {
    return axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then(({ data: { username } }) => {
        return username;
      });
  } catch (err) {
    console.error(err);
  }
}

//GOOD
export async function myRoutinesFetch(username, myToken) {
  try {
    return axios
      .get(
        `${process.env.REACT_APP_FITNESS_TRACKR_API_URL}users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(({ data }) => {
        return data;
      });
  } catch (err) {
    console.error(err);
  }
}

//GOOD
export async function saveRoutine(routineName, routineGoal, id) {
  const myToken = getCurrentUser();

  fetch(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
    body: JSON.stringify({
      name: routineName,
      goal: routineGoal,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}
