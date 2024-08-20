import mongoose from "mongoose";
import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";



const getAllBlogsController = async(req, res) => {
    try {
        const blogs = await blogModel.find({});
        if(!blogs){
            return res.status(404).json({message: "No blogs found"});
        }
        return res.status(200).send({
            blogsCount:blogs.length,
            success: true,
            message: "all blogs list",
            blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error whilw gwtting Blogs",
            error
        })
    }
};





const createBlogController = async(req, res) => {
    try {
        const {title , description , image , user} = req.body;
        if(!title || !description || !image){
            return res.status(400).json({message: "Please fill all fields"});
        }

        const existingUser = await userModel.findById(user);
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }


        // START VERY IMPORTANT PART
        const newBlog = new blogModel({title , description , image,user: existingUser._id})
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        // END VERY IMPORTANT PART


        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            newBlog
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while creating Blog",
            error
        })
    }
};





const updateBlogController = async(req, res) => {
    try {
        const { id }=  req.params
        const {title , description , image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id , {...req.body}, {new: true});
        return res.status(200).send({
            success: true,
            message: "Blog updated successfully",
            blog
        })



    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while updating Blog",
            error
        })
    }
};





const getBlogByIdController = async(req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:"Blog not found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Single Blog fetched successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while getting Blog by id",
            error
        })
    }
   
};





const deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOneAndDelete(req.params.id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()


        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully",
        });

    } catch (error) {
        console.log('Error during blog deletion:', error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting Blog",
            error
        });
    }
};

const getUserBlogByIdController = async(req,res)=>{
    try {
        const userId = req.params.id;
        const userBlog = await userModel.findById(userId).populate('blogs');
        if(!userBlog){
            return res.status(404).send({
                success: false,
                message: "User Blog not found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Blog found",
            userBlog
        })


    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while getting Blog by id",
            error
        })
    }
}




export {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogByIdController,
};
