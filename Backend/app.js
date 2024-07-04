const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Practice_for_MERN')
        .then(result => app.listen(3000))
        .catch(err => console.log(err));

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/workout', workoutRoutes);
app.use('/user', userRoutes);


app.use((req, res) => {
    res.send("404 Page!!!");
})