import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../constant/image";

const HeroCarousel = () => {
    return (
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide-to="0"
                    className="active"
                ></button>
                <button
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide-to="1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#heroCarousel"
                    data-bs-slide-to="2"
                ></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src={IMAGES.HERO.SLIDE1}
                        className="d-block w-100"
                        alt="Athlete running on track with sunset background"
                        style={{
                            height: "auto",
                            maxHeight: "600px",
                            objectFit: "cover",
                        }}
                    />
                    <div className="carousel-caption">
                        <h1 className="display-4 fw-bold mb-3 mb-md-2">LIMITLESS PERFORMANCE</h1>
                        <p className="lead d-none d-sm-block mb-4 mb-md-3">Elevate your game with our latest collection</p>
                        <Link to="#" className="btn btn-danger btn-lg">
                            SHOP NOW
                        </Link>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src={IMAGES.HERO.SLIDE2}
                        className="d-block w-100"
                        alt="Basketball player dunking in an arena"
                        style={{
                            height: "auto",
                            maxHeight: "600px",
                            objectFit: "cover",
                        }}
                    />
                    <div className="carousel-caption">
                        <h1 className="display-4 fw-bold mb-3 mb-md-2">TEAM SPIRIT</h1>
                        <p className="lead d-none d-sm-block mb-4 mb-md-3">Custom kits for your entire squad</p>
                        <Link to="#" className="btn btn-primary btn-lg">
                            EXPLORE
                        </Link>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src={IMAGES.HERO.SLIDE3}
                        className="d-block w-100"
                        alt="Group of athletes training together"
                        style={{
                            height: "auto",
                            maxHeight: "600px",
                            objectFit: "cover",
                        }}
                    />
                    <div className="carousel-caption">
                        <h1 className="display-4 fw-bold mb-3 mb-md-2">GEAR UP FOR GREATNESS</h1>
                        <p className="lead d-none d-sm-block mb-4 mb-md-3">Premium sports equipment for champions</p>
                        <Link to="#" className="btn btn-success btn-lg">
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default HeroCarousel;
