import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState(JSON.parse(localStorage.getItem("categoriesId")));

  const handleGetCategories = async () => {
    try {
      const getCategory = await axios.get(`${base_url}/api/v1/categories`, {
        headers: {
          apiKey: `${api_key}`,
        },
      });
      const categoriesId = getCategory.data.data.map(({ id }) => id);
      const imageUrl = getCategory.data.data.map(({ imageUrl }) => imageUrl);
      const name = getCategory.data.data.map(({ name }) => name);
      localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
      localStorage.setItem("name", JSON.stringify(name));
      localStorage.setItem("categoriesId", JSON.stringify(categoriesId));
      setCategoriesId(categoriesId);
      console.log(categoriesId);
      setCategories(getCategory.data.data);
    } catch (error) {
      console.log(error.message);
      alert("Failed!");
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);


  return (
    <div className="category-page">
      <Navbar />
      <div className="container-fluid p-0">
        <div>
          <div className="row g-3 d-inline-flex">
            <div className="d-flex justify-content-between">
              <h4 id="dark-switch" className="pt-2 pb-3 mb-0">
                Category
              </h4>
            </div>

            {categories.map((category, i) => {
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
    </div>
  ); 
}

export default CategoryPage;
