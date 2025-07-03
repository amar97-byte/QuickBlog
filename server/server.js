import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./config/db.js"
import adminRouter from "./routes/admin.route.js"
import blogRouter from "./routes/blog.route.js"

const app = express()


// MIDDLEWARES
app.use(cors())
app.use(express.json())


await connectDB()

// ROUTES
app.get("/" , (req,res)=> {
    res.send("Api is working")
})

app.use("/api/admin" , adminRouter)

app.use("/api/blog" , blogRouter)



const PORT = 3000 || process.env.PORT

app.listen(PORT , ()=>{
    console.log("Server is Running on PORT : " + PORT);
} )

export default app