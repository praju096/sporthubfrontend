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
                            height: "600px",
                            objectFit: "cover",
                        }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="display-3 fw-bold">LIMITLESS PERFORMANCE</h1>
                        <p className="lead">Elevate your game with our latest collection</p>
                        <Link to="#" className="btn btn-danger btn-lg mt-3">
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
                            height: "600px",
                            objectFit: "cover",
                        }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="display-3 fw-bold">TEAM SPIRIT</h1>
                        <p className="lead">Custom kits for your entire squad</p>
                        <Link to="#" className="btn btn-primary btn-lg mt-3">
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
                            height: "600px",
                            objectFit: "cover",
                        }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="display-3 fw-bold">GEAR UP FOR GREATNESS</h1>
                        <p className="lead">Premium sports equipment for champions</p>
                        <Link to="#" className="btn btn-success btn-lg mt-3">
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
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    );
};

export default HeroCarousel;
