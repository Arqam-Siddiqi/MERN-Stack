import { useEffect } from "react";

import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";

import useWorkoutsContext from "../Hooks/useWorkoutsContext";
import { useAuthContext } from "../Hooks/useAuthContext"

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();

  useEffect(() => {

    const fetchWorkouts = async () => {
        
      const response = await fetch('http://localhost:3000/workout', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      console.log(json);
      if(response.ok){
        dispatch( {type: 'INITIALIZE_WORKOUTS', payload: json } );
      }
    }

    if(user){
      fetchWorkouts();
    }
  }, [user]);

  return (
    <div className='home'>
        <div className="workouts">
          { workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout = {workout} />
          ))}
        </div>
        < WorkoutForm />

    </div>
  );
}

export default Home