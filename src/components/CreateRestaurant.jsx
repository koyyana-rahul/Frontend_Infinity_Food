import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRestaurant } from "../utils/restaurantSlice";
import ViewRestaurant from "./ViewRestaurant";
import { useNavigate } from "react-router-dom";

const CreateRestaurant = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showView, setShowView] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((store) => store.admin);
  const ownerId = admin?.admin?.id;
  const qrcodeId = admin?.admin?.id;

  useEffect(() => {
    const restaurantCreated = localStorage.getItem("restaurantCreated");
    if (restaurantCreated === "true") {
      setShowView(true);
    }
  }, []);

  const handleSave = async () => {
    setError("");
    setMessage("");

    if (!name || !image || !address || !contact) {
      setError("⚠️ Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/create-restaurant`,
        {
          name,
          image,
          address,
          contact,
          ownerId,
          qrcodeId,
        },
        { withCredentials: true }
      );

      dispatch(addRestaurant(res?.data));
      setMessage("✅ Restaurant created successfully!");

      setName("");
      setImage("");
      setAddress("");
      setContact("");

      localStorage.setItem("restaurantCreated", "true");

      setShowView(true);
    } catch (err) {
      const errMsg =
        err.response?.data?.error || "❌ Failed to create restaurant.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("restaurantCreated");
    setShowView(false);
  };

if (showView) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full bg-green-50 dark:bg-green-900 rounded-2xl shadow-lg flex flex-col items-center text-center p-6">
        <svg
          className="h-14 w-14 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-3xl font-extrabold mb-2 text-green-800 dark:text-green-300">
          Restaurant Created Successfully!
        </h3>
        <p className="text-green-700 dark:text-green-400 text-lg max-w-md">
          Your restaurant has been added to the system. You can now proceed to add chefs and waiters.
        </p>
      </div>

      <div className="max-w-4xl w-full mt-6 flex flex-col items-center">
        <ViewRestaurant />
        <div className="mt-6 flex space-x-6">
          {/* <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Create New Restaurant
          </button> */}
          <button
            onClick={() => navigate("/create-chef-waiter")}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


  // Render form if showView is false
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 px-4 text-gray-900 dark:text-white flex justify-center items-start">
      <div className="max-w-xl w-full bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Restaurant
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Restaurant Name</label>
            <input
              type="text"
              placeholder="Enter restaurant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Contact</label>
            <input
              type="text"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 dark:text-red-400 text-center font-medium">
            {error}
          </div>
        )}

        {message && !error && (
          <div className="mt-4 text-sm text-green-600 dark:text-green-400 text-center font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRestaurant;
