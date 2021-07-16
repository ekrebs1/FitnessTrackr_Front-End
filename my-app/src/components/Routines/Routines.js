import axios from "axios";
import { useEffect, useState } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        axios
          .get(`${process.env.REACT_APP_FITNESS_TRACKR_API_URL}/routines`)
          .then(({ data }) => setRoutines(data));
      } catch (error) {
        console.error(error);
      }
    }
    fetchRoutines();
  }, []);

  return (
    <>
      <h1 style={{ "text-align": " center" }}>Routines</h1>

      <div className='Routine-Tables'>
        {routines.map((routine) => {
          if (routine.activities.length > 0 && routine.isPublic) {
            return (
              <div className='Routine-Card' key={routine.id}>
                <div className='Routine-Header'>
                  <h3>Routine Name: {routine.name.toUpperCase()}</h3>
                  <h3>Goal: {routine.goal}</h3>
                  <h3>Created by: {routine.creatorName}</h3>
                </div>
                <div className='Routine-Activities'>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className='Routine-Table-Label'>
                            Activity Name
                          </TableCell>
                          <TableCell className='Routine-Table-Label'>
                            Description
                          </TableCell>
                          <TableCell className='Routine-Table-Label'>
                            Count
                          </TableCell>
                          <TableCell className='Routine-Table-Label'>
                            Duration
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {routine.activities.map((activity) => {
                          const { name, description, count, duration } =
                            activity;
                          return (
                            <TableRow>
                              <TableCell>{name}</TableCell>
                              <TableCell>{description}</TableCell>
                              <TableCell>{count}</TableCell>
                              <TableCell>{duration}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default Routines;
