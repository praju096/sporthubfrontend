// src/pages/Cart.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Home/Footer';

type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const initialCart: CartProduct[] = [
  { id: 1, name: 'Pro Running Shoes', price: 1290.99, image: 'https://placehold.co/300x300?text=Running+Shoes', quantity: 1 },
  { id: 2, name: 'Yoga Pants', price: 590.99, image: 'https://placehold.co/300x300?text=Yoga+Pants', quantity: 2 },
];

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartProduct[]>(initialCart);

  const updateQuantity = (id: number, change: number) => {
    setCart(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + change) } : p)
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
    <div className="container py-5 cart-page">
      <h2 className="mt-4 mb-4 fw-bold ">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty. <Link to="/shop">Shop Now</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map(product => (
              <div key={product.id} className="card mb-3 shadow-sm cart-card">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 text-center">
                    <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{product.name}</h5>
                      <p className="card-text mb-2 text-danger fs-5">${product.price.toFixed(2)}</p>
                      <div className="d-flex align-items-center gap-3">
                        <div className="input-group quantity-control" style={{ width: '120px' }}>
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(product.id, -1)}>-</button>
                          <input type="text" className="form-control text-center" value={product.quantity} readOnly />
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(product.id, 1)}>+</button>
                        </div>
                        <button className="btn btn-outline-danger" onClick={() => removeItem(product.id)}>
                          <i className="fas fa-trash-alt me-1"></i>Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4 mb-3">
            <div className="card shadow-sm p-4 sticky-top">
              <h4 className="fw-bold mb-3">Summary</h4>
              <p><strong>Items:</strong> {cart.length}</p>
              <p><strong>Total:</strong> <span className="text-danger fs-5">${totalPrice.toFixed(2)}</span></p>
              <button className="btn btn-danger w-100 mt-3">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cart-page h2 {
          font-size: 2rem;
        }
        .cart-card:hover {
          background-color: #f8f9fa;
        }
        .quantity-control input {
          max-width: 50px;
        }
      `}</style>

      
    </div>
    <Footer />
    </>
  );
};

export default Cart;
