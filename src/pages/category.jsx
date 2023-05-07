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
  const [categoryId, setCategoryId] = useState(JSON.parse(localStorage.getItem("categoryId")));
  const [categoriesId, setCategoriesId] = useState(JSON.parse(localStorage.getItem("categoriesId")));
  const [imageUrl, setImageUrl] = useState(JSON.parse(localStorage.getItem("imageUrl")));
  const [name, setName] = useState(JSON.parse(localStorage.getItem("name")));

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

  const handleGetCategories = async () => {
    try {
      const getCategory = await axios.get(`${base_url}/api/v1/categories`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      const categoriesId = getCategory.data.data.map(({ id }) => id);
      const imageUrl = getCategory.data.data.map(({ imageUrl }) => imageUrl);
      const name = getCategory.data.data.map(({ name }) => name);
      localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
      localStorage.setItem("name", JSON.stringify(name));
      localStorage.setItem("categoriesId", JSON.stringify(categoriesId));
      setCategoriesId(categoriesId);
      // console.log(categoryId);
      setCategories(getCategory.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
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
      // localStorage.setItem("categoryId", JSON.stringify(categoryId));
      // localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
      // localStorage.setItem("name", JSON.stringify(name));
      setName(name);
      // console.log(name);
      setImageUrl(imageUrl);
      // console.log(imageUrl);
      setCategoryId(categoryId);
      // console.log(categoryId);
      setCategoryById(getCategoryById.data.data);
      // console.log(getCategoryById.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

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
      .then(() => {
        handleGetCategories();
        alert("Category Updated!");
        window.location.reload();
        // return response;
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

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div className="admin-page">
      <div className="fs-2 text-center m-2">Categories</div>
      <button
        className="d-flex text-light mb-3"
        data-bs-toggle="modal"
        data-bs-target="#modalCreate"
      >
        Create
      </button>
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image URL</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {categories.map((category, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{categoriesId}</td>
                  <td>{category.name}</td>
                  <td style={{ wordBreak: "break-all" }}>
                    {category.imageUrl}
                  </td>
                  <td className="d-table-cell">{category.createdAt}</td>
                  <td className="d-table-cell">{category.updatedAt}</td>
                  {/* <span className="row" scope="row"> */}
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${categoryId}`}
                  >
                    {/* <a href="#" className="me-2 "> */}
                    <button onClick={() => handleCategoryById(category.id)}>
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
                  <td className="">
                    {/* <a href="#"> */}
                    <button onClick={() => handleDelete(category.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3-fill text-light"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                    </button>
                    {/* </a> */}
                  </td>
                  {/* </span> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
            <div className="modal fade" tabIndex="-1" id={`modal${categoryId}`}>
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
                            id="idname"
                            name="name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name || ""}
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
                            id="idimageUrl"
                            name="imageUrl"
                            type="text"
                            onChange={(e) => setImageUrl(e.target.value)}
                            value={imageUrl || ""}
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
                </div>
              </div>
            </div>
          </Formik>
        </div>
        {/* );
            })} */}
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
                onSubmit={handleCategory}
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

export default Category;
