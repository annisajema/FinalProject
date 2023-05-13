import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import RegisterModal from "./register-modal";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const url = axios.create({ baseURL: base_url });


const SigninModal = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");


  
const handleProfilePictureUrl = async (e) => {
  try {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const getProfilePictureUrl = await axios.post(
      `${base_url}/api/v1/upload-image`,
      formData,
      {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const profilePictureUrls = getProfilePictureUrl.data.url;
    setProfilePictureUrl(profilePictureUrls);
    console.log(profilePictureUrls);
  } catch (error) {
    console.log(error.message);
    alert("Failed!");
  }
};


  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      const login = await axios.post(
        `${base_url}/api/v1/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            apiKey: `${api_key}`,
          },
        }
      );
      const token = login.data.token;
      // console.log(login.data.token);
      setToken(token);
      localStorage.setItem("token", token);
      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      setStatus(error.message);
      console.log(error.message);
      setSubmitting(false);
    }
  };

  const handleLoggedUser = async () => {
    if (token) {
      const getLoggedUser = await url.get("api/v1/user", {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = getLoggedUser.data.data.id;
      localStorage.setItem("userId", JSON.stringify(userId));
      setUserId(getLoggedUser.data.data.id);
      setName(getLoggedUser.data.data.name);
      // console.log(response.data.data.name);
      setEmail(getLoggedUser.data.data.email);
      // console.log(response.data.data.email);
      setProfilePictureUrl(getLoggedUser.data.data.profilePictureUrl);
      // console.log(response.data.data.profilePictureUrl);
      setPhoneNumber(getLoggedUser.data.data.phoneNumber);
      // console.log(response.data.data.phoneNumber);
      setRole(getLoggedUser.data.data.role);

    }
  };

  const handleUpdate = () => {
    axios
      .post(
        `${base_url}/api/v1/update-profile`,
        {
          name,
          email,
          profilePictureUrl,
          phoneNumber,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleLoggedUser();
        alert("Profile Updated!");
        window.location.reload();
        // return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleLogout = () => {
    axios
      .get(`${base_url}/api/v1/logout`, {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setToken(null);
        localStorage.clear();
        handleLogin();
        alert("Logout Success!");
        window.location.reload();
        // return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const register = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
      role: "",
      profilePictureUrl: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      passwordRepeat: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      role: Yup.string()
        .oneOf(["user", "admin"], "Select Role")
        .required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,14}$/, "Phone number is not valid")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          `${base_url}/api/v1/register`,

          {
            name: values.name,
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            role: values.role,
            profilePictureUrl: profilePictureUrl,
            phoneNumber: values.phoneNumber,
          },
          {
            headers: {
              apiKey: `${api_key}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert("Registration success!");
          window.location.reload();
        });
    },
  });

  useEffect(() => {
    handleLoggedUser();
  }, [token]);

  return (
    <>
      <div
        className="modal fade"
        id="signInModal"
        tabIndex="-1"
        aria-labelledby="signInModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content border-0">
            <div className="sign-in">
              <button
                type="button"
                className="btn-close btn-close-signin-modal float-end"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="signin-text">Sign in</div>
              <div>
                {!token && (
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                  >
                    {({ isSubmitting, status }) => (
                      <Form>
                        {status && <div>{status}</div>}
                        <div className="d-flex flex-column mt-5 pt-3 mb-2 m-1">
                          Email
                          <Field
                            className="form-control mt-1 w-100"
                            type="email"
                            name="email"
                            placeholder="Email"
                          />
                          <ErrorMessage
                            className="error-text"
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>

                        <div className="d-flex flex-column mt-3 mb-4 m-1">
                          Password
                          <Field
                            className="form-control mt-1 w-100"
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                          <ErrorMessage
                            className="error-text"
                            name="password"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                        <div>
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="/"
                          >
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn btn-light mb-2"
                            >
                              Login
                            </button>
                          </a>
                        </div>
                        <div
                          className="text-center"
                          data-bs-toggle="modal"
                          data-bs-target="#registerModal"
                        >
                          Don't have an account? <br />
                          <a href="#">Register</a>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
                {token && (
                  <div>
                    <ul className="mt-4 p-0">
                      {name && email && profilePictureUrl && phoneNumber && (
                        <div className="mt-4 text-dark">
                          <img
                            className="user-img h-25 w-25 mt-2"
                            src={profilePictureUrl}
                          />
                          <div className="user-name">{name}</div>
                          <br />
                          <div className="user-detail">
                            Email: {email}
                            <br />
                            Phone Number: {phoneNumber}
                            <br />
                            Role : {role}
                          </div>
                        </div>
                      )}
                    </ul>
                    <button
                      className="btn btn-secondary mt-5 mb-2"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal${token}`}
                      onClick={handleLoggedUser}
                    >
                      Update Profile
                    </button>
                    <button
                      className="btn btn-secondary mb-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Register */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content border-0">
            <div className="sign-in">
              <button
                type="button"
                className="btn-close btn-close-signin-modal float-end"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="register-text">Register</div>
              <div className="m-3">
                <form onSubmit={register.handleSubmit}>
                  <div className="form-floating mb-2 ">
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="email"
                      type="email"
                      onChange={register.handleChange}
                      value={register.values.email}
                    />
                    <label htmlFor="email">Email Address</label>
                    {register.touched.email && register.errors.email ? (
                      <div className="error-text" style={{ color: "red" }}>
                        {register.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="name"
                      type="text"
                      onChange={register.handleChange}
                      value={register.values.name}
                    />
                    {register.touched.name && register.errors.name ? (
                      <span className="error-text" style={{ color: "red" }}>
                        {register.errors.name}
                      </span>
                    ) : null}
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="password"
                      type="password"
                      onChange={register.handleChange}
                      value={register.values.password}
                    />
                    <label htmlFor="password">Password</label>
                    {register.touched.password && register.errors.password ? (
                      <div className="error-text" style={{ color: "red" }}>
                        {register.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <input
                      className="form-control"
                      id="passwordRepeat"
                      name="passwordRepeat"
                      placeholder="passwordRepeat"
                      type="password"
                      onChange={register.handleChange}
                      value={register.values.passwordRepeat}
                    />
                    <label htmlFor="passwordRepeat">Confirm Password</label>
                    {register.touched.passwordRepeat &&
                    register.errors.passwordRepeat ? (
                      <div className="error-text" style={{ color: "red" }}>
                        {register.errors.passwordRepeat}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      type="text"
                      onChange={register.handleChange}
                      value={register.values.role}
                    >
                      <option select="true">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <label htmlFor="role">Role</label>
                    {register.touched.role && register.errors.role ? (
                      <div className="error-text" style={{ color: "red" }}>
                        {register.errors.role}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2 mt-2">
                    <input
                      className="form-control"
                      id="profilePictureUrl"
                      name="profilePictureUrl"
                      type="file"
                      onChange={handleProfilePictureUrl}
                      // value={register.values.profilePictureUrl}
                    />
                    {register.touched.profilePictureUrl &&
                    register.errors.profilePictureUrl ? (
                      <div className="error-text" style={{ color: "red" }}>
                        {register.errors.profilePictureUrl}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <input
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="phoneNumber"
                      type="text"
                      onChange={register.handleChange}
                      value={register.values.phoneNumber}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    {register.touched.phoneNumber &&
                    register.errors.phoneNumber ? (
                      <div className="error-text" style={{ color: "red" }}>
                        {register.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                  <button className="btn mt-3" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update */}
      <div>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              profilePictureUrl: "",
              phoneNumber: "",
            }}
            // onSubmit={handleEdit(category.id)}
          >
            <div className="modal fade" tabIndex="-1" id={`modal${token}`}>
              <div className="modal-dialog bg-light rounded-3">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Profile</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Form>
                      <div className="form-floating mb-2 ">
                        <Field
                          className="form-control"
                          id="username"
                          name="name"
                          placeholder="name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name || ""}
                        />
                        <label htmlFor="username">Name</label>
                      </div>
                      <div className="form-floating mt-2 mb-2 ">
                        <Field
                          className="form-control"
                          id="useremail"
                          name="email"
                          placeholder="email"
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email || ""}
                        />
                        <label htmlFor="useremail">Email</label>
                      </div>
                      <div className="mt-2 mb-2">
                        <input
                          className="form-control"
                          id="userprofilePictureUrl"
                          name="profilePictureUrl"
                          type="file"
                          onChange={handleProfilePictureUrl}
                          // value={profilePictureUrl || ""}
                        />
                      </div>
                      <div className="form-floating mt-2 mb-2">
                        <Field
                          className="form-control"
                          id="userphoneNumber"
                          name="phoneNumber"
                          type="text"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber || ""}
                        />
                        <label htmlFor="userphoneNumber">Phone Number</label>
                      </div>
                      <button
                        className="btn mt-3"
                        type="submit"
                        onClick={() => handleUpdate()}
                      >
                        Submit
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Formik>
        </div>
      </div>
    </>
  );
};
// }

export default SigninModal;
