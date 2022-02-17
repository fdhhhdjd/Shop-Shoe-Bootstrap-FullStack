import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loadings } from "../../imports/index";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 &&
      navigate("/loginAdmin", { replace: true, state: { from: location } });
    count === 0 &&
      toast.warning("Please Login Admin when you to the Manger Admin 😵");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return <Loadings />;
};

export default LoadingToRedirect;
