import userModel from "../model/userModel.js"
import bcrypt from "bcrypt"






const getAllUsers = async(req , res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success:true,
            message:"all user data",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error In Geting All User Data",
            error
        })
    }
};




const registerController = async(req , res) => {
    try {
        const {username , email , password}=req.body;
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

         const hashedPassword = await bcrypt.hash(password,10)   
        // Save new User
        const newuser = new userModel({username , email , password:hashedPassword})
        await newuser.save()
        return res.status(201).send({
            success: true,
            message: "User created successfully",
            newuser
        })



    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error fetching users",
            success:false,
            error
        })
    }
};

const loginController = async(req , res) => {
    try {
         const {email , password}=req.body;

        const user = await userModel.findOne({email})
        
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        //if user is there then match the password
        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }
        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Login Callback",
            error
        })
    }
};

export { getAllUsers, registerController, loginController };
