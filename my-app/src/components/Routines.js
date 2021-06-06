import axios from "axios";
import { useEffect, useState } from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
// import { ReplyOutlined } from "@material-ui/icons";

const Routines = () => {
  const [routines, setRoutines] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines`)
      .then(({ data }) => {
        if (data.length) {
          setRoutines(data);
        }
      });
  }, []);
  return (
    <>
      <h1>Routines Page</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='right'>ID</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Goal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routines &&
              routines.map((routine) => {
                return (
                  <TableRow key={routine.name}>
                    <TableCell component='th' scope='row'>
                      {routine.id}
                    </TableCell>
                    <TableCell align='right'>{routine.name}</TableCell>
                    <TableCell align='right'>{routine.goal}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Routines;

// import { useState } from "react";
// import { Button, TextField } from "@material-ui/core";
// import axios from "axios";

// const Routines = () => {
//   const [name, setName] = useState();
//   const [goal, setGoal] = useState();
//   const [errorMessage, setErrorMessage] = useState();

//   const createRoutine = async () => {
//     return await axios
//       .post(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}routines`, {
//         name,
//         goal,
//       })

//       .then(({ data: { token } }) => {
//         debugger;
//         if (token) {
//           localStorage.setItem("token", JSON.stringify(token));
//           window.location.href = `${window.location.origin}/Home`;
//         } else {
//           setErrorMessage("Something went wrong");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         debugger;
//       });
//   };
//   const onFormSubmit = (event) => {
//     event.preventDefault();
//     createRoutine();
//   };

//   return (
//     <>
//       {errorMessage}
//       <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
//         <TextField
//           id='name'
//           label='Name'
//           onInput={(event) => {
//             setName(event.target.value);
//           }}
//         />
//         <TextField
//           id='goal'
//           label='goal'
//           onInput={(event) => {
//             setGoal(event.target.value);
//           }}
//         />
//         <Button type='submit'>Post</Button>
//       </form>
//     </>
//   );
// };

// export default Routines;
