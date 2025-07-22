import React from 'react'
import { Link } from 'react-router-dom'
import IMAGES from '../../constant/image'

const StoreLocations = () => {
  return (
    <section className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center mb-5">OUR STORES</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="store-card p-4 bg-secondary rounded-3 h-100">
                <img src={IMAGES.STORES.GJ} className="img-fluid mb-3 rounded-2" alt="Gujrat storefront" />
                <h4>Gujrat</h4>
                <p className="mb-1">123 Sports Ave, GJ 10001</p>
                <p className="mb-3">Mon-Sat: 9AM-9PM</p>
                <Link to="#" className="btn btn-outline-light">DIRECTIONS</Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="store-card p-4 bg-secondary rounded-3 h-100">
                <img src={IMAGES.STORES.MH} className="img-fluid mb-3 rounded-2" alt="Mumbai storefront" />
                <h4>Mumbai</h4>
                <p className="mb-1">456 Athletic Blvd, MH 90001</p>
                <p className="mb-3">Mon-Sat: 10AM-8PM</p>
                <Link to="#" className="btn btn-outline-light">DIRECTIONS</Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="store-card p-4 bg-secondary rounded-3 h-100">
                <img src={IMAGES.STORES.BG} className="img-fluid mb-3 rounded-2" alt="Banglore storefront" />
                <h4>Banglore</h4>
                <p className="mb-1">789 Fitness St, BG 60601</p>
                <p className="mb-3">Mon-Sat: 9AM-8PM</p>
                <Link to="#" className="btn btn-outline-light">DIRECTIONS</Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="store-card p-4 bg-secondary rounded-3 h-100">
                <img src={IMAGES.STORES.DH} className="img-fluid mb-3 rounded-2" alt="Delhi storefront" />
                <h4>Delhi</h4>
                <p className="mb-1">321 Performance Rd, DH 33101</p>
                <p className="mb-3">Mon-Sat: 10AM-9PM</p>
                <Link to="#" className="btn btn-outline-light">DIRECTIONS</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default StoreLocations
