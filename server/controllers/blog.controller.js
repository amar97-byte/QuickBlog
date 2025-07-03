import fs from "fs"
import imagekit from "../config/imagekit.js"
import ImageKit from "imagekit"
import Blog from "../models/blog.model.js"


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
           const optimizedImageURL = ImageKit.url({
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

           res.json({success : true , message : "Blod data added"})
        

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
        
    }
}