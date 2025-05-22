import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import AdminLogin from "./components/AdminLogin";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import AdminHome from "./components/AdminHome";
import CreateChefWaiter from "./components/CreateChefWaiter";
import CreateMenu from "./components/CreateMenu";
import CreateRestaurant from "./components/CreateRestaurant";
import ViewRestaurant from "./components/ViewRestaurant";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/admin_login" element={<AdminLogin />} />
              <Route path="/" element={<AdminHome />} />
              <Route
                path="/create-chef-waiter"
                element={<CreateChefWaiter />}
              />
              <Route path="/create-restaurant" element={<CreateRestaurant />} />
              {/* <Route
                path="/create-restaurant/view"
                element={<ViewRestaurant />}
              /> */}
              <Route path="/create-menu" element={<CreateMenu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
