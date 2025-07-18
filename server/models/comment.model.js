import mongoose from "mongoose"
import Blog from "./blog.model.js"

const commentSchema = new mongoose.Schema({
    blog : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : Blog ,
        required : true
    },
    name : {
        type : String ,
        required : true
        
    },
    content : {
        type : String ,
        required : true
    },
    isApproved : {
        type : Boolean ,
        default : false
    },
} ,{timestamps : true})

const Comment = mongoose.model("comment" , commentSchema)

export default Comment