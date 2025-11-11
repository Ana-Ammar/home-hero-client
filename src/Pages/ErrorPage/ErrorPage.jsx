import { Link } from "react-router";
import errorImg from "../../assets/errorPage.svg"
import { MdOutlineArrowBack } from "react-icons/md";



const ErrorPage = () => {

  return (
    <div className="flex flex-col space-y-8 h-screen">

      <div className="mx-auto mt-16">
        <img src={errorImg} 
        className="w-80"></img>
      </div>
      <h1 className="text-[#001931] font-semibold text-5xl text-center">
        Oops, Page Not Found
      </h1>
      <h2 className="text-center text-[#627382]">
        The page you are looking for is not available.
      </h2>
      <Link
      to="/"
        className="btns w-fit! mx-auto"
      >
       <MdOutlineArrowBack /> Back to Home
      </Link>
     
    </div>
  );
};

export default ErrorPage;