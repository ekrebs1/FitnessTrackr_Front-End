import { Card, CardContent } from "@material-ui/core";

const ActivityCards = ({ activities }) => {
  return (
    <div className='Activity-Card-Container'>
      {activities.map((activity) => {
        const { id, name, description } = activity;
        return (
          <Card variant='outlined' className='Activity-Card' key={id}>
            <CardContent className='Activity-Card-Content'>
              <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
              <h3>{description}</h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ActivityCards;
