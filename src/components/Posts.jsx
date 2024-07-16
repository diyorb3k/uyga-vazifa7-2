import React, { useContext, useEffect } from "react";
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
    dispatch({ type: FETCH_POSTS_REQUEST });
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) {
        throw new Error("Tarmoq javobi noto'g'ri");
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
         <>
          <h1 className="student">Students app </h1>
        <table>
          <thead>

            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>group</th>
              <th><p></p></th>
            </tr>
            
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.firstName}</td>
                <td>{post.lastName}</td>
                <td>{post.group}</td>
                <td>
                <button>Dalete</button>                  
                <button className="Update">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         </>
      )}
    </div>
  );
};

export default Posts;
