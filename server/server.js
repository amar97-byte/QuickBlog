import express from "express"
import 'dotenv/config'
import cors from "cors"

const app = express()


// MIDDLEWARES
app.use(cors())
app.use(express.json())


app.get("/" , (req,res)=> {
    res.send("Api is working")
})

const PORT = 3000 || process.env.PORT

app.listen(PORT , ()=>{
    console.log("Server is Running on PORT : " + PORT);
} )

export default app