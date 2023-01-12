import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userInfo";

export default function ProtectedRoutes(props) {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      
      if (response.data.success) {
        dispatch(setUser(response.data.user));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      localStorage.clear();
      dispatch(hideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userDetails=="null") {
      getUserInfo();
    }
    
  }, [userDetails]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
