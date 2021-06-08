import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { createRoutine } from "../api";

const CreateRoutine = () => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");

  //From API
  createRoutine();

  const onFormSubmit = (event) => {
    event.preventDefault();
    createRoutine(routineName, routineGoal);
  };

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
        <TextField
          id='name'
          value={routineName}
          label='Name'
          onInput={(event) => {
            setRoutineName(event.target.value);
          }}
        />
        <TextField
          id='goal'
          value={routineGoal}
          label='Goal'
          onInput={(event) => {
            setRoutineGoal(event.target.value);
          }}
        />
        <Button type='submit'>Create</Button>
      </form>
    </>
  );
};
export default CreateRoutine;
