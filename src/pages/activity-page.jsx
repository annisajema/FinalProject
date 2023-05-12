import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";
import { useParams } from "react-router-dom";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const url = axios.create({ baseURL: base_url });
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function ActivityPage() {
  const { id } = useParams();
  console.log(id);
  const [categories, setCategories] = useState([]);
  const [activitiesByCategory, setActivitiesByCategory] = useState([]);
  const [categoriesById, setCategoryById] = useState([]);
  const [activityCategoryId, setActivityCategoryId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoriesId, setCategoriesId] = useState(
    JSON.parse(localStorage.getItem("categoriesId"))
  );
  const [imageUrl, setImageUrl] = useState(
    JSON.parse(localStorage.getItem("imageUrl"))
  );
  const [name, setName] = useState(JSON.parse(localStorage.getItem("name")));

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

  const handleActivitiesByCategoryId = async (id) => {
    try {
      const getActivitiesByCategoryId = await axios.get(
        `${base_url}/api/v1/activities-by-category/${id}`,
        {
          headers: {
            apiKey: `${api_key}`,
          },
        }
      );
      const activityCategoryId = getActivitiesByCategoryId.data.data.map(
        ({ categoryId }) => categoryId
      );
      setActivityCategoryId(activityCategoryId);
      // console.log(activityCategoryId);
      // setActivityCategoryId(getActivitiesByCategoryId.data.data);
      setActivitiesByCategory(getActivitiesByCategoryId.data.data);
      console.log(setActivitiesByCategory);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  // useEffect(() => {
  //   handleGetCategories();
  // }, []);
  useEffect(() => {
    const ActivitiesByCategoryId = async () => {
      // if (sessionId) {
        const getActivitiesByCategoryId = await axios.get(
          `${base_url}/api/v1/activities-by-category/${id}`,
          {
            headers: {
              apiKey: `${api_key}`,
            },
          }
        );
        setActivitiesByCategory(getActivitiesByCategoryId.data.data);
      // }
    };
    ActivitiesByCategoryId();
  }, [id]);

  
  // useEffect(() => {
  //   try {
  //     const getActivitiesByCategoryId = axios.get(
  //       `${base_url}/api/v1/activities-by-category/${id}`,
  //       {
  //         headers: {
  //           apiKey: `${api_key}`,
  //         },
  //       }
  //     );
  //     // const activityCategoryId = getActivitiesByCategoryId.data.data.map(
  //     //   ({ categoryId }) => categoryId
  //     // );
  //     // setActivityCategoryId(activityCategoryId);
  //     // console.log(activityCategoryId);
  //     // setActivityCategoryId(getActivitiesByCategoryId.data.data);
  //     setActivitiesByCategory(getActivitiesByCategoryId.data);
  //     console.log(setActivitiesByCategory);
  //   } catch (error) {
  //     console.log(error.message);
  //     alert("Failed!");
  //   }
  // }, [id]);

  return (
    <div className="category-page">
      <Navbar />
      {/* {id( */}
      {activitiesByCategory.map((activity, i) => {
              return (
                <div className="container-fluid p-0">
                  <div>
                    {/* Category Card */}
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        {/* <h4 id="dark-switch" className="pt-2 pb-3 mb-0">
                Activity
              </h4> */}
                        {/* <h6 id="dark-switch" className="pt-4 mb-0 float-end">
                More&gt;
              </h6> */}
                      </div>

                      <div
                        key={i}
                        className="col-6 col-xs-3 col-sm-3 col-md-6 col-lg-6 col-xl col-xxl"
                      >
                        {/* <p>{activity.category.name}</p> */}
                        {/* <div className="card" style={{width: "18rem"}} data-bs-toggle="modal"
                      data-bs-target={`#modal${promo.id}`}>
                        <img className="card-img" src={promo.imageUrl} alt="..."/>
                        <div className="card-body">
                          <h5 className="card-title">{promo.code}</h5>
                          <p className="card-text">{promo.title}</p>
                          <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                      </div> */}
                        {/* <div className="card">
                    <div
                      className="card-body p-0"
                      //   data-bs-toggle="modal"
                      // data-bs-target={`#modal${category.id}`}
                    > */}
                        {/* <h6>
                    What to Do at {activity.category.name}
                  </h6> */}
                        <h4 className="mt-5">{activity.title}</h4>
                        <img
                          className="d-flex float-start ms-0 m-3 w-50 h-75 rounded-1"
                          src={activity.imageUrls}
                        />
                        {/* <div className="category-overlay"> */}
                        <div className="m-3">{activity.description}</div>
                        {/* </div> */}
                        {/* <div className="card-body">
                        <div className="card-title">{category.name}</div>
                      </div> */}
                        {/* </div>
                  </div> */}

                        {/* Modal */}
                        {/* <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Modal title
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
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
                        </div>
                      </div>
                    </div>
                  </div> */}
                        {/* <div
                    className="modal fade "
                    id={`modal${category.id}`}
                    tabIndex="-1"
                    aria-labelledby="movie1Label"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">
                            Fun Activities to Do at {category.name}
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
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
                        </div>
                      </div>
                    </div> */}
                        {/* </div> */}
                      </div>
                    </div>

                    {/* Category Card */}
                  </div>
                </div>
              );
            })}
    </div>
  );
}

export default ActivityPage;
