import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRestaurant } from "../utils/restaurantSlice";

const ViewRestaurant = () => {
  const restaurant = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();

  const fetchRestaurant = async () => {
    if (restaurant) return;

    try {
      const res = await axios.get(BASE_URL + "/admin/create-restaurant/view", {
        withCredentials: true,
      });
      dispatch(addRestaurant(res?.data));
    } catch (err) {
      console.error("Error fetching restaurant:", err);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div
      className="flex justify-center items-center 
                 bg-gradient-to-br from-gray-100 to-gray-200
                 dark:from-gray-900 dark:to-gray-800
                 transition-colors duration-500"
    >
      {restaurant ? (
        <div
          className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 max-w-xl w-full
                     text-center
                     text-gray-800 dark:text-gray-200
                     transition-colors duration-500"
        >
          <img
            src={restaurant.restaurant.image}
            alt={restaurant.restaurant.name}
            className="w-full h-64 object-cover rounded-xl shadow-md mb-4"
          />
          <h1 className="text-3xl font-extrabold mb-2">
            {restaurant.restaurant.name}
          </h1>
          <p className="mb-2">
            📍{" "}
            <span className="font-medium">{restaurant.restaurant.address}</span>
          </p>
          <p>
            📞{" "}
            <span className="font-medium">{restaurant.restaurant.contact}</span>
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      )}
    </div>
  );
};

export default ViewRestaurant;
