import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const links = (
    <>
      <li className="font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-medium">
        <NavLink to="services">Services</NavLink>
      </li>
    </>
  );

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  const handleSignOutBtn = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        Swal.fire({
          title: "Thank You!",
          text: "Sign out successfull",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${err.message}`,
        });
      });
  };

  return (
    <div className={`bg-image navbar`}>
      <nav
        className={`md:w-10/12 mx-auto flex justify-between items-center`}
      >
        <div className="flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 text-gray-500 rounded-box mt-3 w-30 p-2 shadow z-10 space-y-2"
            >
              {links}
            </ul>
          </div>

          <Link to="/" className="text-2xl font-bold">
            Home Hero
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="px-1 flex gap-4 text-[16px]">{links}</ul>
        </div>



        <div className="flex items-center justify-center">
          <div className="navbar flex-1">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            // defaultChecked={localStorage.getItem("theme") === "dark"}
            checked={theme === "night"}
            className={`toggle ${theme === "night" ? 'text-base-600' : "text-base-100"}`}
          />
        </div>

          {user ? (
            <div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="text-[16px] font-bold m-1 flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={user.photoURL}
                  className="rounded-full w-10 h-10 object-cover border p-1 border-primary"
                ></img>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 text-gray-500 rounded-box w-30 p-2 shadow-sm z-10 right-0"
              >
                <p className="font-bold text-sm m-1">{user?.displayName}</p>
                <li>
                  <Link to="/my-services">My Services</Link>
                  <Link to="/add-service">Add Service</Link>
                  <Link to="/my-bookings">My Bookings</Link>
                  <Link to="/profile">Profile</Link>
                  <button className="btns w-full!" onClick={handleSignOutBtn}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btns px-6">
              {" "}
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
