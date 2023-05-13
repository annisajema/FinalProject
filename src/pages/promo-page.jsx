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
                    className="modal fade"
                    id={`modal${promo.id}`}
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
                          <h1
                            className="modal-title fs-5 "
                            id="exampleModalLabel"
                          >
                            <strong className="ps-3">{promo.title}</strong>
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
                            src={promo.imageUrl}
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
                            {promo.description}
                          </p>
                          <div className="w-100 float-start mt-3">
                            <b>Detail</b>
                            <div className="w-100">
                              Terms Condition: {promo.terms_condition}
                            </div>
                            <div className="w-100">
                              Promo Code: {promo.promo_code}
                            </div>
                            <div className="w-100">
                              Minimum Claim Price: {promo.minimum_claim_price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          
          
        </div>
      </div>
    </div>
  );
}

export default PromoPage;
