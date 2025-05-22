import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../utils/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((store) => store.admin);

  // useEffect(() => {
  //   if (admin?.admin?.id) {
  //     navigate("/");
  //   }
  // }, [admin]);

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
      setErrorMessage("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post(
        BASE_URL + "/admin/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addAdmin(res?.data));
      setPassword("");
      navigate("/");
    } catch (err) {
      console.error("ERROR: ", err);
      if (err.response) {
        setErrorMessage(
          err.response.data.message ||
            err.response.data.error ||
            "Invalid credentials. Please try again."
        );
      } else if (err.request) {
        setErrorMessage(
          "No response from the server. Please check your internet connection."
        );
      } else {
        setErrorMessage("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post(
        BASE_URL + "/admin/signup",
        { name, email, password },
        { withCredentials: true }
      );
      dispatch(addAdmin(res?.data));
      setPassword("");
      navigate("/");
    } catch (err) {
      console.error("ERROR: ", err);
      if (err.response) {
        setErrorMessage(
          err.response.data.message ||
            err.response.data.error ||
            "Signup failed. Please try again."
        );
      } else if (err.request) {
        setErrorMessage(
          "No response from the server. Please check your internet connection."
        );
      } else {
        setErrorMessage("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-[#12181b]">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-[#EFE5D2]">
          {isLoginForm ? "Admin Login" : "Admin Signup"}
        </h2>

        <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
          {!isLoginForm && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-2 text-gray-800 dark:text-[#EFE5D2]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                placeholder="Enter your name"
                autoFocus
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium mb-2 text-gray-800 dark:text-[#EFE5D2]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-2 text-gray-800 dark:text-[#EFE5D2]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 bg-green-600 dark:bg-green-900 hover:bg-green-700 dark:hover:bg-green-800"
            disabled={loading}
          >
            {loading ? "Processing..." : isLoginForm ? "Login" : "Signup"}
          </button>

          <label
            className="cursor-pointer block text-center mt-4 text-gray-800 dark:text-[#EFE5D2]"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {!isLoginForm
              ? "Existing User? Login Here"
              : "New User? Signup Here"}
          </label>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
