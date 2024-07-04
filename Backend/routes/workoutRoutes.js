const express = require('express');
const workoutController = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

router = express.Router();

router.use(requireAuth);

router.get('/', workoutController.getAllWorkouts);

router.post('/', workoutController.createWorkout);

router.get('/:id', workoutController.getWorkoutByID);

router.patch('/:id', workoutController.updateWorkoutByID);

router.delete('/:id', workoutController.deleteWorkoutByID);

module.exports = router;