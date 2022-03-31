import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loadings } from "../../imports/index";
const LoadingToRedirects = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useSelector((state) => ({ ...state.data }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/", { replace: true, state: { from: location } });
    count === 0 &&
      toast.info(
        `Please Logout Account ${profile.user && profile.user.name} 🤔`
      );
    return () => clearInterval(interval);
  }, [count, navigate, profile?.user]);

  return <Loadings />;
};

export default LoadingToRedirects;
