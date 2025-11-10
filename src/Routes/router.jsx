import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateProvider from "../AuthProvider/PrivateProvider";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import MyBookings from "../Pages/MyBookings/MyBookings";
import AddSevices from "../Pages/Services/AddSevices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/service-details/:id",
        element: (
          <PrivateProvider>
            <ServiceDetails />
          </PrivateProvider>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateProvider>
            <MyBookings />
          </PrivateProvider>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateProvider>
            <AddSevices />
          </PrivateProvider>
        ),
      },
    ],
  },
]);
