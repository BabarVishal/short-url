const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
     type: String,
     require:true
    },
    email:{
        type: String,
        require:true,
        unique: true
       },
       role:{
        type:String,
        require:true,
        default: "NORMAL"
       },
       password:{
        type: String,
        require:true
       }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;