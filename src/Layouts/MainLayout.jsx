import Navbar from "../Components/Navbar";
import { Outlet, useLocation, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";

const MainLayout = () => {
  const navigation = useNavigation();
  const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);


  return (
    <section className="flex flex-col h-screen justify-between">
      <Navbar />

      <div className="w-10/12 mx-auto max-w-7xl">
        {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </div>
      <div className="">
        <Footer />
      </div>
    </section>
  );
};

export default MainLayout;
