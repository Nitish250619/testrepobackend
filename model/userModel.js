import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true , "username is required"]
    },
    email: {
        type: String,
        required:[true , "email is required"]
    },
    password: {
        type: String,
        required:[true , "password is required"]
    },
    blogs:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Blogs",
        }
    ]

},{
    timestamps:true
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;