import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";
import { useParams } from "react-router-dom";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

function ActivityPage() {
  const { id } = useParams();
  const [activitiesByCategory, setActivitiesByCategory] = useState([]);

  useEffect(() => {
    const ActivitiesByCategoryId = async () => {
        const getActivitiesByCategoryId = await axios.get(
          `${base_url}/api/v1/activities-by-category/${id}`,
          {
            headers: {
              apiKey: `${api_key}`,
            },
          }
        );
        setActivitiesByCategory(getActivitiesByCategoryId.data.data);
    };
    ActivitiesByCategoryId();
  }, [id]);

  return (
    <div className="category-page">
      <Navbar />
      <h4 id="dark-switch" className="pt-0 mt-0 pb-0 mb-0 text-center">
        Activities to Do at{" "}
        {activitiesByCategory.splice(0, 1).map(({ category }) => category.name)}
      </h4>
      {activitiesByCategory.map((activity, i) => {
        return (
          <div key={i} className="container-fluid p-0">
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <h5 className="mt-4">{i+1}. {activity.title}</h5>
                  <img
                    className="d-flex float-start ms-0 m-3 w-50 h-75 rounded-1"
                    src={activity.imageUrls}
                  />
                  <div className="m-3">{activity.description}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityPage;
