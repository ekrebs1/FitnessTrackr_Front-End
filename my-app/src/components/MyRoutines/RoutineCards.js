import RoutineCard from "./RoutineCard/RoutineCard.js";

const RoutineCards = ({
  myRoutines,
  setMyRoutines,
  setUpdateRoutines,
  updateRoutines,
}) => {
  return (
    <div className='Routine-Cards'>
      {myRoutines.map((routine) => {
        return (
          <RoutineCard
            routine={routine}
            key={routine.id}
            setMyRoutines={setMyRoutines}
            myRoutines={myRoutines}
            setUpdateRoutines={setUpdateRoutines}
            updateRoutines={updateRoutines}
          />
        );
      })}
    </div>
  );
};

export default RoutineCards;
