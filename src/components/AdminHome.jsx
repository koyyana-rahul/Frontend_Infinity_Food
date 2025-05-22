import { Link} from "react-router-dom";
import { UtensilsCrossed, Users2, ClipboardList } from "lucide-react"; // Lucide icons
import { useSelector } from "react-redux";

const AdminHome = () => {
  const admin = useSelector((store) => store.admin);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 t  ext-gray-900 dark:text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Restaurant Admin Panel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Setup your restaurant in 3 easy steps — manage restaurants, staff &
            menus efficiently.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 - Restaurant */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <UtensilsCrossed className="w-10 h-10 mb-4 text-green-600" />
            <h2 className="text-xl font-semibold mb-2">Create Restaurant</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Add restaurant details like name, location, and opening hours.
            </p>
            <Link to="/create-restaurant">
              <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
                Get Started
              </button>
            </Link>
          </div>

          {/* Step 2 - Staff */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <Users2 className="w-10 h-10 mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">Create Staff</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Add chefs, waiters, and management staff for your restaurant.
            </p>
            <Link to="/create-chef-waiter">
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
                Add Staff
              </button>
            </Link>
          </div>

          {/* Step 3 - Menu */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <ClipboardList className="w-10 h-10 mb-4 text-purple-600" />
            <h2 className="text-xl font-semibold mb-2">Create Menu</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Build your digital menu with categories, prices, and dish details.
            </p>
            <Link to="/create-menu">
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium">
                Create Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
