import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()


export const AppProvider = ({children})=>{

    const navigate = useNavigate()

    const[token , setToken] = useState(null)
    const[blogs , setBlogs] = useState([])
    const[input , setInput] = useState("")

        // function to get the blog data from backend
    const fetchBlogs = async() => {
        try {
         const {data} =  await axios.get("/api/blog/blogList")
        //  console.log(data);
         
        //  if(data.success){
        //     setBlogs(data.blogs)
        //  }else{
        //     toast.error(data.message)
        //  }       // same condition as below

            data.success? setBlogs(data.blogs) : toast.error(data.message)
            // console.log(blogs);
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        fetchBlogs()
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    } ,[])

    const value = {
        axios , navigate , token , setToken , blogs , setBlogs , input , setInput
    }


    return(
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> {
    return useContext(AppContext)
}