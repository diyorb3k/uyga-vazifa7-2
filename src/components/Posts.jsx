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

  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
      setFilteredPosts(data); // Set initial filtered posts
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
        throw new Error("Network response was not ok");
      }
      dispatch({ type: DELETE_POST_SUCCESS, payload: id });
      setFilteredPosts(filteredPosts.filter(post => post.id !== id)); // Update filtered posts
    } catch (err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err.message });
      console.error("Error occurred:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.firstName || !formData.lastName || !formData.group) {
      setFormError("All fields are required.");
      return;
    }
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
        throw new Error("Network response was not ok");
      }
      const newPost = await res.json();
      dispatch({ type: ADD_POST_SUCCESS, payload: newPost });
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        group: "",
      });
      setFormError("");
      setFilteredPosts([...filteredPosts, newPost]); // Update filtered posts
    } catch (err) {
      dispatch({ type: ADD_POST_ERROR, payload: err.message });
      console.error("Error occurred:", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredPosts(posts.filter(post =>
      post.firstName.toLowerCase().includes(value.toLowerCase()) ||
      post.lastName.toLowerCase().includes(value.toLowerCase()) ||
      post.group.toLowerCase().includes(value.toLowerCase())
    ));
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
      {formError && <h2 style={{ color: "red" }}>{formError}</h2>}
      <>
        <h1 className="student">Students app</h1>
       <div className="search_input">
       <input
          className="search"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
       </div>
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
            {filteredPosts.map((post) => (
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
          <input
            className="input1"
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
          />
          <input
            className="input2"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="input3"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            className="input4"
            type="text"
            name="group"
            placeholder="Group"
            value={formData.group}
            onChange={handleChange}
          />
          <button type="submit" className="A">ADD</button>
        </form>
      </>
    </div>
  );
};

export default Posts;
