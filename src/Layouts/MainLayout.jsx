import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <section className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default MainLayout;
