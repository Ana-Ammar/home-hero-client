import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        Swal.fire({
          title: `Welcome Back ${res.user.displayName}!`,
          text: "Account Logged In Successfully!",
          icon: "success",
        });
        navigate(`${location.state ? location.state : "/"}`);
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


   const handleGoogleLogin = () => {
      loginWithGoogle()
        .then((res) => {
          Swal.fire({
            title: `Welcome Back ${res.user.displayName}!`,
            text: "Login account with google!",
            icon: "success",
          });
          navigate(`${location.state ? location.state : "/"}`);
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-primary/5 shadow-lg rounded-xl p-8">
        <h2 className="section-title">User Login</h2>

        {/* 🔸 Login Form */}
        <form 
        onSubmit={handleLogin}
        className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-secondary hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="btns w-full!">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        {/* 🔹 Google Login */}
        <button 
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center gap-2">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        {/* 🔸 Register Link */}
        <p className="text-center text-sm mt-6">
          New here?{" "}
          <Link
            to="/register"
            className="text-secondary font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
