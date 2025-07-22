import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const WelcomeScreen: React.FC = () => {
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

      {/* Custom Minimal CSS */}
      <style>{`
        .welcome-screen {
          background: linear-gradient(135deg, #0d0d0d, #1a1a1a, #0d0d0d);
        }
        .text-neon {
          color: #ff0033;
        }
        .bg-neon {
          background-color: #ff0033 !important;
        }
        .glow {
          text-shadow: 0 0 10px #ff0033, 0 0 20px #ff0033;
        }
        @keyframes fillBar {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
