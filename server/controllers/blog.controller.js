import fs from "fs"
import imagekit from "../config/imagekit.js"
import Blog from "../models/blog.model.js"
import Comment from "../models/comment.model.js"


// ADD BLOG FUNCTION
export const addBlog = async(req,res)=> {
    try {
        const {title , description , subTitle  , category , isPublished} = JSON.parse(req.body.blog)

        const imageFile = req.file

        // chack if all fields are present
        if(!title || !description ||!category || !imageFile){
            return res.json({success : false , message : "Missing Required fields"})
        }


        // Upload image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder : "/blogs"
        })

        // Optimization through imageKit URL transformation
           const optimizedImageURL = imagekit.url({
            path : response.filePath,
            transformation : [
                {quality : 'auto'},     // Auto compression
                {format : 'webp'},      // convert to modern format
                {width : '1280'}        // width resizing
            ]
           })

           const image = optimizedImageURL
           await Blog.create({
            title ,
            subTitle,
            category,
            description,
            image,
            isPublished
           })

           res.json({success : true , message : "Blog data added"})
        

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
        
    }
}


// GET ALL BLOGS
 export const  getBlogList = async(req , res)=>{
    try {
        const blogs = await Blog.find({isPublished : true})
        res.json({success : true , blogs})
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})

        
    }
}


// INDIVIDUAL BLOG DATA
export const getBlogById = async (req , res)=> {
    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.json({success : false , message : "Blog not found"})
        }

        res.json({success : true , blog})
        
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}


// DELETE ANY BLOG
export const deleteBlog = async (req , res)=> {
    try {
        const {id} = req.body
         await Blog.findByIdAndDelete(id)

         // Delete all comments asssociated with the blog
            await Comment.deleteMany({blog: id})

        res.json({success : true , message : "Blog deleted Successfully"})
        
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}


//   CHANGING THE BLOG STATUS
export const togglePublish = async (req , res)=>{
    try {
        const{id} = req.body
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished

        await blog.save()
        res.json({success : true , message : "Blog status updated Successfully"})

        
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}


// ADD COMMENT
export const addComment = async (req , res)=>{
    try {
        const {blog , name , content} = req.body
    await Comment.create({
        blog,
        name,
        content
    }) 

    res.json({success : true , message : "Comment Add for review"})
        
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}


// GET THE COMMENTS OF A BLOG
export const getBlogComments = async (req , res)=>{
    try {
        const {blogId } = req.body
        const comments = await Comment.find({blog : blogId , isApproved : true}).sort({createdAt : -1})
    res.json({success : true , comments})

        
    } catch (error) {
        console.log(error.message);
        return res.json({success : false , message : error.message})
    }
}
