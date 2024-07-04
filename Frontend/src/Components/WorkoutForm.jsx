import { useState } from "react"
import useWorkoutsContext from "../Hooks/useWorkoutsContext"
import { useAuthContext } from "../Hooks/useAuthContext"

const WorkoutForm = () => {

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError("Please log in first.");
            return;
        }

        const workout = {
            title,
            load,
            reps
        }
        
        const response = await fetch('http://localhost:3000/workout', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if(response.ok){
            setError(null);
            setEmptyFields([]);

            setTitle('');
            setLoad('');
            setReps('');
            dispatch({type: "CREATE_WORKOUT", payload: json});
        }
        else{
            setError(json.error);   // depending on what you sent back in your catch()
            setEmptyFields(json.emptyFields);
        }

    }

  return (

        <form className="create" onSubmit={ handleSubmit }>
            <label>Exercise: </label>
            <input 
                type="text" 
                onChange={ (e) => {
                    setTitle(e.target.value);
                }}
                value={title}
                required
            />
            <br/>

            <label>Load (in kg): </label>
            <input 
                type="number" 
                onChange={ (e) => {
                    setLoad(e.target.value);
                }}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <br/>

            <label>Reps: </label>
            <input 
                type="number" 
                onChange={ (e) => {
                    setReps(e.target.value);
                }}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <br/>

            <button>Add Workout</button>
            { error && <div className="error">
                {error}
            </div>}
        </form>

  )
}

export default WorkoutForm