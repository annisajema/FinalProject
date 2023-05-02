import Navbar from "../components/navbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik, Formik, Field, Form } from "formik";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const token = localStorage.getItem("token");
const categoryId = localStorage.getItem("categoryId");
const imageUrl = localStorage.getItem("imageUrl");

const Activity = () => {
    const handleActivity = (values) => {
       axios
         .post(
           `${base_url}/api/v1/create-activity`,
           {
             categoryId: categoryId,
             title: values.title,
             description: values.description,
             imageUrls: [imageUrl],
             price: values.price,
             price_discount: values.price_discount,
             rating: values.rating,
             total_reviews: values.total_reviews,
             facilities: values.facilities,
             address: values.address,
             province: values.province,
             city: values.city,
             location_maps: values.location_maps,
           },
           {
             headers: {
               apiKey: `${api_key}`,
               Authorization: `Bearer ${token}`,
             },
           }
         )
         .then((response) => {
           console.log(response);
           alert("Activity Created!");
           window.location.reload();
         })
         .catch((error) => {
           alert("Failed!");
         });
    };

    console.log(categoryId);
// const activity = useFormik({
//   initialValues: {
//     categoryId: "",
//     title: "",
//     description: "",
//     imageUrls: "",
//     price: "",
//     price_discount: "",
//     rating: "",
//     total_reviews: "",
//     facilities: "",
//     address: "",
//     province: "",
//     city: "",
//     location_maps: "",
//   },
  // validationSchema: Yup.object({
  //   name: Yup.string().required("Username is required"),
  //   email: Yup.string()
  //     .email("Field valid email address")
  //     .required("Email is Required"),
  //   password: Yup.string().required("Password is required"),
  //   passwordRepeat: Yup.string().required(
  //     "Password confirmation is required"
  //   ),
  //   role: Yup.string().required("Role is required"),
  //   profilePictureUrl: Yup.string().required(
  //     "Profile Image URL is required"
  //   ),
  //   phoneNumber: Yup.number().required("Phone number is required"),
  // }),
//   onSubmit: (values) => {
//     axios
//       .post(
//         `${base_url}/api/v1/create-activity`,

//         {
//           categoryId: values.categoryId,
//           title: values.title,
//           description: values.description,
//           imageUrls: values.imageUrls,
//           price: values.price,
//           price_discount: values.price_discount,
//           rating: values.rating,
//           total_reviews: values.total_reviews,
//           facilities: values.facilities,
//           address: values.address,
//           province: values.province,
//           city: values.city,
//           location_maps: values.location_maps,
//         },
//         {
//           headers: {
//             apiKey: `${api_key}`,
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         alert("Activity Created!");
//         window.location.reload();
//       });
//   },
// });

  return (
    <>
      <Navbar />
      <Formik
        initialValues={{
          categoryId: "",
          title: "",
          description: "",
          imageUrls: [],
          price: "",
          price_discount: "",
          rating: "",
          total_reviews: "",
          facilities: "",
          address: "",
          province: "",
          city: "",
          location_maps: "",
        }}
        onSubmit={handleActivity}
      >
        <Form>
          <div className="row mb-2 ">
            <label
              htmlFor="categoryId"
              className="col-sm-2 col-form-label ps-0"
            >
              Category ID
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="categoryId"
                name="categoryId"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.categoryId}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="title" className="col-2 col-form-label ps-0">
              title
            </label>
            <div className="col-10">
              <Field
                className="form-control"
                id="title"
                name="title"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.title}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label
              htmlFor="description"
              className="col-sm-2 col-form-label ps-0"
            >
              description
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="description"
                name="description"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.description}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="imageUrls" className="col-sm-2 col-form-label ps-0">
              Image
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="imageUrls"
                name="imageUrls"
                type="file"
                // onChange={activity.handleChange}
                // value={activity.values.imageUrls}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="price" className="col-sm-2 col-form-label ps-0">
              Price
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="price"
                name="price"
                type="number"
                // onChange={activity.handleChange}
                // value={activity.values.price}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label
              htmlFor="price_discount"
              className="col-sm-2 col-form-label ps-0"
            >
              Price Discount
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="price_discount"
                name="price_discount"
                type="number"
                // onChange={activity.handleChange}
                // value={activity.values.price_discount}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="rating" className="col-sm-2 col-form-label ps-0">
              rating
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="rating"
                name="rating"
                type="number"
                // onChange={activity.handleChange}
                // value={activity.values.rating}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label
              htmlFor="total_reviews"
              className="col-sm-2 col-form-label ps-0"
            >
              total_reviews
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="total_reviews"
                name="total_reviews"
                type="number"
                // onChange={activity.handleChange}
                // value={activity.values.total_reviews}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label
              htmlFor="facilities"
              className="col-sm-2 col-form-label ps-0"
            >
              facilities
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="facilities"
                name="facilities"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.facilities}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="address" className="col-sm-2 col-form-label ps-0">
              address
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="address"
                name="address"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.address}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="province" className="col-sm-2 col-form-label ps-0">
              province
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="province"
                name="province"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.province}
              />
            </div>
          </div>
          <div className="row mb-2 ">
            <label htmlFor="city" className="col-sm-2 col-form-label ps-0">
              city
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="city"
                name="city"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.city}
              />
            </div>
          </div>

          <div className="row mb-2 ">
            <label
              htmlFor="location_maps"
              className="col-sm-2 col-form-label ps-0"
            >
              location_maps
            </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                id="location_maps"
                name="location_maps"
                type="text"
                // onChange={activity.handleChange}
                // value={activity.values.location_maps}
              />
            </div>
          </div>
          <button className="btn mt-3" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Activity;
