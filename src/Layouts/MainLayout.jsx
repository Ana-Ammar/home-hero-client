import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const MainLayout = () => {
  const navigation = useNavigation();

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
