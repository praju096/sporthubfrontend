import React from 'react'
import IMAGES from '../../constant/image'

const BrandsSection = () => {
  return (
    <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">FEATURED BRANDS</h2>
          <div className="row g-4">
            <div className="col-6 col-md-4 col-lg-2">
              <div className="brand-card p-3 text-center bg-white rounded-3 shadow-sm">
                <img src={IMAGES.BRANDS.NIKE} alt="Nike logo" className="img-fluid" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="brand-card p-3 text-center bg-white rounded-3 shadow-sm">
                <img src={IMAGES.BRANDS.ADIDAS} alt="Adidas logo" className="img-fluid" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="brand-card p-3 text-center bg-white rounded-3 shadow-sm">
                <img src={IMAGES.BRANDS.PUMA} alt="Puma logo" className="img-fluid" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="brand-card p-3 text-center bg-white rounded-3 shadow-sm">
                <img src={IMAGES.BRANDS.UNDER_ARMOUR} alt="Under Armour logo" className="img-fluid" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="brand-card p-3 text-center bg-white rounded-3 shadow-sm">
                <img src={IMAGES.BRANDS.REEBOK} alt="Reebok logo" className="img-fluid" />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="brand-card p-3 text-center bg-white rounded-3 shadow-sm">
                <img src={IMAGES.BRANDS.NEW_BALANCE} alt="New Balance logo" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default BrandsSection;
