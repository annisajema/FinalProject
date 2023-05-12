import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const url = axios.create({ baseURL: base_url });
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");

function PromoPage() {
  const [promos, setPromos] = useState([]);
  const [promosById, setPromosById] = useState([]);
  const [promoId, setPromoId] = useState(
    JSON.parse(localStorage.getItem("promoId"))
  );
  const [imageUrl, setImageUrl] = useState(
    JSON.parse(localStorage.getItem("imageUrl"))
  );
  const [title, setTitle] = useState(JSON.parse(localStorage.getItem("title")));
  const [description, setDescription] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [promo_discount_price, setPromoDiscountPrice] = useState(0);
  const [minimum_claim_price, setMinimumClaimPrice] = useState(0);


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


  useEffect(() => {
    handleGetPromos();
  }, []);

  return (
    <div className="promo-page">
        <Navbar/>
      <div className="container-fluid p-0">
        <div>
          {/* Card Promo */}
          <div className="row g-3 d-inline-flex">
            <div className="d-flex justify-content-between">
              <h4 id="dark-switch" className="pt-2 pb-3 mb-0">
                Available Promo
              </h4>
              {/* <h6 id="dark-switch" className="pt-4 mb-0 float-end">
                More&gt;
              </h6> */}
            </div>

            {promos.map((promo, i) => {
              return (
                <div
                  key={i}
                  className="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-1"
                >
                  {/* <div className="card" style={{width: "18rem"}} data-bs-toggle="modal"
                      data-bs-target={`#modal${promo.id}`}>
                        <img className="card-img" src={promo.imageUrl} alt="..."/>
                        <div className="card-body">
                          <h5 className="card-title">{promo.code}</h5>
                          <p className="card-text">{promo.title}</p>
                          <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                      </div> */}
                  <div className="card">
                    <div
                      className="card-body p-0"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal${promo.id}`}
                    >
                      <img className="card-img" src={promo.imageUrl} />
                      <div className="overlay">
                        <div className="promo-text">{promo.promo_code}</div>
                        {/* <div className="promo-title">{promo.title}</div> */}
                      </div>
                      <div className="m-2 d-flex">
                        <div className="promo-title">{promo.title}</div>
                      </div>
                    </div>
                  </div>

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
                  <div
                    className="modal fade "
                    id={`modal${promo.id}`}
                    tabIndex="-1"
                    aria-labelledby="movie1Label"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                      <div
                        className="modal-content"
                        // style={{ backgroundColor: "rgba(13, 13, 13, 0.9)" }}
                      >
                        {/* <img
                          src={promo.imageUrl}
                          alt={promo.title}
                          style={{ filter: "brightness(25%)" }}
                        /> */}
                        <div className="overview">{promo.description}</div>
                        <div className="modal-header border-0 pt-4 pb-0">
                          <div
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            <div className="modal-movie-title">
                              {promo.title}
                            </div>
                            <ul>
                              <li>
                                <div className="modal-movie-id">
                                  ID: {promo.id}
                                </div>
                              </li>
                              <li>
                                <div className="modal-movie-score">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    fill="currentColor"
                                    className="bi bi-star-fill me-2 mb-1"
                                    viewBox="0 0 16 16"
                                    style={{ color: "yellow" }}
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                  {/* Score: {Math.floor(movie.popularity)} */}
                                </div>
                              </li>
                              {/* <li>
                                <div className="modal-movie-id">
                                  ID: {movie.genre}
                                </div>
                              </li> */}
                            </ul>
                          </div>
                          <button
                            type="button"
                            className="btn-close btn-close-signin-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>

                        <div className="modal-body">
                          {/* <img
                            src={getImage(movie.poster_path)}
                            className="modal-img float-start me-3 rounded-3"
                            alt={movie.original_title}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Card */}
          
        </div>
      </div>
    </div>
  );
}

export default PromoPage;
