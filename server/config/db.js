import mongoose, { connect } from "mongoose"

const  connectDB = async()=> {
    try {
        // to print message at backend when the connection in on with DB
        mongoose.connection.on('connected' ,()=> console.log("Database Connected"))
        
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectDB