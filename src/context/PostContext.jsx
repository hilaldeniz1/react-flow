import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const addPost = (newPost) => {
    // api'a yeni gönderiyi ekler
    axios.post("/posts", newPost).then(() => {
      toast.success("Postunu Gönderildi");
      // state'e gönderiyi ekle
      setPosts([...posts, newPost]);
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
