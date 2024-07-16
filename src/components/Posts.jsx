import React, { useContext, useEffect } from "react";
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
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

  const handleDelete = async (id) => {
    dispatch({ type: DELETE_POST_REQUEST });
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      console.log(id);
      if (!res.ok) {
        throw new Error("Tarmoq javobi noto'g'ri");
      }
      dispatch({ type: DELETE_POST_SUCCESS, payload: id });
    } catch (err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err.message });
      console.error("Xatolik yuzaga keldi:", err);
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
          <h1 className="student">Students app</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Group</th>
                <th></th>
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
                    <button
                      className="Delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
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
