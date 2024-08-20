import express from "express";
import {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogByIdController,
} from "../controllers/blog.controller.js";

const router = express.Router();

// GET ALL BLOG || GET
router.get("/all-blog", getAllBlogsController);

//CREATE BLOG || POST

router.post("/create-blog", createBlogController);

//UPDATE BLOG || PUT

router.put("/update-blog/:id", updateBlogController);

//SINGLE BLOG DETAILS
router.get("/get-blog/:id", getBlogByIdController);

//DELETE BLOG || DELETE
router.delete("/delete/:id", deleteBlogController);

//USER BLOG DATA || GET

router.get("/user-blog/:id", getUserBlogByIdController);

export default router;
