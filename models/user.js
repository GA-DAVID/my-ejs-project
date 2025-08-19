const mongoose = require('mongoose'); //---🦦



//Let's build the Schema Blueprint for an individual User
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
})


//---now we pass the bluprint to mongoose to create a User model. 🏗️
const User = mongoose.model("User", userSchema, "users"); 


module.exports = {User};
