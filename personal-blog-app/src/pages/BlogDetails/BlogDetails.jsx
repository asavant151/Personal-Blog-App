import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetails.scss"
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <section className="position-relative blog-details-section">
      <div className="container blog-details-container">
        <h2 className="blog-title">{blog.title}</h2>
        <div className="d-flex align-items-center">
          <img
            src={blog.authorImage}
            alt={`author-${blog.id}`}
            className="blog-img img-fluid"
            width={50}
            height={50}
          />
          <span className="authore-name">{blog.author}</span>
        </div>
        <figure className="blog-details-fig">
          <img src={blog.blogImage} alt={`blog-${blog.id}`} className="img-fluid" />
        </figure>
        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
