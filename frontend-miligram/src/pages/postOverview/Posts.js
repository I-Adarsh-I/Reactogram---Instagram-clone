import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./posts.css";
import axios from "axios";
import { BASE_API } from "../../config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const resp = await axios.get(`${BASE_API}/allposts`);
  
      if (resp.status === 200) {
        setAllPosts(resp.data.posts);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
      navigate("/");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    const resultString = localStorage.getItem("Profile");
    const result = JSON.parse(resultString);
    const token = result.token;

    try {
      const resp = await axios.delete(`${BASE_API}/deletepost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(resp);
      getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="post-card p-3 row row-cols-1 g-4">
        {allPosts.length > 0 &&
          allPosts.map((post, index) => (
            <Card
              key={index}
              propsData={post}
              onDeletePost={handleDeletePost}
              getAllPosts={getAllPosts}
            />
          ))}
      </div>
      <ToastContainer autoClose={5000}/>
    </div>
  );
};

export default Posts;
