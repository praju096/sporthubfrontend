import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import IMAGES from '../../constant/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBestsellers } from '../../redux/features/products/productSlice';


interface BestsellersProps {
  onAddToCart: (productId: number) => void;
};


const Bestsellers: React.FC<BestsellersProps> = ({onAddToCart}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bestsellers, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchBestsellers());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center py-5 text-primary fw-bold">
        Loading bestsellers...
      </p>
    );

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="mb-0">BESTSELLERS</h2>
          <Link to="/shop?filter=bestseller" className="btn btn-outline-dark">VIEW ALL</Link>
        </div>

        {error ? (
          <div className="text-center py-5">
            <p className="text-danger fw-bold">{error}</p>
          </div>
        ) : bestsellers.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fw-bold">No bestseller products available right now.</p>
          </div>
        ) : (
          <div className="row g-4">
            {bestsellers.map((product) => (
              <div className="col-6 col-lg-3" key={product.id}>
                <div className="product-card card h-100 border-0 shadow-sm">
                  <div className="position-relative product-hover-container">
                    <div className="badge bg-success position-absolute mt-2 me-2 end-0">BESTSELLER</div>
                    <img src={`${process.env.REACT_APP_API_URL}${product.image_url}`} className="card-img-top" alt={product.name} style={{ width: '100%', height: '250px' }} />

                    <div className="hover-buttons d-flex flex-column gap-2">
                      <Link to={`/product/${product.id}`} className="text-decoration-none btn btn-danger btn-sm">
                        Quick View
                      </Link>
                      <button className="btn btn-sm btn-outline-light">Add to Wishlist</button>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <span className="text-danger fw-bold">₹{product.price}</span>
                        {Number(product.original_price) > 0 && (
                          <span className="text-muted text-decoration-line-through ms-2">
                            ₹{product.original_price}
                          </span>
                        )}
                      </div>
                      <div className="text-warning">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span className="text-muted ms-2">
                          ({product.rating})
                        </span>
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-danger" onClick={() => onAddToCart(product.id)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .product-hover-container {
          position: relative;
          overflow: hidden;
        }

        .hover-buttons {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          width: 80%;
          z-index: 10;
        }

        .product-hover-container:hover .hover-buttons {
          opacity: 1;
        }

        .product-hover-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-hover-container:hover::before {
          opacity: 1;
        }

        .fancy-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }

        .fancy-modal {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          max-width: 900px;
          width: 90%;
          position: relative;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default Bestsellers;

