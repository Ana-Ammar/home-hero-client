import { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState(false);
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

  return (
    <div className="bg-image">
      <nav
        className={`navbar md:w-10/12 mx-auto flex justify-between items-center`}
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-30 p-2 shadow z-10 space-y-2 text-black"
             >
                {links}
            </ul>
          </div>

          <Link to="/" className="text-2xl font-bold">
            Home Hero
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="px-1 flex gap-4 text-[16px]">
            {links}
          </ul>
        </div>
        <div className="">
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
                className="dropdown-content menu bg-white rounded-box w-30 p-2 shadow-sm z-10 right-0 text-black"
              >
                <p className="font-bold text-sm m-1">{user?.displayName}</p>
                <li>
                  <Link >My Services</Link>
                  <Link >Add Service</Link>
                  <Link >My Bookings</Link>
                  <Link to="/profile">Profile</Link>
                  <button>Sign Out</button>
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
