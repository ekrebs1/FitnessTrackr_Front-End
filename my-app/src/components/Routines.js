import { useEffect, useState } from "react";
import CreateRoutine from "./CreateRoutine";
import { getRoutines } from "../api";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const Routines = () => {
  const [routines, setRoutines] = useState();

  useEffect(() => {
    getRoutines(routines).then((data) => {
      if (data.length) {
        setRoutines(data);
      }
    });
  }, [routines]);

  return (
    <>
      <h1>Routines Page</h1>
      <CreateRoutine />
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
