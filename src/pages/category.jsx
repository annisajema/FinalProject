import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const url = axios.create({ baseURL: base_url });
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function Category() {
  const [categories, setCategories] = useState([]);
  const [categoriesById, setCategoryById] = useState([]);
  const [categoryId, setCategoryId] = useState(
    JSON.parse(localStorage.getItem("categoryId"))
  );
  const [imageUrl, setImageUrl] = useState(
    JSON.parse(localStorage.getItem("imageUrl"))
  );
  const [name, setName] = useState(JSON.parse(localStorage.getItem("name")));
  // console.log(JSON.parse(localStorage.getItem("imageUrl")));
  // const [categoryId, setCategoryId] = useState("");
  // const [imageUrlUpdate, setImageUrlUpdate] = useState("");
  // const [nameUpdate, setNameUpdate] = useState("");
  // const [id, setId] = useState(null);
  // const [newName, setNewName] = useState("");
  // const [newImageUrl, setNewImageUrl] = useState("");
  // const [data, setData] = useState([]);

  const handleCategory = (values) => {
    axios
      .post(
        `${base_url}/api/v1/create-category`,
        {
          name: values.name,
          imageUrl: values.imageUrl,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Category Created!");
        window.location.reload();
        return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  // const getCategories = url.get("api/v1/categories", {
  //   headers: {
  //     apiKey: `${api_key}`,
  //   },
  // })

  const handleGetCategories = async () => {
    try {
      const getCategory = await axios.get(`${base_url}/api/v1/categories`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      // const categoryId = getCategory.data.data.map(({ id }) => id);
      // const imageUrl = getCategory.data.data.map(({ imageUrl }) => imageUrl);
      // const name = getCategory.data.data.map(({ name }) => name);
      // localStorage.setItem("categoryId", JSON.stringify(categoryId));
      // localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
      // localStorage.setItem("name", JSON.stringify(name));
      // setName(name);
      // console.log(name);
      // setImageUrl(imageUrl);
      // console.log(imageUrl);
      // setCategoryId(categoryId);
      // console.log(categoryId);
      setCategories(getCategory.data.data);
      // console.log(getCategory.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCategoryById = async (id) => {
    try {
      const getCategoryById = await axios.get(
        `${base_url}/api/v1/category/${id}`,
        {
          headers: {
            apiKey: `${api_key}`,
          },
        }
      );
      const categoryId = getCategoryById.data.data.id;
      const imageUrl = getCategoryById.data.data.imageUrl;
      const name = getCategoryById.data.data.name;
      localStorage.setItem("categoryId", JSON.stringify(categoryId));
      localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
      localStorage.setItem("name", JSON.stringify(name));
      setName(name);
      console.log(name);
      setImageUrl(imageUrl);
      console.log(imageUrl);
      setCategoryId(categoryId);
      console.log(categoryId);
      setCategoryById(getCategoryById.data.data);
      console.log(getCategoryById.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleUpdate = (id) => {
  //   // console.log(id);
  //   axios
  //     .post(`${base_url}/api/v1/update-category/${id}`, {
  //       headers: {
  //         apiKey: `${api_key}`,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       //  console.log(response.data.data);
  //       handleGetCategories();
  //       alert("Category Updated!");
  //       window.location.reload();
  //     });
  // };

  // const setData = (data) => {
  //   let { categoryId, name, imageUrl } = data;
  //   localStorage.setItem("categoryId", JSON.stringify(categoryId));
  //   localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
  //   localStorage.setItem("name", JSON.stringify(name));
  // };

  // const handleNameChange = (e) => {
  //   console.log(e)
  //   setNameUpdate(e.target.value);
  // };

  // const handleImageChange = (e) => {
  //   console.log(e)
  //   setImageUrlUpdate(e.target.value);
  // };

  const handleEdit = (id) => {
    axios
      .post(
        `${base_url}/api/v1/update-category/${id}`,
        {
          name,
          imageUrl,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        handleGetCategories();
        alert("Category Updated!");
        window.location.reload();
        return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/api/v1/delete-category/${id}`, {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        //  console.log(response.data.data);
        handleGetCategories();
        alert("Category Deleted!");
        window.location.reload();
      });
  };

  // const handleGetCategories = async () => {
  //   const response = await url.get("api/v1/categories", {
  //     headers: {
  //       apiKey: `${api_key}`,
  //     },
  //   });
  //   setCategories(response.data.data);
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // if (categoryId) {
  //     const response = handleGetCategories();
  //     setCategories(response.data.data);
  //     // }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // if (categoryId) {
  //       const response = await url.get("api/v1/categories", {
  //         headers: { apiKey: `${api_key}` },
  //       });
  //       setCategories(response.data.data);
  //     // }
  //   };
  //   fetchData();
  // }, [categoryId]);

  useEffect(() => {
    // const categoryId = JSON.parse(localStorage.getItem("categoryId"));
    // const name = JSON.parse(localStorage.getItem("name"));
    // const imageUrl = JSON.parse(localStorage.getItem("imageUrl"));
    handleGetCategories();
    // setCategoryId(JSON.parse(localStorage.getItem("categoryId")));
    // setName(JSON.parse(localStorage.getItem("name")));
    // setImageUrl(JSON.parse(localStorage.getItem("imageUrl")));
  }, []);

  // useEffect(() => {
  //   const handleGetCategories = async () => {
  //     // if (token) {
  //       const response = await url.get("api/v1/categories", {
  //         headers: {
  //           apiKey: `${api_key}`,
  //         },
  //       });
  //       setCategories(response.data.data);
  //   };
  //   handleGetCategories();
  // }, []);

  // useEffect(() => {
  //   getCategories.then((response) => {
  //     setCategories(response.data.data);
  //     console.log(response.data.data);
  //   });
  // }, []);
  return (
    <div className="admin-page">
      <div className="fs-2 text-center m-2">Categories</div>
      <button className="text-light float-end mb-3">Create</button>
      <div className="table">
        <div>
          <div className="table-header">
            <div>No.</div>
            <div>ID</div>
            <div>Name</div>
            <div>Image URL</div>
            <div>Created At</div>
            <div>Updated At</div>
            <div>Action</div>
          </div>
        </div>

        <div>
          {categories.map((category, i) => {
            return (
              <div key={i}>
                <div className="table-body">
                  <div className="table-row">
                    <div>{i + 1}</div>
                    <div>{category.id}</div>
                    <div>{category.name}</div>
                    <div style={{ wordBreak: "break-all" }}>
                      {category.imageUrl}
                    </div>
                    <div className="d-table-cell">{category.createdAt}</div>
                    <div className="d-table-cell">{category.updatedAt}</div>
                    <div className="d-table-cell">
                      {/* <span className="me-2">
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-list-ul"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        />
                      </svg>
                    </a>
                  </span> */}
                      <span
                        className="me-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#modal${categoryId}`}
                      >
                        <a href="#">
                          <button
                            onClick={() => handleCategoryById(category.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square text-dark"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                        </a>
                      </span>
                      <span className="me-2">
                        <a href="#">
                          <button onClick={() => handleDelete(category.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3-fill text-dark"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                          </button>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* MODAL */}
          <div>
            {/* {categoriesById.map((categoryById, i) => {
              return ( */}
            <div>
              <Formik
                initialValues={{
                  name: categoriesById.name,
                  imageUrl: categoriesById.imageUrl,
                }}
                // onSubmit={handleEdit(category.id)}
              >
                <div
                  className="modal fade"
                  tabIndex="-1"
                  id={`modal${categoryId}`}
                >
                  <div className="modal-dialog bg-light rounded-3">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Update Category</h5>
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
                                onChange={(e) => setName(e.target.value)}
                                value={name}
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
                                onChange={(e) => setImageUrl(e.target.value)}
                                value={imageUrl}
                              />
                            </div>
                          </div>
                          <button
                            className="btn mt-3"
                            type="submit"
                            onClick={() => handleEdit(categoriesById.id)}
                          >
                            Submit
                          </button>
                        </Form>
                      </div>
                      {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div> */}
                    </div>
                  </div>
                </div>
              </Formik>
            </div>
            {/* );
            })} */}
          </div>
        </div>
      </div>

      <Navbar />
      <div className="fs-2 m-4 d-flex justify-content-center align-items-center">
        Create Category
      </div>
      <Formik
        initialValues={{
          name: "",
          imageUrl: "",
        }}
        onSubmit={handleCategory}
      >
        <Form>
          <div className="row mb-2 ">
            <label htmlFor="name" className="col-sm-2 col-form-label ps-0">
              name
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="nameid"
                name="name"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.categoryId}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="imageUrl" className="col-2 col-form-label ps-0">
              imageUrl
            </label>
            <div className="col-10">
              <Field
                className="form-control"
                id="imageUrl"
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
  );
}

export default Category;
