import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
// import RegisterModal from "./register-modal";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const api_key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
// function SigninModal() {

const RegisterModal = () => {
  // const [profilePicture, setProfilePicture] = useState(null)
  // const [data, setData] = useState([]);
  // const [emailCreate, setEmailCreate] = useState("");
  // const [nameCreate, setNameCreate] = useState("");
  // const [passwordCreate, setPasswordCreate] = useState("");
  // const [passRepeatCreate, setPassRepeatCreate] = useState("");
  // const [roleCreate, setRoleCreate] = useState("");
  // const [profilePictureCreate, setProfilePictureCreate] = useState("");
  // const [phoneNumberCreate, setPhoneNumberCreate] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
      role: "",
      // profilePictureUrl: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Input valid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is required"),
      passwordRepeat: Yup.string().required(
        "Password confirmation is required"
      ),
      role: Yup.string().required("Role is required"),
      profilePictureUrl: Yup.string().required("Profile Image URL is required"),
      phoneNumber: Yup.number().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          `${base_url}/api/v1/register`,

          {
            name: values.name,
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            role: values.role,
            profilePictureUrl: values.profilePictureUrl,
            phoneNumber: values.phoneNumber,
          },
          {
            headers: {
              apiKey: `${api_key}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert("Registration success!");
          window.location.reload();
        });
    },
  });

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0">
          <div className="sign-in">
            <button
              type="button"
              className="btn-close btn-close-signin-modal btn-close-white float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div>Sign in</div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <br />
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <br />
                <label htmlFor="password">password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <br />
                <label htmlFor="passwordRepeat">passwordRepeat</label>
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordRepeat}
                />
                <br />
                <label htmlFor="role">role</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                />
                <br />
                <label htmlFor="profilePictureUrl">Profile Picture</label>
                {/* <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setProfilePicture(event);
                    }}
                    value={formik.values.profilePictureUrl}
                  /> */}
                {/* <label htmlFor="profilePictureUrl">profilePictureUrl</label> */}
                <input
                  id="profilePictureUrl"
                  name="profilePictureUrl"
                  type="file"
                  onChange={formik.handleChange}
                  value={formik.values.profilePictureUrl}
                />
                <br />
                <label htmlFor="phoneNumber">phoneNumber</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
            {/* <div>Don't have an account?</div>
            <div data-bs-toggle="modal" data-bs-target="#registerModal">
              Register
            </div> */}
            {/* <RegisterModal /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
// }

export default RegisterModal;
