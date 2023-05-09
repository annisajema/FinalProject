import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const url = axios.create({ baseURL: base_url });
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function Promo() {
  const [promos, setPromos] = useState([]);
  const [promosById, setPromosById] = useState([]);
  const [promoId, setPromoId] = useState(JSON.parse(localStorage.getItem("promoId")));
  const [imageUrl, setImageUrl] = useState(JSON.parse(localStorage.getItem("imageUrl")));
  const [title, setTitle] = useState(JSON.parse(localStorage.getItem("title")));
  const [description, setDescription] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [promo_discount_price, setPromoDiscountPrice] = useState(0);
  const [minimum_claim_price, setMinimumClaimPrice] = useState(0);


  const handlePromo = (values) => {
    axios
      .post(
        `${base_url}/api/v1/create-promo`,
        {
          title: values.title,
          description: values.description,
          imageUrl: values.imageUrl,
          terms_condition: values.terms_condition,
          promo_code: values.promo_code,
          promo_discount_price: values.promo_discount_price,
          minimum_claim_price: values.minimum_claim_price,
        },
        
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
        
      )
      .then((response) => {
        alert("Promo Created!");
        window.location.reload();
        console.log(response);
        return response;
      })
      .catch(() => {
        alert("Failed!");
      });
      
  };

  const handleGetPromos = async () => {
    try {
      const getPromo = await axios.get(`${base_url}/api/v1/promos`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      setPromos(getPromo.data.data);
      console.log(getPromo.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handlePromoById = async (id) => {
    try {
      const getPromoById = await axios.get(`${base_url}/api/v1/promo/${id}`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      const promoId = getPromoById.data.data.id;
      const title = getPromoById.data.data.title;
      const description = getPromoById.data.data.description;
      const imageUrl = getPromoById.data.data.imageUrl;
      const terms_condition = getPromoById.data.data.terms_condition;
      const promo_code = getPromoById.data.data.promo_code;
      const promo_discount_price = getPromoById.data.data.promo_discount_price;
      const minimum_claim_price = getPromoById.data.data.minimum_claim_price;
      localStorage.setItem("promoId", JSON.stringify(promoId));
      localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
      localStorage.setItem("title", JSON.stringify(title));
      setTitle(title);
      // console.log(title);
      setImageUrl(imageUrl);
      // console.log(imageUrl);
      setPromoId(promoId);
      // console.log(categoryId);
      setDescription(description);
      setTermsCondition(terms_condition);
      console.log(terms_condition);
      setPromoCode(promo_code);
      setPromoDiscountPrice(promo_discount_price);
      setMinimumClaimPrice(minimum_claim_price);
      setPromosById(getPromoById.data.data);
      console.log(getPromoById.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  const handleEdit = (id) => {
    axios
      .post(
        `${base_url}/api/v1/update-promo/${id}`,
        {
          title,
          description,
          imageUrl,
          terms_condition,
          promo_code,
          promo_discount_price: parseInt(promo_discount_price),
          minimum_claim_price: parseInt(minimum_claim_price),
        },
        {
          headers: {
            apiKey: `${api_key}`,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleGetPromos();
        alert("Promo Updated!");
        window.location.reload();
        // return response;
      })
      .catch(() => {
        alert("Failed!");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/api/v1/delete-promo/${id}`, {
        headers: {
          apiKey: `${api_key}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
         console.log(response.data.data);
        handleGetPromos();
        alert("Promo Deleted!");
        window.location.reload();
      });
  };

  useEffect(() => {
    handleGetPromos();
  }, []);

  return (
    <div className="admin-page">
      <div className="fs-2 text-center m-2">Promo</div>
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
              <th scope="col">Title</th>
              {/* <th scope="col">description</th>
              <th className="text-center" scope="col">
                Image URL
              </th>
              <th scope="col">terms_condition</th>
              <th scope="col">promo_code</th>
              <th scope="col">promo_discount_price</th>
              <th scope="col">minimum_claim_price</th> */}
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {promos.map((promo, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{promo.id}</td>
                  <td>{promo.title}</td>
                  {/* <td>{promo.description}</td>
                  <td className="text-center">
                    <img className="w-50 h-50" src={promo.imageUrl} />
                  </td>
                  <td>{promo.terms_condition}</td>
                  <td>{promo.promo_code}</td>
                  <td>{promo.promo_discount_price}</td>
                  <td>{promo.minimum_claim_price}</td> */}
                  <td className="d-table-cell">{promo.createdAt}</td>
                  <td className="d-table-cell">{promo.updatedAt}</td>
                  <td
                    className="pe-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#detail${promoId}`}
                  >
                    {/* <a href="#" className="me-2 "> */}
                    <button onClick={() => handlePromoById(promo.id)}>
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
                    data-bs-target={`#modal${promoId}`}
                  >
                    {/* <a href="#" className="me-2 "> */}
                    <button onClick={() => handlePromoById(promo.id)}>
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
                    <button onClick={() => handleDelete(promo.id)}>
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
        id={`detail${promoId}`}
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
                src={imageUrl}
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
                <div className="w-100">Terms Condition: {terms_condition}</div>
                <div className="w-100">Promo Code: {promo_code}</div>
                <div className="w-100">Minimum Claim Price: {minimum_claim_price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update*/}
      <div>
        {/* {categoriesById.map((categoryById, i) => {
              return ( */}
        <div>
          <Formik
            initialValues={{
              title: promosById.title,
              imageUrl: promosById.imageUrl,
            }}
            // onSubmit={handleEdit(category.id)}
          >
            <div className="modal fade" tabIndex="-1" id={`modal${promoId}`}>
              <div className="modal-dialog bg-light rounded-3">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Promo</h5>
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
                          htmlFor="title"
                          className="col-sm-2 col-form-label ps-0"
                        >
                          name
                        </label>
                        <div className="col-sm-10">
                          <Field
                            className="form-control"
                            id="title"
                            name="title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="title"
                          className="col-sm-2 col-form-label ps-0"
                        >
                          Description
                        </label>
                        <div className="col-sm-10">
                          <Field
                            className="form-control"
                            id="description"
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
                          <Field
                            className="form-control"
                            id="promoimageUrl"
                            name="imageUrl"
                            type="text"
                            onChange={(e) => setImageUrl(e.target.value)}
                            value={imageUrl || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="terms_condition"
                          className="col-2 col-form-label ps-0"
                        >
                          Terms Condition
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="termsCondition"
                            name="terms_condition"
                            type="text"
                            onChange={(e) => setTermsCondition(e.target.value)}
                            value={terms_condition || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="promo_code"
                          className="col-2 col-form-label ps-0"
                        >
                          promo Code
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="promoCode"
                            name="promo_code"
                            type="text"
                            onChange={(e) => setPromoCode(e.target.value)}
                            value={promo_code || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="promo_discount_price"
                          className="col-2 col-form-label ps-0"
                        >
                          promo Discount Price
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="promoDiscountPrice"
                            name="promo_discount_price"
                            type="number"
                            onChange={(e) =>
                              setPromoDiscountPrice(e.target.value)
                            }
                            value={promo_discount_price || ""}
                          />
                        </div>
                      </div>
                      <div className="row mb-2 ">
                        <label
                          htmlFor="minimum_claim_price"
                          className="col-2 col-form-label ps-0"
                        >
                          minimum ClaimPrice
                        </label>
                        <div className="col-10">
                          <Field
                            className="form-control"
                            id="minimumClaimPrice"
                            name="minimum_claim_price"
                            type="number"
                            onChange={(e) =>
                              setMinimumClaimPrice(e.target.value)
                            }
                            value={minimum_claim_price || ""}
                          />
                        </div>
                      </div>

                      <button
                        className="btn mt-3"
                        type="submit"
                        onClick={() => handleEdit(promosById.id)}
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
                  title: "",
                  description: "",
                  imageUrl: "",
                  terms_condition: "",
                  promo_code: "",
                  promo_discount_price: 0,
                  minimum_claim_price: 0,
                }}
                onSubmit={handlePromo}
              >
                <Form>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="title"
                      className="col-sm-2 col-form-label ps-0"
                    >
                      Title
                    </label>
                    <div className="col-sm-10">
                      <Field
                        className="form-control"
                        id="promoTitle"
                        name="title"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="description"
                      className="col-sm-2 col-form-label ps-0"
                    >
                      Description
                    </label>
                    <div className="col-sm-10">
                      <Field
                        className="form-control"
                        id="promoDescription"
                        name="description"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="imageUrl"
                      className="col-2 col-form-label ps-0"
                    >
                      image Url
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        id="promoImageUrl"
                        name="imageUrl"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="terms_condition"
                      className="col-2 col-form-label ps-0"
                    >
                      termsCondition
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        id="promoTermsCondition"
                        name="terms_condition"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="promo_code"
                      className="col-2 col-form-label ps-0"
                    >
                      promoCode
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        id="promoCodeId"
                        name="promo_code"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="promo_discount_price"
                      className="col-2 col-form-label ps-0"
                    >
                      promoDiscountPrice
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        id="promoDiscountPriceId"
                        name="promo_discount_price"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="minimum_claim_price"
                      className="col-2 col-form-label ps-0"
                    >
                      minimumClaimPrice
                    </label>
                    <div className="col-10">
                      <Field
                        className="form-control"
                        id="promoMinimumClaimPrice"
                        name="minimum_claim_price"
                        type="number"
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

export default Promo;
