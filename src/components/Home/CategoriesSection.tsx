import React from 'react'
import IMAGES from '../../constant/image'

const CategoriesSection = () => {
    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-5">SHOP BY CATEGORY</h2>
                <div className="row g-4">
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="category-card position-relative rounded-3 overflow-hidden">
                            <img src={IMAGES.CATEGORIES.RUNNING} alt="Running shoes" className="img-fluid w-100" />
                            <div className="category-overlay d-flex align-items-center justify-content-center">
                                <h3 className="text-white fw-bold">Running</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="category-card position-relative rounded-3 overflow-hidden">
                            <img src={IMAGES.CATEGORIES.BASKETBALL} alt="Basketball on court" className="img-fluid w-100" />
                            <div className="category-overlay d-flex align-items-center justify-content-center">
                                <h3 className="text-white fw-bold">Basketball</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="category-card position-relative rounded-3 overflow-hidden">
                            <img src={IMAGES.CATEGORIES.FOOTBALL} alt="Football kick" className="img-fluid w-100" />
                            <div className="category-overlay d-flex align-items-center justify-content-center">
                                <h3 className="text-white fw-bold">Football</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="category-card position-relative rounded-3 overflow-hidden">
                            <img src={IMAGES.CATEGORIES.TRAINING} alt="yoga" className="img-fluid w-100" />
                            <div className="category-overlay d-flex align-items-center justify-content-center">
                                <h3 className="text-white fw-bold">Training</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="category-card position-relative rounded-3 overflow-hidden">
                            <img src={IMAGES.CATEGORIES.OUTDOOR} alt="Hiking in mountains" className="img-fluid w-100" />
                            <div className="category-overlay d-flex align-items-center justify-content-center">
                                <h3 className="text-white fw-bold">Outdoor</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <div className="category-card position-relative rounded-3 overflow-hidden">
                            <img src={IMAGES.CATEGORIES.ACCESSORIES} alt="Sports watches and bands" className="img-fluid w-100" />
                            <div className="category-overlay d-flex align-items-center justify-content-center">
                                <h3 className="text-white fw-bold">Accessories</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategoriesSection;
