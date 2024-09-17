import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogEditor.scss";
import axios from "axios";

const BlogEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [blogImage, setBlogImage] = useState("");

  // Handle content change
  const handleChange = (value) => {
    setContent(value);
  };

  // Handle image uploads by converting them into base64 or URLs
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
    const newPost = {
      id: Date.now(),
      title,
      author,
      content,
      authorImage,
      blogImage,
    };

    try {
      const response = await axios.post("http://localhost:5000/blogs", newPost);
      addBlogPost(response.data);
    } catch (error) {
      console.error("Error saving the blog post", error);
    }
    setTitle("");
    setAuthor("");
    setContent("");
    setAuthorImage("");
    setBlogImage("");
  };

  return (
    <div className="container mt-4 blog-editor-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">Create Blog Post</h3>
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
              {authorImage && (
                <img src={authorImage} alt="Author" width={100} />
              )}

              {/* Upload Blog Image */}
              <label className="form-label">Upload Blog Image</label>
              <input
                className="form-control mb-3"
                type="file"
                onChange={handleBlogImageUpload}
              />
              {blogImage && <img src={blogImage} alt="Blog" width={200} />}

              <ReactQuill
                value={content}
                onChange={handleChange}
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

export default BlogEditor;
