import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";
// import NavbarAdmin from "../components/navbar-admin";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const url = axios.create({ baseURL: base_url });
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");
const categoryId = localStorage.getItem("categoryId");
const categoriesId = localStorage.getItem("categoriesId");

function Activity() {
  const [activities, setActivities] = useState([]);
  const [activitiesById, setActivitiesById] = useState([]);
  const [activityId, setActivityId] = useState(JSON.parse(localStorage.getItem("activityId")));
  const [categoryId, setCategoryId] = useState(JSON.parse(localStorage.getItem("categoryId")));
  const [categoriesId, setCategoriesId] = useState(JSON.parse(localStorage.getItem("categoriesId")));
  const [newCategoriesId, setNewCategoriesId] = useState("");
  const [activitiesId, setActivitiesId] = useState("");
  const [activityCategoryId, setActivityCategoryId] = useState("");
  // const [imageUrls, setImageUrls] = useState(JSON.parse(localStorage.getItem("imageUrl")));
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [price_discount, setPriceDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [total_reviews, setTotalReviews] = useState(0);
  const [facilities, setFacilities] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location_maps, setLocationMaps] = useState("");

  // const handleFileUpload = (e) => {
  //   const image = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", e.target.files[0]);
  //   axios
  //     .post(`${base_url}/api/v1/upload-image`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         apiKey: `${api_key}`,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // const [selectValue, setSelectValue] = useState("");
  const onChange = (event) => {
    const value = event.target.value;
    setCategoryId(value);
  };


  const handleImageUrl = async (e) => {
    try {
    // const image =  e.target.files[0];
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
      const getImageUrl = await axios.post(
        `${base_url}/api/v1/upload-image`, formData,
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrls = getImageUrl.data.url;
      setImageUrls(imageUrls);
      console.log(imageUrls);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };


  const handleActivity = (values) => {
    axios
      .post(
        `${base_url}/api/v1/create-activity`,
        {
          categoryId: categoryId,
          title: values.title,
          description: values.description,
          imageUrls: [imageUrls],
          price: values.price,
          price_discount: values.price_discount,
          rating: values.rating,
          total_reviews: values.total_reviews,
          facilities: values.facilities,
          address: values.address,
          province: values.province,
          city: values.city,
          location_maps: values.location_maps,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Activity Created!");
        window.location.reload();
        return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleGetActivities = async () => {
    try {
      const getActivity = await axios.get(`${base_url}/api/v1/activities`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      const activitiesId = getActivity.data.data.map(({ id }) => id);
      const newCategoriesId = getActivity.data.data.map(({ categoryId }) => categoryId);
      // localStorage.setItem("categoriesId", JSON.stringify(categoriesId));
      setActivitiesId(activitiesId);
      console.log(activitiesId);
      setNewCategoriesId(newCategoriesId);
      console.log(newCategoriesId);
      setActivities(getActivity.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handleActivitiesById = async (id) => {
    try {
      const getActivitiesById = await axios.get(
        `${base_url}/api/v1/activity/${id}`,
        {
          headers: {
            apiKey: `${api_key}`,
          },
        }
      );
      const activityId = getActivitiesById.data.data.id;
      const title = getActivitiesById.data.data.title;
      const description = getActivitiesById.data.data.description;
      const imageUrls = getActivitiesById.data.data.imageUrls;
      const price = getActivitiesById.data.data.price;
      const price_discount = getActivitiesById.data.data.price_discount;
      const rating = getActivitiesById.data.data.rating;
      const total_reviews = getActivitiesById.data.data.total_reviews;
      const facilities = getActivitiesById.data.data.facilities;
      const address = getActivitiesById.data.data.address;
      const province = getActivitiesById.data.data.province;
      const city = getActivitiesById.data.data.city;
      const location_maps = getActivitiesById.data.data.location_maps;
      localStorage.setItem("activityId", JSON.stringify(activityId));
      // localStorage.setItem("imageUrls", JSON.stringify(imageUrls));
      setImageUrls(imageUrls);
      // console.log(imageUrl);
      setActivityId(activityId);
      // console.log(categoryId);
      setTitle(title);
      setDescription(description);
      setPrice(price);
      setPriceDiscount(price_discount);
      setRating(rating);
      setTotalReviews(total_reviews);
      setFacilities(facilities);
      setAddress(address);
      setProvince(province);
      setCity(city);
      setLocationMaps(location_maps);
      setActivitiesById(getActivitiesById.data.data);
      // console.log(getActivitiesById.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  // const handleActivitiesByCategoryId = async (categoryId) => {
  //   try {
  //     const getActivitiesByCategoryId = await axios.get(
  //       `${base_url}/api/v1/activities-by-category/${categoryId}`,
  //       {
  //         headers: {
  //           apiKey: `${api_key}`,
  //         },
  //       }
  //     );
  //     const activityCategoryId = getActivitiesByCategoryId.data.data.map(
  //       ({ categoryId }) => categoryId
  //     );
  //     setActivityCategoryId(activityCategoryId);
  //     console.log(activityCategoryId);
  //     setActivityCategoryId(getActivitiesByCategoryId.data.data);
  //   } catch (error) {
  //     console.log(error.message);
  //     alert("Failed!");
  //   }
  // };

  const handleEdit = (id) => {
    axios
      .post(
        `${base_url}/api/v1/update-activity/${id}`,
        {
          categoryId,
          title,
          description,
          imageUrls: [imageUrls],
          price: parseInt(price),
          price_discount: parseInt(price_discount),
          rating: parseInt(rating),
          total_reviews: parseInt(total_reviews),
          facilities,
          address,
          province,
          city,
          location_maps,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleGetActivities();
        alert("Activity Updated!");
        window.location.reload();
        // return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/api/v1/delete-activity/${id}`, {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        //  console.log(response.data.data);
        handleGetActivities();
        alert("Activity Deleted!");
        window.location.reload();
      });
  };

  useEffect(() => {
    handleGetActivities();
  }, []);

  return (
    <div className="admin-page">
      {/* <NavbarAdmin /> */}
      <div className="fs-2 text-center m-2">Activities</div>
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
              <th scope="col">Category ID</th>
              <th scope="col">Title</th>
              {/* <th scope="col">Description</th>
              <th scope="col">Image URL</th>
              <th scope="col">Price</th>
              <th scope="col">Price Discount</th>
              <th scope="col">Rating</th>
              <th scope="col">Total Reviews</th>
              <th scope="col">Facilities</th>
              <th scope="col">Address</th>
              <th scope="col">Province</th>
              <th scope="col">City</th>
              <th scope="col">Location Maps</th> */}
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {activities.map((activity, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{activity.id}</td>
                  <td>{activity.categoryId}</td>
                  <td>{activity.title}</td>
                  {/* <td>{activity.description}</td>
                  <td className="text-center">
                    <img className="w-50 h-50" src={activity.imageUrls} />
                  </td>
                  <td>{activity.price}</td>
                  <td>{activity.price_discount}</td>
                  <td>{activity.rating}</td>
                  <td>{activity.total_reviews}</td>
                  <td>{activity.facilities}</td>
                  <td>{activity.address}</td>
                  <td>{activity.province}</td>
                  <td>{activity.city}</td>
                  <td>
                    <iframe src={activity.location_maps}></iframe>
                  </td> */}
                  <td>{activity.createdAt}</td>
                  <td>{activity.updatedAt}</td>
                  {/* <span className="row" scope="row"> */}
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#detail${activityId}`}
                  >
                    {/* <a href="#" className="me-2 "> */}
                    <button onClick={() => handleActivitiesById(activity.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-list text-light"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                    </button>
                    {/* </a> */}
                  </td>
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${activityId}`}
                  >
                    {/* <a href="#" className="me-2 "> */}
                    <button onClick={() => handleActivitiesById(activity.id)}>
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
                    <button onClick={() => handleDelete(activity.id)}>
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

      {/* Modal Detail */}
      {/* MOdal Lama */}
      <div
        className="modal fade"
        id={`detail${activityId}`}
        tabIndex="-1"
        aria-labelledby="movie1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div
            className="modal-content"
            // style="background-color: rgba(13, 13, 13, 0.9)"
          >
            <div className="modal-header border-0 pt-4 pb-0">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">
                <strong className="ps-3">{title}</strong>
              </h1>
              <button
                type="button"
                className="btn-close btn-close-signin-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body m-3 mt-0">
              <hr className="pt-0 mt-0" />
              <img
                className="float-start rounded-3 me-3 w-50 h-50"
                src={imageUrls}
              />
              {/* <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-5 mb-2 me-2"
              >
                Drama
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-5 mb-2 me-2"
              >
                Romance
              </button> */}
              <p>
                <b>Description</b>
                <br />
                {description}
              </p>
              <div className="w-100 float-start mt-3">
                <b>Detail</b>
                <div className="w-100">Price: {price}</div>
                <div className="w-100">Price Discount: {price_discount}</div>
                <div className="w-100">Rating: {rating}</div>
                <div className="w-100">Total Reviews: {total_reviews}</div>
                <div className="w-100">Facilities: {facilities}</div>
                <div className="w-100">Address: {address}</div>
                <div className="w-100">Province: {province}</div>
                <div className="w-100">City: {city}</div>
                <iframe className="w-100 p-3" src={location_maps}>
                  Location Maps:{" "}
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update */}
      <div>
        {/* {activitiesById.map((categoryById, i) => {
              return ( */}
        <div>
          <Formik
            initialValues={{
              categoryId: categoryId,
              title: "",
              description: "",
              imageUrls: "",
              price: 0,
              price_discount: 0,
              rating: 0,
              total_reviews: 0,
              facilities: "",
              address: "",
              province: "",
              city: "",
              location_maps: "",
            }}
            // onSubmit={handleEdit(category.id)}
          >
            <div className="modal fade" tabIndex="-1" id={`modal${activityId}`}>
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
                          htmlFor="categoryId"
                          className="col-sm-2 col-form-label ps-0"
                        >
                          categoryId
                        </label>
                        <div className="col-sm-10">
                          <Field
                            as="select"
                            className="form-control"
                            id="categoryId"
                            name="categoriesId"
                            type="text"
                            onChange={(e) => setCategoryId(e.target.value)}
                            // value={categoryId || ""}
                          >
                            {categoriesId.map((categoryId, i) => {
                              return (
                                <option key={categoryId} value={categoryId}>
                                  {categoryId}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                      </div>
                      <div className="row mb-2 form-floating">
                        <label
                          htmlFor="title"
                          className="col-2 col-form-label ps-0"
                        >
                          title
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityTitleId"
                            name="title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="description"
                          className="col-2 col-form-label ps-0"
                        >
                          description
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityDescriptionId"
                            name="description"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description || ""}
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
                          <input
                            className="form-control"
                            id="idimageUrl"
                            name="imageUrl"
                            type="file"
                            onChange={(e) => setImageUrls(e.target.value)}
                            // value={imageUrls || ""}
                          />
                          <img className="w-25 h-50" src={imageUrls} />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="price"
                          className="col-2 col-form-label ps-0"
                        >
                          price
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityPriceId"
                            name="price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="price_discount"
                          className="col-2 col-form-label ps-0"
                        >
                          price_discount
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityPriceDiscountId"
                            name="price_discount"
                            type="number"
                            onChange={(e) => setPriceDiscount(e.target.value)}
                            value={price_discount || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="rating"
                          className="col-2 col-form-label ps-0"
                        >
                          rating
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityRatingId"
                            name="rating"
                            type="number"
                            onChange={(e) => setRating(e.target.value)}
                            value={rating || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="total_reviews"
                          className="col-2 col-form-label ps-0"
                        >
                          total_reviews
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityTotalReviewsId"
                            name="total_reviews"
                            type="number"
                            onChange={(e) => setTotalReviews(e.target.value)}
                            value={total_reviews || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="facilities"
                          className="col-2 col-form-label ps-0"
                        >
                          facilities
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityFacilitiesId"
                            name="facilities"
                            type="text"
                            onChange={(e) => setFacilities(e.target.value)}
                            value={facilities || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="address"
                          className="col-2 col-form-label ps-0"
                        >
                          address
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityAddressId"
                            name="address"
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="province"
                          className="col-2 col-form-label ps-0"
                        >
                          province
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityProvinceId"
                            name="province"
                            type="text"
                            onChange={(e) => setProvince(e.target.value)}
                            value={province || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="city"
                          className="col-2 col-form-label ps-0"
                        >
                          city
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityCityId"
                            name="city"
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            value={city || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="location_maps"
                          className="col-2 col-form-label ps-0"
                        >
                          location_maps
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="activityLocationMapsId"
                            name="location_maps"
                            type="text"
                            onChange={(e) => setLocationMaps(e.target.value)}
                            value={location_maps || ""}
                          />
                        </div>
                      </div>

                      <button
                        className="btn mt-3"
                        type="submit"
                        onClick={() => handleEdit(activitiesById.id)}
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
        <div className="modal-dialog modal-dialog-centered">
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
                  categoryId: categoryId,
                  title: "",
                  description: "",
                  imageUrls: imageUrls,
                  price: 0,
                  price_discount: 0,
                  rating: 0,
                  total_reviews: 0,
                  facilities: "",
                  address: "",
                  province: "",
                  city: "",
                  location_maps: "",
                }}
                onSubmit={handleActivity}
              >
                {/* {newCategoriesId.map((newCategoryId, i) => {
                  return ( */}
                <Form>
                  <div className="form-floating">
                    <Field
                      as="select"
                      className="form-select"
                      id="categoriesId"
                      name="categoriesId"
                      placeholder="Category Id"
                      type="text"
                      onChange={onChange}
                      // onChange={handleActivitiesByCategoryId(
                      //   newCategoryId[i]
                      // )}
                    >
                      <option select="true">
                        Open this select menu
                      </option>
                      {categoriesId.map((categoryId, i) => {
                        return (
                          <option key={categoryId} value={categoryId}>
                            {categoryId}
                          </option>
                        );
                      })}
                    </Field>
                    <label htmlFor="categoriesId">Category Id</label>
                  </div>
                  {/* <div className="form-floating mb-3 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                    />
                    <label for="email">Email</label>
                  </div> */}

                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityTitle"
                      name="title"
                      type="text"
                      placeholder="Title"
                    />
                    <label htmlFor="activityTitle">Title</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityDescription"
                      name="description"
                      type="text"
                      placeholder="Description"
                    />
                    <label htmlFor="activityDescription">Description</label>
                  </div>
                  <div className="mb-2 mt-2">
                    {/* <label
                      htmlFor="imageUrls"
                      className="col-2 col-form-label ps-0"
                    >
                    </label> */}
                    <input
                      className="form-control"
                      id="idimageUrl"
                      name="imageUrls"
                      type="file"
                      onChange={handleImageUrl}
                      // value={imageUrls}
                    />
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityPrice"
                      name="price"
                      type="number"
                      placeholder="Price"
                    />
                    <label htmlFor="activityPrice">Price</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityPriceDiscount"
                      name="price_discount"
                      type="number"
                      placeholder="PriceVDiscount"
                    />
                    <label htmlFor="activityPriceDiscount">
                      Price Discount
                    </label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityRating"
                      name="rating"
                      placeholder="Rating"
                      type="number"
                    />
                    <label htmlFor="activityRating">Rating</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityTotalReviews"
                      name="total_reviews"
                      placeholder="Total Reviews"
                      type="number"
                    />
                    <label htmlFor="activityTotalReviews">Total Reviews</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    {/* <div className="col-10"> */}
                    <Field
                      className="form-control"
                      id="activityFacilities"
                      name="facilities"
                      type="text"
                      placeholder="Facilities"
                    />
                    <label htmlFor="activityFacilities">Facilities</label>
                    {/* </div> */}
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityAddress"
                      name="address"
                      placeholder="Address"
                      type="text"
                    />
                    <label htmlFor="adactivityAddressdress">Address</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityProvince"
                      name="province"
                      placeholder="Province"
                      type="text"
                    />
                    <label htmlFor="proactivityProvincevince">Province</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityCity"
                      name="city"
                      placeholder="City"
                      type="text"
                    />
                    <label htmlFor="activityCity">City</label>
                  </div>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="activityLocationMaps"
                      name="location_maps"
                      type="text"
                      placeholder="location_maps"
                    />
                    <label htmlFor="activityLocationMaps">Location Maps</label>
                  </div>
                  <button className="btn mt-3" type="submit">
                    Submit
                  </button>
                </Form>
                {/* );
                })} */}
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

export default Activity;
