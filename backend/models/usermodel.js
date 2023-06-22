const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
   email:{
        type:String,
        required:true,
        unique:true,
    },
    likedmovies:Array
});

//Export the model
module.exports = mongoose.model('User', userSchema);