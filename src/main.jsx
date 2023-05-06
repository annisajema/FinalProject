import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Activity from './pages/activity';
import Banner from './pages/banner';
import Category from './pages/category';
// import TesCategory from './pages/tes-category';
import Promo from './pages/promo';
import User from './pages/user';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/activity",
    element: <Activity />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/banner",
    element: <Banner />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/category",
    element: <Category />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/promo",
    element: <Promo />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/user",
    element: <User />,
    errorElement: <p>Page Not Found</p>,
  },
  // {
  //   path: "/tes-category",
  //   element: <TesCategory />,
  //   errorElement: <p>Page Not Found</p>,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);