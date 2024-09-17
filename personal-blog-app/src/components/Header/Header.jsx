import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <>
      <header className="topbar crayons-header">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>
              Blog.
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse mt-lg-0 mt-4"
              id="navbarSupportedContent"
            >
              <form method="get" className="d-flex" role="search">
                <div className="crayons-fields">
                  <div className="crayons-field">
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      type="submit"
                      aria-label="Search"
                      className="search-btn mt-0 py-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="crayons-icon c-btn__icon"
                        focusable="false"
                      >
                        <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                {isLoggedIn ? (
                  <>
                    <Link to={"/create-blog"} className="d-flex align-items-center me-4 my-lg-0 my-3 text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Write"
                      >
                        <path
                          fill="currentColor"
                          d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                        />
                        <path
                          stroke="currentColor"
                          d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                        />
                      </svg>
                      <div className="ms-1">Write</div>
                    </Link>

                    <li className="nav-item">
                      <button
                        className="btn btn-danger text-white nav-link logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link login-btn me-3"
                        aria-current="page"
                        to={"/login"}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link account-btn" to={"/signup"}>
                        Create account
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
