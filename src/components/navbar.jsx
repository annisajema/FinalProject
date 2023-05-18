import { useEffect, useState } from "react";
import axios from "axios";
import SigninModal from "./signin-modal";


const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const url = axios.create({ baseURL: base_url });
const token = localStorage.getItem("token");


function Navbar() {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [role, setRole] = useState("");

  const handleLoggedUser = async () => {
    if (token) {
      const getLoggedUser = await url.get("api/v1/user", {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = getLoggedUser.data.data.id;
      const role = getLoggedUser.data.data.role
      localStorage.setItem("userId", JSON.stringify(userId));
      setProfilePictureUrl(getLoggedUser.data.data.profilePictureUrl);
      localStorage.setItem("role", JSON.stringify(role));
      setRole(role);
    }
  };

  useEffect(() => {
    handleLoggedUser();
  }, [token]);

  return (
    <div className="App">
      <nav className="navbar fixed-top navbar-expand-lg bg-light text-center">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            ROUTE 62
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link active" href="/category-page">
                  Category
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link active" href="/promo-page">
                  Promo
                </a>
              </li>
              {role === 'admin' && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin Page
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/banner">
                          Banner
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/category">
                          Category
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/activity">
                          Activity
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/promo">
                          Promo
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/user">
                          User
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
            </ul>
            <div>
              {!token && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      data-bs-toggle="modal"
                      data-bs-target="#signInModal"
                    >
                      <a className="text-decoration-none text-dark" href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                </ul>
              )}
              {token && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <div
                      className="nav-link active"
                      data-bs-toggle="modal"
                      data-bs-target="#signInModal"
                    >
                      {profilePictureUrl && (
                        <a className="text-decoration-none text-dark" href="#">
                          <img
                            className="profile-picture"
                            src={profilePictureUrl}
                          />
                        </a>
                      )}
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
      <SigninModal />
    </div>
  );
}

export default Navbar;
