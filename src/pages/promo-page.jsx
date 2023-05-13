import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

function PromoPage() {
  const [promos, setPromos] = useState([]);

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
            </div>

            {promos.map((promo, i) => {
              return (
                <div
                  key={i}
                  className="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-1"
                >
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
