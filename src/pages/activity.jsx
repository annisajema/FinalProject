import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useFormik, Formik, Field, Form } from "formik";
import Footer from "../components/footer";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function Activity() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activitiesById, setActivitiesById] = useState([]);
  const [activityId, setActivityId] = useState(JSON.parse(localStorage.getItem("activityId")));
  const [categoryId, setCategoryId] = useState(JSON.parse(localStorage.getItem("categoryId")));
  const [categoriesId, setCategoriesId] = useState(JSON.parse(localStorage.getItem("categoriesId")));
  const [newCategoriesId, setNewCategoriesId] = useState("");
  const [activitiesId, setActivitiesId] = useState("");
  const [imageUrls, setImageUrls] = useState("");
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


  const onChange = (event) => {
    const value = event.target.value;
    setCategoryId(value);
  };

  const handleImageUrl = async (e) => {
    try {
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
    } catch (error) {
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
      setActivitiesId(activitiesId);
      setNewCategoriesId(newCategoriesId);
      setActivities(getActivity.data.data);
    } catch (error) {
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
      setImageUrls(imageUrls);
      setActivityId(activityId);
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
    } catch (error) {
      alert("Failed!");
    }
  };

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
      .then(() => {
        handleGetActivities();
        alert("Activity Deleted!");
        window.location.reload();
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
      localStorage.setItem("categoriesId", JSON.stringify(categoriesId));
      setCategoriesId(categoriesId);
      setCategories(getCategory.data.data);
    } catch (error) {
      alert("Failed!");
    }
  };

  const handleActivityCategory = () => {
    try {
      handleGetActivities();
      handleGetCategories();
    } catch (error) {
      alert("Failed!");
    }
  };

  const handleFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  useEffect(() => {
    handleActivityCategory();
  }, []);

  return (
    <div className="admin-page">
      <Navbar />
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
                  <td>{handleFormattedDate(activity.createdAt)}</td>
                  <td>{handleFormattedDate(activity.updatedAt)}</td>
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#detail${activityId}`}
                  >
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
                  </td>
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${activityId}`}
                  >
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
                  </td>
                  <td className="">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      <div
        className="modal fade"
        id={`detail${activityId}`}
        tabIndex="-1"
        aria-labelledby="movie1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
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
        <div>
          <Formik
            initialValues={{
              categoryId: categoryId,
              title: "",
              description: "",
              imageUrls: [imageUrls],
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
          >
            <div className="modal fade" tabIndex="-1" id={`modal${activityId}`}>
              <div className="modal-dialog bg-light rounded-3">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Activity</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Form>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          as="select"
                          className="form-select"
                          id="categoryId"
                          name="categoriesId"
                          placeholder="categoriesId"
                          type="text"
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option select="true">Open this select menu</option>
                          {categories.map((categoryId, i) => {
                            return (
                              <option
                                select={categoryId.id}
                                key={categoryId.id}
                                value={categoryId.id}
                              >
                                {categoryId.name} - {categoryId.id}
                              </option>
                            );
                          })}
                        </Field>
                        <label htmlFor="categoryId">Category Id</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityTitleId"
                          name="title"
                          placeholder="title"
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title || ""}
                        />
                        <label htmlFor="activityTitleId">Title</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityDescriptionId"
                          name="description"
                          placeholder="description"
                          type="text"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description || ""}
                        />
                        <label htmlFor="activityDescriptionId">
                          Description
                        </label>
                      </div>
                      <div className="mb-2 mt-2">
                        <input
                          className="form-control"
                          id="activityImageUrl"
                          name="imageUrl"
                          type="file"
                          onChange={handleImageUrl}
                        />
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityPriceId"
                          name="price"
                          placeholder="price"
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          value={price || ""}
                        />
                        <label htmlFor="activityPriceId">Price</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityPriceDiscountId"
                          name="price_discount"
                          placeholder="price_discount"
                          type="number"
                          onChange={(e) => setPriceDiscount(e.target.value)}
                          value={price_discount || ""}
                        />
                        <label htmlFor="activityPriceDiscountId">
                          Price Discount
                        </label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityRatingId"
                          name="rating"
                          placeholder="rating"
                          type="number"
                          onChange={(e) => setRating(e.target.value)}
                          value={rating || ""}
                        />
                        <label htmlFor="activityRatingId">Rating</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityTotalReviewsId"
                          name="total_reviews"
                          placeholder="total_reviews"
                          type="number"
                          onChange={(e) => setTotalReviews(e.target.value)}
                          value={total_reviews || ""}
                        />
                        <label htmlFor="activityTotalReviewsId">
                          Total Reviews
                        </label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityFacilitiesId"
                          name="facilities"
                          placeholder="facilities"
                          type="text"
                          onChange={(e) => setFacilities(e.target.value)}
                          value={facilities || ""}
                        />

                        <label htmlFor="facilactivityFacilitiesIdities">
                          Facilities
                        </label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityAddressId"
                          name="address"
                          placeholder="address"
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address || ""}
                        />
                        <label htmlFor="activityAddressId">Address</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityProvinceId"
                          name="province"
                          placeholder="province"
                          type="text"
                          onChange={(e) => setProvince(e.target.value)}
                          value={province || ""}
                        />
                        <label htmlFor="activityProvinceId">Province</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityCityId"
                          name="city"
                          placeholder="city"
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                          value={city || ""}
                        />
                        <label htmlFor="citactivityCityIdy">City</label>
                      </div>
                      <div className="form-floating mb-2 mt-2">
                        <Field
                          className="form-control"
                          id="activityLocationMapsId"
                          name="location_maps"
                          placeholder="location_maps"
                          type="text"
                          onChange={(e) => setLocationMaps(e.target.value)}
                          value={location_maps || ""}
                        />
                        <label htmlFor="activityLocationMapsId">
                          Location Maps
                        </label>
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
      </div>

      {/* Modal Create */}
      <div className="modal" tabIndex="-1" id="modalCreate">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Activity</h5>
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
                  imageUrls: [imageUrls],
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
                    >
                      <option select="true">Open this select menu</option>
                      {categories.map((categoryId, i) => {
                        return (
                          <option key={categoryId.id} value={categoryId.id}>
                            {categoryId.name} - {categoryId.id}
                          </option>
                        );
                      })}
                    </Field>
                    <label htmlFor="categoriesId">Category Id</label>
                  </div>

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
                    <input
                      className="form-control"
                      id="idimageUrl"
                      name="imageUrls"
                      type="file"
                      onChange={handleImageUrl}
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
                    <Field
                      className="form-control"
                      id="activityFacilities"
                      name="facilities"
                      type="text"
                      placeholder="Facilities"
                    />
                    <label htmlFor="activityFacilities">Facilities</label>
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
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Activity;
