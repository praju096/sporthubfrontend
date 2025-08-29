import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../css/WelcomeScreen.css'

const WelcomeScreen = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const name = useSelector((state: RootState) => state.auth.user?.fullname);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, role]);

  return (
    <div className="welcome-screen d-flex flex-column justify-content-center align-items-center vh-100 text-white">
      <h1 className="fw-bold display-4 text-uppercase mb-4 glow">
        <span className="text-white">SPORT</span>
        <span className="text-neon">HUB</span>
      </h1>

      <div className="bg-dark bg-opacity-75 rounded shadow-lg p-4 text-center">
        <i className="bi bi-check-circle-fill text-success fs-1"></i>
        <h4 className="fw-semibold mt-3">
          Welcome, <span className="text-neon">{name}</span>
        </h4>
        <p className="text-secondary mb-2">Redirecting to your {role === "admin" ? "dashboard" : "home"}...</p>

        <div className="progress" style={{ height: "6px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-neon"
            role="progressbar"
            style={{ width: "100%", animation: "fillBar 3s linear forwards" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
