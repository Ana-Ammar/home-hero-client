import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { createUserWithEmail, updateUserProfile, loginWithGoogle } =
    useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    // Password validation

    if (password.length < 6) {
      return Swal.fire({
          title: "Enter Your password again",
          text: "Password must be at least 6 characters",
          icon: "error",
        });
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return Swal.fire({
          title: "Enter Your password again",
          text: "Must have an Uppercase and lowercase in your password",
          icon: "error",
        });
    }

    createUserWithEmail(email, password)
      .then((res) => {
        // console.log(res.user);
        updateUserProfile({ displayName, photoURL })
          .then(() => {})
          .catch(() => {});
        Swal.fire({
          title: `Welcome to Home Hero!`,
          text: "Account Created Successfully!",
          icon: "success",
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        // console.log(err)
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
          title: `Welcome ${res.user.displayName}!`,
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
    <title>Register</title>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="card w-full max-w-md shadow-xl bg-linear-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl"
      >
        <h2 className="section-title">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-20 right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btns w-full!">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-2"
        >
          <FcGoogle />
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-secondary font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
