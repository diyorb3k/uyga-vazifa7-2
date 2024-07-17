import React, { useContext, useEffect, useState } from "react";
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  PostContext,
} from "../context/postContext";

const Posts = () => {
  const {
    blog: { loading, posts, error },
    dispatch,
  } = useContext(PostContext);

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    group: "",
  });

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
      if (!res.ok) {
        throw new Error("Tarmoq javobi noto'g'ri");
      }
      dispatch({ type: DELETE_POST_SUCCESS, payload: id });
    } catch (err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err.message });
      console.error("Xatolik yuzaga keldi:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch({ type: ADD_POST_REQUEST });
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Tarmoq javobi noto'g'ri");
      }
      const newPost = await res.json();
      dispatch({ type: ADD_POST_SUCCESS, payload: newPost });
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        group: "",
      });
      fetchPosts();  // Fetch the posts again to update the list
    } catch (err) {
      dispatch({ type: ADD_POST_ERROR, payload: err.message });
      console.error("Xatolik yuzaga keldi:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {loading && <h1>Yuklanmoqda...</h1>}
      {error && <h2>{error}</h2>}
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
        <form onSubmit={handleAdd}>
          <input className="input1"
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
          />
          <input className="input2"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input className="input3"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input className="input4"
            type="text"
            name="group"
            placeholder="Group"
            value={formData.group}
            onChange={handleChange}
          />
          <button type="submit" className="Add">
            ADD
          </button>
        </form>
      </>
    </div>
  );
};

export default Posts;
``