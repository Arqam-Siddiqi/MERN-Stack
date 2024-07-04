const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;
    
    if(!authorization){
        return res.status(401).send({error: "Authorization token required."});
    }

    const token = authorization.split(' ')[1];

    try{
        const { _id } = jwt.verify(token, '94459b5db464a076f276bcbdbc46f26e3b52dc5e25df34f226a837bf5bdd2e05');

        req.user = await User.findOne({ _id }).select('_id');
        next();
    }
    catch(error){
        res.status(401).send({error: "Request is not authorized."});
    }

}

module.exports = requireAuth;