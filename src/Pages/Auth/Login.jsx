import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


//   // 🔹 Handle Email/Password Login
//   const handleLogin = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           text: "Welcome back!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: error.message,
//         });
//       });
//   };

//   // 🔹 Handle Google Login
//   const handleGoogleLogin = () => {
//     signInWithPopup(auth, provider)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Google Login Successful",
//           text: "Welcome back!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Google Login Failed",
//           text: error.message,
//         });
//       });
//   };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-primary/5 shadow-lg rounded-xl p-8">
        <h2 className="section-title">User Login</h2>

        {/* 🔸 Login Form */}
        <form className="space-y-4">
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
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
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
