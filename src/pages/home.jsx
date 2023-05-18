import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

function Home() {
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const handleGetPromos = async () => {
    try {
      const getPromo = await axios.get(`${base_url}/api/v1/promos`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      setPromos(getPromo.data.data);
    } catch (error) {
      alert("Failed!");
    }
  };

  const handleGetCategories = async () => {
    try {
      const getCategory = await axios.get(`${base_url}/api/v1/categories`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      setCategories(getCategory.data.data);
    } catch (error) {
      alert("Failed!");
    }
  };

   const handleGetAllData = () => {
     try {
       handleGetPromos();
       handleGetCategories();
     } catch (error) {
       alert("Failed!");
     }
   };
  

  useEffect(() => {
    handleGetAllData();
  }, []);


  return (
    <div className="App">
      <div className="container-fluid p-0">
        <div>
          {/* Card Promo */}
          <div className="row g-3 d-inline-flex">
            <div className="d-flex justify-content-between">
              <h4 id="dark-switch" className="pt-3 mb-0">
                Promo
              </h4>
              <h6 id="dark-switch" className="pt-4 mb-0 float-end">
                <a
                  className="text-decoration-none text-dark"
                  href="/promo-page"
                >
                  More&gt;
                </a>
              </h6>
            </div>

            {promos.slice(0, 6).map((promo, i) => {
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
                      </div>
                      <div className="m-2 d-flex">
                        <div className="promo-title">{promo.title}</div>
                      </div>
                    </div>
                  </div>

                  
                  <div
                    className="modal fade "
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

          {/* Category Card */}
          <div className="row g-3 d-inline-flex">
            <div className="d-flex justify-content-between">
              <h4 id="dark-switch" className="pt-3 mb-0">
                Category
              </h4>
              <h6 id="dark-switch" className="pt-4 mb-0 float-end">
                <a
                  className="text-decoration-none text-dark"
                  href="/category-page"
                >
                  More&gt;
                </a>
              </h6>
            </div>

            {categories.slice(0, 6).map((category, i) => {
              return (
                <div
                  key={i}
                  className="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-1"
                >
                  <Link to={`/activities/${category.id}`}>
                    <div className="card">
                      <div
                        className="card-body p-0"
                      >
                        <img
                          className="card-img category-img h-100 rounded-1"
                          src={category.imageUrl}
                        />
                        <div className="category-overlay">
                          <div className="category-text">{category.name}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
