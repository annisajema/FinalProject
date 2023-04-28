import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Activity from './pages/activity';
import Category from './pages/category';

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
    path: "/category",
    element: <Category />,
    errorElement: <p>Page Not Found</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);