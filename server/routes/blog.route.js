import express from "express"
import { addBlog, addComment, deleteBlog, generateContent, getBlogById, getBlogComments, getBlogList, togglePublish } from "../controllers/blog.controller.js"
import upload from "../middleware/multer.middleware.js"
import auth from "../middleware/auth.middleware.js"

const blogRouter = express.Router()

blogRouter.post("/add"  , upload.single('image') , auth ,addBlog)
blogRouter.get("/blogList" , getBlogList)
blogRouter.get("/:blogId" , getBlogById)
blogRouter.post("/delete" ,auth, deleteBlog)
blogRouter.post("/toggle-publish" ,auth, togglePublish)

blogRouter.post("/addComment" , addComment)
blogRouter.post("/comments" , getBlogComments)

// GENERATING CONTENT USING THE GEMINI AI
blogRouter.post("/generate-content" ,auth , generateContent)


export default blogRouter