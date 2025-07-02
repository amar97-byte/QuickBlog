


// ADD BLOG FUNCTION
export const addBlog = async(req,res)=> {
    try {
        const {title , description , subTitle , image , category , isPublished} = JSON.parse(req.body.blog)

        const imageFile = req.file

        // chack if all fields are present

        if(!title || !description ||!category || !imageFile){
            return res.json({success : false , message : "Missing Required fields"})
        }

        

    } catch (error) {
        
    }
}