import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import ThemeProvider from "./ThemeProvider";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addAdmin } from "../utils/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin);
  const fetchUser = async () => {
    if (admin) return;
    try {
      const res = await axios.get(BASE_URL + "/admin/profile-view", {
        withCredentials: true,
      });
      console.log(res?.data);
      dispatch(addAdmin(res?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/admin_login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <ThemeProvider>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default Body;
