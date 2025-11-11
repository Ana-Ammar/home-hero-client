import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <section className="flex flex-col justify-between h-screen">
     
       <Navbar />

      <div className="w-10/12 mx-auto max-w-7xl">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default MainLayout;
