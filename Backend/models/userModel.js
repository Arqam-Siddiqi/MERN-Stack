const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.signup = async function(email, password) {

    if(!email || !password){
        throw Error("All fields must be filled.");
    }

    if(!validator.isEmail(email)){
        throw Error("Invalid email address.");
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error("Password should have atleast 8 characters, 1 upper and lower case character, 1 number and 1 special character.");
    }

    // Existence check so we can later give custom errors.
    const exists = await this.findOne({ email });

    if(exists){
        throw Error("Email already in use.");
    }

    // Generate salt and encrypt it.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create( { email, password: hash } );

    return user;
}

userSchema.statics.login = async function(email, password){

    if(!email || !password){
        throw Error("All fields must be filled.");
    }

    const user = await this.findOne({ email });
    if(!user){
        throw Error("No User registered with this email.");
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("Incorrect password.");
    }

    return user;
}


const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;