import { useContext, useEffect } from "react";
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  PostContext,
} from "../context/postContext";

const Posts = () => {
  const {
    blog: { loading, posts, error },
    dispatch,
  } = useContext(PostContext);

  const fetchPosts = async () => {
    dispatch({
      type: FETCH_POSTS_REQUEST,
    });
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) {
        throw new Error("Tarmoq javobi o'rtacha emas");
      }
      const data = await res.json();
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: FETCH_POSTS_ERROR, payload: err.message });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <h1>Yuklanmoqda...</h1>}
      {error && <h2>{error}</h2>}
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.lastName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
