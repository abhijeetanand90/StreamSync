import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{type:String, required:true, maxlength:12, minlength:6, unique:true,trim:true,
        match: [/^[a-zA-Z0-9][a-zA-Z0-9._]+[a-zA-Z0-9]$/, 'Username can only contain letters, numbers, dots and underscores']
    },
    email:{type:String, required:true,trim:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
     },
    password:{type:String, required:true, trim:true, minlength:8, maxlength:24, match: [
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Password must contain at least one uppercase letter, one number, and one special character'
    ]},
    bio:{type:String} ,   //for optional field dont have to do anything
    IsStreaming:{type:Boolean},
    followers:{type:Number},
    profile_pic:{type:String},
    streamKey:{type:String},
    createdAt:{type:Date},
    loginCount:{
        type:Number,
        default:0
    }
    

})
export default mongoose.model('User', userSchema);