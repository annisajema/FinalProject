import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function Category() {
  const [categories, setCategories] = useState([]);

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
      .catch((error) => {
        alert("Failed!");
      });
  };

  const url = axios.create({ baseURL: base_url });
  const getCategories = url.get("api/v1/categories", {
    headers: {
      apiKey: `${api_key}`,
    },
  });
  //   const getPopular = url.get("api/v1/banners", { params: { api_key } });

  useEffect(() => {
    getCategories.then((response) => {
      setCategories(response.data.data);
      console.log(response.data.data);
    });
  }, []);
  return (
    <div className="admin-page">
      <div className="fs-2 text-center m-2">Categories</div>
      <button className="text-light float-end mb-3">Create</button>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">No.</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Image URL</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
        </thead>
        {categories.map((category, i) => {
          return (
            <tbody key={i}>
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td style={{ wordBreak: "break-all" }}>{category.imageUrl}</td>
                <td>{category.createdAt}</td>
                <td>{category.updatedAt}</td>
              </tr>
            </tbody>
          );
        })}
      </table>

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
