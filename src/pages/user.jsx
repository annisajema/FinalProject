import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const url = axios.create({ baseURL: base_url });
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

function User() {
  const [users, setAllUser] = useState([]);
  const [role, setRole] = useState("")
  const [usersId, setUsersId] = useState(JSON.parse(localStorage.getItem("usersId")));
  const [imageUrl, setImageUrl] = useState("");
//   const [userId, setUserId] = useState(
//     JSON.parse(localStorage.getItem("userId"))
//   );


  const handleGetAllUser = async () => {
    try {
      const getAllUser = await axios.get(`${base_url}/api/v1/all-user`, {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      });
      const usersId = getAllUser.data.data.map(({ id }) => id);
        localStorage.setItem("usersId", JSON.stringify(usersId));
        setUsersId(usersId);
      setAllUser(getAllUser.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handleEdit = (id) => {
    axios
      .post(
        `${base_url}/api/v1/update-user-role/${id}`,
        {
          role,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleGetAllUser();
        alert("Role Updated!");
        window.location.reload();
        // return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };


  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <div className="admin-page">
      <div className="fs-2 text-center m-2">Users</div>
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th className="text-center" scope="col">
                Profile Picture
              </th>
              <th scope="col">Phone Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="text-center">
                    <img
                      className="w-50 h-50 rounded-3"
                      src={user.profilePictureUrl}
                    />
                  </td>
                  <td>{user.phoneNumber}</td>
                  {/* <span className="row" scope="row"> */}
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${user.id}`}
                  >
                    {/* <a href="#" className="me-2 "> */}
                    <button onClick={() => handleGetAllUser(user.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square text-light"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    {/* </a> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <div>
        {users.map((user, i) => {
          return (
            <div key={i}>
              <Formik
                initialValues={{
                  name: "name",
                  role: "role",
                }}
                // onSubmit={handleEdit(category.id)}
              >
                <div
                  className="modal fade"
                  tabIndex="-1"
                  id={`modal${user.id}`}
                >
                  <div className="modal-dialog bg-light rounded-3">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Update Role</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <Form>
                          <div className="row mb-2 ">
                            <label
                              htmlFor="role"
                              className="col-sm-2 col-form-label ps-0"
                            >
                              Role
                            </label>
                            <div className="col-sm-10">
                              <Field
                                className="form-control"
                                id={`role${user.id}`}
                                name="role"
                                type="text"
                                onChange={(e) => setRole(e.target.value)}
                                value={role || ""}
                              />
                            </div>
                          </div>
                          <button
                            className="btn mt-3"
                            type="submit"
                            onClick={() => handleEdit(user.id)}
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
          );
        })}
      </div>

      <Navbar />
      {/* <div className="fs-2 m-4 d-flex justify-content-center align-items-center">
        Create Category
      </div> */}

      {/* Modal Create */}
      <div className="modal" tabIndex="-1" id="modalCreate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  name: "",
                  imageUrl: "",
                }}
                onSubmit={handleGetAllUser}
              >
                <Form>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="name"
                      className="col-sm-2 col-form-label ps-0"
                    >
                      name
                    </label>
                    <div className="col-sm-10">
                      <Field
                        className="form-control"
                        id="name-id"
                        name="name"
                        type="text"
                        // onChange={activity.handleChange}
                        // value={activity.values.categoryId}
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="imageUrl"
                      className="col-2 col-form-label ps-0"
                    >
                      imageUrl
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        id="imageUrlid"
                        name="imageUrl"
                        type="text"
                        // onChange={activity.handleChange}
                        // value={activity.values.title}
                      />
                    </div>
                  </div>
                  <button className="btn mt-3" type="submit">
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
