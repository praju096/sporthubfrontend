import React, { useEffect, useState } from "react";
import axios from "axios";

interface Address {
  id: number;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface CartItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}

const CheckoutPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const [addrRes, cartRes] = await Promise.all([
          axios.get("/api/address", { withCredentials: true }),
          axios.get("/api/cart", { withCredentials: true }),
        ]);
        setAddresses(addrRes.data.data);
        setCartItems(cartRes.data.data);
        if (addrRes.data.data.length > 0) {
          setSelectedAddressId(addrRes.data.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching checkout data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Please select an address.");
      return;
    }
    try {
      const res = await axios.post(
        "/api/orders",
        {
          address_id: selectedAddressId,
          payment_method: paymentMethod,
          shipping_method: shippingMethod,
        },
        { withCredentials: true }
      );
      alert("Order placed successfully!");
      window.location.href = `/order-success/${res.data.data.orderId}`;
    } catch (err) {
      console.error("Error placing order", err);
      alert("Failed to place order.");
    }
  };

  if (loading) return <p>Loading checkout...</p>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Address Selection */}
      <section>
        <h3>Select Address</h3>
        {addresses.map(addr => (
          <div key={addr.id}>
            <label>
              <input
                type="radio"
                value={addr.id}
                checked={selectedAddressId === addr.id}
                onChange={() => setSelectedAddressId(addr.id)}
              />
              {addr.full_name}, {addr.address_line}, {addr.city}
            </label>
          </div>
        ))}
      </section>

      {/* Cart Summary */}
      <section>
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <p key={item.product_id}>
            {item.name} x {item.quantity} = ₹{item.quantity * item.price}
          </p>
        ))}
      </section>

      {/* Payment Method */}
      <section>
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
        </select>
      </section>

      {/* Shipping Method */}
      <section>
        <h3>Shipping Method</h3>
        <select value={shippingMethod} onChange={e => setShippingMethod(e.target.value)}>
          <option value="Standard">Standard</option>
          <option value="Express">Express</option>
        </select>
      </section>

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
