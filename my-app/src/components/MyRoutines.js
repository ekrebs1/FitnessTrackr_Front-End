//if no my-routines how not to get error?
//How to keep username on refresh (useRef Hook?)
import React, { useState, useEffect } from "react";

import { myUsernameFetch, myRoutinesFetch } from "../api";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import RoutineRow from "./RoutineRow";

const MyRoutines = () => {
  let myUsername;
  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const myToken = JSON.parse(localStorage.getItem("token"));

      if (myToken) {
        myUsername = await myUsernameFetch(myToken);
        const routines = await myRoutinesFetch(myUsername, myToken);
        setMyRoutines(routines);
      }
    }
    return fetchData();
  }, []);

  const onRemoveRoutine = (idx) => {
    const copy = [...myRoutines];
    copy.splice(idx, 1);
    setMyRoutines(copy);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='right'>ID</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Goal</TableCell>
            <TableCell align='right'>Creator Name</TableCell>
            <TableCell align='right'>Is Public</TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myRoutines.map((routine, idx) => {
            return (
              <RoutineRow
                key={routine.id}
                routine={routine}
                onRemoveRoutine={() => {
                  onRemoveRoutine(idx);
                }}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyRoutines;
