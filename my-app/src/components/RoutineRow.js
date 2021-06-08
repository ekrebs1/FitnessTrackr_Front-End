import React, { useState } from "react";
import { TableRow, TableCell, TextField } from "@material-ui/core";
import {
  Create as CreateIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { deleteRoutine, saveRoutine } from "../api";

const RoutineRow = ({
  routine: { id, name, goal, creatorName, isPublic },
  onRemoveRoutine,
}) => {
  const [routineName, setRoutineName] = useState(name);
  const [routineGoal, setRoutineGoal] = useState(goal);
  const [editMode, setEditMode] = useState(false);

  const onEdit = () => {
    setEditMode(true);
  };

  const onSave = () => {
    saveRoutine(routineName, routineGoal, id);
    setEditMode(false);
  };

  const onDelete = () => {
    deleteRoutine(id);
    onRemoveRoutine();
  };

  return (
    <TableRow key={id}>
      <TableCell component='th' scope='row'>
        {id}
      </TableCell>
      <TableCell align='right'>
        {editMode ? (
          <TextField
            value={routineName}
            onChange={(event) => {
              setRoutineName(event.target.value);
            }}
          />
        ) : (
          routineName
        )}
      </TableCell>
      <TableCell align='right'>
        {editMode ? (
          <TextField
            value={routineGoal}
            onChange={(event) => {
              setRoutineGoal(event.target.value);
            }}
          />
        ) : (
          routineGoal
        )}
      </TableCell>
      <TableCell align='right'>{creatorName}</TableCell>
      <TableCell align='right'>{isPublic}</TableCell>
      <TableCell align='right'>
        {editMode ? (
          <SaveIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              onSave(id);
            }}
          />
        ) : (
          <CreateIcon style={{ cursor: "pointer" }} onClick={onEdit} />
        )}
      </TableCell>
      <TableCell align='right'>
        <DeleteIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            onDelete(id);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default RoutineRow;
