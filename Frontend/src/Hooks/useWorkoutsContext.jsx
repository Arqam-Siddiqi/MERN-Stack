import { WorkoutContext } from "../Context/WorkoutContext"
import { useContext } from "react"

const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);

    if(!context){
        throw Error("useWorkoutContext must be used inside the WorkoutContext Provider.");
    }

    return context;
}

export default useWorkoutsContext;