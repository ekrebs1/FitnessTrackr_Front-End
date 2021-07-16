import ActivityRow from "./ActivityRow.js";

const CardBody = ({ routineActivities, updateRoutines, setUpdateRoutines }) => {
  return (
    <>
      <div className='Routine-Card-Activities'>
        {routineActivities.map((activity, index) => {
          return (
            <ActivityRow
              key={activity.id}
              index={index}
              activity={activity}
              updateRoutines={updateRoutines}
              setUpdateRoutines={setUpdateRoutines}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardBody;
