import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss"
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog posts", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog post", error);
    }
  };

  return (
    <section className="position-relative blog-section">
      <div className="container">
        {blogs.map((blog) => (
          <div className="card mb-3" key={blog.id}>
            <div className="row align-items-center">
              <div className="col-md-6 col-12">
                <Link to={`/blog-details/${blog.id}`} className="card-body">
                  <div className="d-flex align-items-center">
                    <img
                      src={blog.authorImage}
                      alt={`author-${blog.id}`}
                      className="card-image"
                      width={50}
                      height={50}
                    />
                    <span className="authore-name">{blog.author}</span>
                  </div>
                  <h2 className="card-title">{blog.title}</h2>
                  <p>{blog.content.slice(0, 100)}...</p>
                </Link>
              </div>
              <div className="col-md-6 col-12">
                <img src={blog.blogImage} alt={`blog-${blog.id}`} className="img-fluid" />
              </div>
              <div className="col-12 mt-2">
                <Link to={`/edit-blog/${blog.id}`} className="btn btn-primary me-2">Edit</Link>
                <button onClick={() => handleDelete(blog.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
