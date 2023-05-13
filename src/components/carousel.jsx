import { useEffect, useState } from "react";
import axios from "axios";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

function Carousel() {
  const [banners, setBanners] = useState([]);
  const url = axios.create({ baseURL: base_url });
  const getBanners = url.get("api/v1/banners", {
    headers: {
      apiKey: `${api_key}`,
    },
  });

  useEffect(() => {
    getBanners.then((response) => {
      setBanners(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  return (
    <div className="App">
      {/* Carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="indicator-round active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            className="indicator-round"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            className="indicator-round"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          {banners.slice(0,3).map((banner, id) => (
            <div key={banner.id}>
              <div className="carousel-item active" data-bs-interval="3000">
                <img
                  src={banner.imageUrl}
                  className="carousel-img d-block w-100"
                  alt="..."
                />
                <div className="carousel-overlay">
                  <div className="carousel-caption">
                    <div className="carousel-detail mb-0">{banner.name}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;