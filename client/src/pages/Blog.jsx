import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from "moment";
import Loader from "../components/Loader";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const {axios} = useAppContext()

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name , setName] = useState("")
  const [content , setContent] = useState("")

  // const fetchBlogData = async () => {
  //   const data = blog_data.find((item) => item._id === id);
  //   setData(data);
  // };

// same function as upwards but with backend connection
  const fetchBlogData = async () => {
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      // console.log(data);
      
      data.success? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  };


  // const fetchComments = async () => {
  //   setComments(comments_data);
  // };

  // same function as upwards but with backend connection
  const fetchComments = async () => {
   try {
     const {data} = await axios.post(`/api/blog/comments` , {blogId : id})
     if(data.success){
       setComments(data.comments)
     }else{
       toast.error(data.message)
     }
   } catch (error) {
      toast.error(error.message)
   }
  };


  // const addComment = async(e)=>{
  //   e.preventDefault()
  // }

  // same function as upwards but with backend connection
const addComment = async(e)=>{
    e.preventDefault()
    try {
     const {data} = await axios.post(`/api/blog/addComment` , {blog : id , name , content})
     if(data.success){
       toast.success(data.message)
       setName("")
       setContent("")
     }else{
       toast.error(data.message)
     }
   } catch (error) {
      toast.error(error.message)
   }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />

      <Navbar />

      {/* show the details about the the blog */}
      <div className="text-center mt-20 text-gray-600">

        {/* moment packege used to formate date accordingly to the given formate we want to show on web page */}

        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {" "}
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p
          className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 
      bg-primary/5 font-medium text-primary"
        >
          Michael Brown
        </p>
      </div>

      {/* content of the blog */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto"
        ></div>

        {/* comment section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Box / Add new comment in section */}
        <div className="max-w-3xl mt-7 mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>

          <form
            onSubmit={addComment}
            className="flex flex-col items-center gap-4 max-w-lg"
          >
            <input onChange={(e)=>setName(e.target.value)} value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />

            <textarea onChange={(e)=>setContent(e.target.value)} value={content}
              placeholder="Comment"
              rows='5'
              required
              className="w-full p-2 border border-gray-300 rounded outline-none "
            ></textarea>

            <button
              type=" submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-102 
                transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

      {/* Share buttons */}
      <div className="my-24 max-w-3xl mx-auto">
        <p className="font-semibold my-4">Share this artical on social media</p>

        <div className="flex ">
            <img src={assets.facebook_icon} alt="" className="cursor-pointer"/>
            <img src={assets.twitter_icon} alt="" className="cursor-pointer"/>
            <img src={assets.googleplus_icon} alt="" className="cursor-pointer"/>
        </div>
      </div>

      </div>

      <Footer/>
    </div>
  ) : (
    <Loader/>
  );
};

export default Blog;
