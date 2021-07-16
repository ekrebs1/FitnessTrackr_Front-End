import { useState } from "react";
import CardHeader from "./CardHeader.js";
import CardForm from "./CardForm.js";
import CardBody from "./CardBody.js";

import "./RoutineCard.css";

const RoutineCard = ({
  routine,
  setMyRoutines,
  myRoutines,
  setUpdateRoutines,
  updateRoutines,
}) => {
  const [routineActivities, setRoutineActivities] = useState(
    routine.activities
  );

  return (
    <div className='Routine-Card'>
      <CardHeader
        routine={routine}
        setMyRoutines={setMyRoutines}
        myRoutines={myRoutines}
        setUpdateRoutines={setUpdateRoutines}
        updateRoutines={updateRoutines}
      />
      <CardForm
        routine={routine}
        routineActivities={routineActivities}
        setRoutineActivities={setRoutineActivities}
        setUpdateRoutines={setUpdateRoutines}
        updateRoutines={updateRoutines}
      />
      <CardBody
        routineActivities={routineActivities}
        updateRoutines={updateRoutines}
        setUpdateRoutines={setUpdateRoutines}
      />
    </div>
  );
};

export default RoutineCard;
