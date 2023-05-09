import { useEffect, useState } from "react";
import axios from "axios";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const jwt_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlczEyM0BnbWFpbC5jb20iLCJ1c2VySWQiOiJmNDk4M2E4OS0yZmZmLTQwZWMtODI3MS1hM2Y5MzU4OGQyYzUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjQzMDIyNX0.hMVTLt7aJfmXDtA0DWBu3lqYM15tkMmfnTFE6q8Z9dc";

function Home() {
  const [promos, setPromos] = useState([]);
  const [user, setUsers] = useState([]);
  const url = axios.create({ baseURL: base_url });
  
  // const getPopular = url.get("movie/popular", { params: { api_key } });
  // const search = url.get("search/movie", { params: { api_key, query } });

  const getPromo = url.get("api/v1/promos", {
    headers: {
      apiKey: `${api_key}`,
    },
  });

  // const getUser = url.get("api/v1/user", {
  //   headers: {
  //     apiKey: `${api_key}`,
  //     Authorization: `Bearer ${jwt_token}`,
  //   },
  // });
  

  useEffect(() => {
    getPromo.then((response) => {
      setPromos(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  // useEffect(() => {
  //   getUser.then((response) => {
  //     setUsers(response.data.data);
  //     console.log(response.data.data);
  //   });
  // }, []);


  return (
    <div className="App">
      <div className="container-fluid p-0">
        <div>
          {/* Card Promo */}
          <div className="row g-3 d-inline-flex">
            <h4 id="dark-switch" className="pt-3 mb-0">
              Promo
            </h4>

            {promos.slice(0, 6).map((promo, i) => {
              return (
                <div
                  key={i}
                  className="col-4 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-1"
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
                      <div className="card-body">
                        <div className="card-title">{promo.title}</div>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
