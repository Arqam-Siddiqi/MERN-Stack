const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = (req, res) => {
    Workout.find( {user_id: req.user._id} ).sort( {createdAt: -1} )
            .then(result => res.send(result))
            .catch(err => console.log(err));
}

// get workout based on ID
const getWorkoutByID = (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send( {error: "No such workout"} );
    }

    Workout.findById(req.params.id)
            .then(result => res.send(result))
            .catch(err => console.log(err));
}

// create a new workout
const createWorkout = (req, res) => {
    
    const body = req.body;
    const user_id = req.user._id;

    const workout = new Workout( {...body, user_id} );

    let emptyFields = [];

    if(!workout.title){
        emptyFields.push('title');
    }
    if(!workout.load){
        emptyFields.push('load');
    }
    if(!workout.reps){
        emptyFields.push('reps');
    }

    if(emptyFields.length > 0){
        return res.status(400).send( { error: "Please fill all the fields.", emptyFields } )
    }
    
    workout.save().then(result => res.status(200).send(result))
                    .catch(error => {res.status(400).send(error);console.log(error)});
}

// update an existing workout based on ID
const updateWorkoutByID = (req, res) => {
    const workout = new Workout(req.body);
    Workout.findByIdAndUpdate(req.params.id, workout);
    res.send(workout);
}

// delete an existing workout based on ID
const deleteWorkoutByID = (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
        .then(result => res.send(result))
        .catch(err => console.log(err));
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkoutByID,
    updateWorkoutByID,
    deleteWorkoutByID
}