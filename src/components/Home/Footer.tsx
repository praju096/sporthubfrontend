import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <h4 className="mb-4">SPORTHUB</h4>
                        <p>Your premier destination for all things sports. We provide high-quality equipment and apparel for athletes of all levels.</p>
                        <div className="social-icons mt-4">
                            <Link to="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="#" className="text-white me-3"><i className="fab fa-twitter"></i></Link>
                            <Link to="#" className="text-white me-3"><i className="fab fa-instagram"></i></Link>
                            <Link to="#" className="text-white"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <h5 className="mb-4">SHOP</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/categories/men" className="text-white-50">Men</Link></li>
                            <li className="mb-2"><Link to="/categories/women" className="text-white-50">Women</Link></li>
                            <li className="mb-2"><Link to="/categories/kids" className="text-white-50">Kids</Link></li>
                            <li className="mb-2"><Link to="/categories/new-arrivals" className="text-white-50">New Arrivals</Link></li>
                            <li><Link to="/categories/sale" className="text-white-50">Sale</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <h5 className="mb-4">HELP</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/contact" className="text-white-50">Customer Service</Link></li>
                            <li className="mb-2"><Link to="/track-order" className="text-white-50">Track Order</Link></li>
                            <li className="mb-2"><Link to="/returns-exchanges" className="text-white-50">Returns & Exchanges</Link></li>
                            <li className="mb-2"><Link to="/shipping-info" className="text-white-50">Shipping Info</Link></li>
                            <li><Link to="/faq" className="text-white-50">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <h5 className="mb-4">CONTACT</h5>
                        <address>
                            <p className="mb-2"><i className="fas fa-map-marker-alt me-2"></i> 123 Sports Avenue, Gujrat, GJ 10001</p>
                            <p className="mb-2"><i className="fas fa-phone me-2"></i> (123) 456-7890</p>
                            <p className="mb-0"><i className="fas fa-envelope me-2"></i> info@sporthub.com</p>
                        </address>
                        <div className="mt-3">
                            <h6>NEWSLETTER</h6>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Your email" />
                                <button className="btn btn-danger" type="button">SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                    <div className="col-md-6">
                        <p className="mb-0">&copy; 2025 SPORTHUB. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <Link to="#" className="text-white-50 me-3">Privacy Policy</Link>
                        <Link to="#" className="text-white-50 me-3">Terms of Service</Link>
                        <Link to="#" className="text-white-50">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
