import useWorkoutsContext from "../Hooks/useWorkoutsContext";
import { useAuthContext } from "../Hooks/useAuthContext";

import formateDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ( {workout} ) => {

  const { dispatch} = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {

    if(!user){
      return;
    }

    const response = await fetch('http://localhost:3000/workout/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  }
  
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <ul>
            <li><strong>Load (in kg): </strong>{workout.load}</li>
            <li><strong>Reps: </strong>{workout.reps}</li>
            <li>{formateDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</li>
        </ul>
        
        <span onClick={ handleClick } className="material-symbols-outlined">
          delete
        </span>
    </div>
  )
}

export default WorkoutDetails