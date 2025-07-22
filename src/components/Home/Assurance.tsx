import React from 'react'

const Assurance = () => {
    return (
        <section className="py-5 bg-primary text-white">
            <div className="container">
                <div className="row g-4 text-center">
                    <div className="col-md-3">
                        <div className="p-3">
                            <i className="fas fa-truck fa-3x mb-3"></i>
                            <h5>Free Shipping</h5>
                            <p className="mb-0">On orders over ₹500</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3">
                            <i className="fas fa-undo fa-3x mb-3"></i>
                            <h5>Easy Returns</h5>
                            <p className="mb-0">30-day return policy</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3">
                            <i className="fas fa-lock fa-3x mb-3"></i>
                            <h5>Secure Payment</h5>
                            <p className="mb-0">100% secure checkout</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3">
                            <i className="fas fa-headset fa-3x mb-3"></i>
                            <h5>24/7 Support</h5>
                            <p className="mb-0">Dedicated support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Assurance
