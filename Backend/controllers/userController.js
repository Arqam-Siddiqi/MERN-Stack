const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, '94459b5db464a076f276bcbdbc46f26e3b52dc5e25df34f226a837bf5bdd2e05', { expiresIn: '3d' });
}

const signupUser = async (req, res) => {

    try{
        const user = await User.signup(req.body.email, req.body.password);

        const token = createToken(user._id);
        const email = user.email;

        res.status(200).send({ email, token });
    }
    catch(error){
        res.status(400).send({error: error.message});
    }

}

const loginUser = async (req, res) => {

    try{
        const user = await User.login(req.body.email, req.body.password);

        const token = createToken(user._id);
        const email = user.email;
        
        res.status(200).send({ email, token });
    }
    catch(error){
        res.status(400).send({error: error.message});
    }

}

module.exports = {
    loginUser,
    signupUser
}