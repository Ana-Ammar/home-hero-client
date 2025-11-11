import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <section className="flex flex-col justify-between h-screen">
      <Navbar />

      <div className="w-10/12 mx-auto max-w-7xl">
        {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </div>
      <Footer />
    </section>
  );
};

export default MainLayout;
