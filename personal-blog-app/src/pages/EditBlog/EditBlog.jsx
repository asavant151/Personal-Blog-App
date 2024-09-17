import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBlog.scss"
import "react-quill/dist/quill.snow.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [blogImage, setBlogImage] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        const blog = response.data;
        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
        setAuthorImage(blog.authorImage);
        setBlogImage(blog.blogImage);
      } catch (error) {
        console.error("Error fetching blog details", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  // Handle image uploads
  const handleAuthorImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setAuthorImage(imageUrl);
  };

  const handleBlogImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setBlogImage(imageUrl);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const updatedPost = {
      title,
      author,
      content,
      authorImage,
      blogImage,
    };

    try {
      // Update blog post on JSON server
      await axios.put(`http://localhost:5000/blogs/${id}`, updatedPost);
      navigate(`/blog-details/${id}`);
    } catch (error) {
      console.error("Error updating the blog post", error);
    }
  };

  return (
    <>
      <div className="container mt-4 blog-editor-container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="card-title mb-0">Update Blog Post</h3>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Blog Title"
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter Author Name"
                />

                <label className="form-label">Upload Author Image</label>
                <input
                  className="form-control mb-3"
                  type="file"
                  onChange={handleAuthorImageUpload}
                />

                {/* Upload Blog Image */}
                <label className="form-label">Upload Blog Image</label>
                <input
                  className="form-control mb-3"
                  type="file"
                  onChange={handleBlogImageUpload}
                />

                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your blog post..."
                />
              </div>
              <div className="card-footer text-end">
                <button className="btn btn-success" onClick={handleSubmit}>
                  Save Blog Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export default EditBlog;
