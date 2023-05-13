import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function Banner() {
  const [banners, setBanners] = useState([]);
  const [bannersById, setBannersById] = useState([]);
  const [bannerId, setBannerId] = useState(
    JSON.parse(localStorage.getItem("bannerId"))
  );
  const [bannersId, setBannersId] = useState(
    JSON.parse(localStorage.getItem("bannersId"))
  );
  const [imageUrl, setImageUrl] = useState(
    JSON.parse(localStorage.getItem("Banner Image Url"))
  );
  const [name, setName] = useState(JSON.parse(localStorage.getItem("Banner Name")));

  const handleImageUrl = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const getImageUrl = await axios.post(
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
      const imageUrl = getImageUrl.data.url;
      setImageUrl(imageUrl);
      console.log(imageUrl);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handleBanner = (values) => {
    axios
      .post(
        `${base_url}/api/v1/create-banner`,
        {
          name: values.name,
          imageUrl: imageUrl,
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Banner Created!");
        window.location.reload();
        return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleGetBanners = async () => {
    try {
      const getBanner = await axios.get(`${base_url}/api/v1/banners`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      const bannersId = getBanner.data.data.map(({ id }) => id);
      localStorage.setItem("bannersId", JSON.stringify(bannersId));
      setBannersId(bannersId);
      console.log(bannersId);
      setBanners(getBanner.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handleBannerById = async (id) => {
    try {
      const getBannerById = await axios.get(`${base_url}/api/v1/banner/${id}`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      const bannerId = getBannerById.data.data.id;
      const imageUrl = getBannerById.data.data.imageUrl;
      const name = getBannerById.data.data.name;
      localStorage.setItem("bannerId", JSON.stringify(bannerId));
      setName(name);
      setImageUrl(imageUrl);
      setBannerId(bannerId);
      setBannersById(getBannerById.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handleEdit = (id) => {
    axios
      .post(
        `${base_url}/api/v1/update-banner/${id}`,
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
        handleGetBanners();
        alert("Banner Updated!");
        window.location.reload();
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/api/v1/delete-banner/${id}`, {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        handleGetBanners();
        alert("Banner Deleted!");
        window.location.reload();
      });
  };

  useEffect(() => {
    handleGetBanners();
  }, []);

  return (
    <div className="admin-page">
      <Navbar />
      <div className="fs-2 text-center m-2">Banners</div>
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
              <th className="text-center" scope="col">
                Image URL
              </th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {banners.map((banner, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{banner.id}</td>
                  <td>{banner.name}</td>
                  <td className="text-center">
                    <img
                      className="w-50 h-50 rounded-3"
                      src={banner.imageUrl}
                    />
                  </td>
                  <td className="d-table-cell">{banner.createdAt}</td>
                  <td className="d-table-cell">{banner.updatedAt}</td>
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${bannerId}`}
                  >
                    <button onClick={() => handleBannerById(banner.id)}>
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
                    <button onClick={() => handleDelete(banner.id)}>
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

      {/* Modal Update */}
      <div>
        <div>
          <Formik
            initialValues={{
              name: bannersById.name,
              imageUrl: imageUrl,
            }}
            // onSubmit={handleEdit(category.id)}
          >
            <div className="modal fade" tabIndex="-1" id={`modal${bannerId}`}>
              <div className="modal-dialog bg-light rounded-3">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Banner</h5>
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
                          className="form-control"
                          id="idname"
                          name="name"
                          placeholder="name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name || ""}
                        />
                        <label htmlFor="idname">Name</label>
                      </div>
                      <div className="mb-2 ">
                        <input
                          className="form-control"
                          id="idimageUrl"
                          name="imageUrl"
                          type="file"
                          onChange={handleImageUrl}
                          // value={imageUrl || ""}
                        />
                        <div className="text-muted">
                          <small>
                            <em>*Uploaded Image</em>
                          </small>
                        </div>
                        <img className="w-25 h-50 mt-1" src={imageUrl} />
                      </div>
                      <button
                        className="btn mt-3"
                        type="submit"
                        onClick={() => handleEdit(bannersById.id)}
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

      {/* Modal Create */}
      <div className="modal" tabIndex="-1" id="modalCreate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Banner</h5>
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
                  imageUrl: imageUrl,
                }}
                onSubmit={handleBanner}
              >
                <Form>
                  <div className="form-floating mb-2 mt-2">
                    <Field
                      className="form-control"
                      id="name-id"
                      name="name"
                      placeholder="Name"
                      type="text"
                    />
                    <label htmlFor="name-id">Name</label>
                  </div>
                  <div className="mb-2 ">
                    <input
                      className="form-control"
                      id="imageUrlid"
                      name="imageUrl"
                      type="file"
                      onChange={handleImageUrl}
                      alt={imageUrl}
                      // value={activity.values.title}
                    />
                    <div className="text-muted">
                      <small>
                        <em>*Uploaded Image</em>
                      </small>
                    </div>
                    <img className="w-25 h-50 mt-1" src={imageUrl} />
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
    </div>
  );
}

export default Banner;
