import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import BlogEditor from "./pages/BlogEditor/BlogEditor";
import EditBlog from "./pages/EditBlog/EditBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/create-blog" element={<BlogEditor />} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
