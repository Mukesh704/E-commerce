import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import OrderSummary from "../components/cart/OrderSummary";
import CartItem from "../components/cart/CartItem";
import { getPrimaryAddress, getAddresses, createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { user } = useAuth();
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [extraPaymentInfo, setExtraPaymentInfo] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const primaryRes = await getPrimaryAddress();
        const listRes = await getAddresses();

        if (primaryRes.data.success && primaryRes.data.response) {
          setPrimaryAddress(primaryRes.data.response);
          setSelectedAddress(primaryRes.data.response);
        }
        if (listRes.data.success) {
          setAllAddresses(listRes.data.response);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    fetchAddresses();
  }, []);

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl">
          Your cart is empty. Cannot proceed to checkout.
        </h1>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!selectedAddress?._id) {
      alert("Please select a valid address.");
      return;
    }

    if (!cartItems.length) {
      alert("No items in cart.");
      return;
    }

    const products = cartItems
      .filter(item => item._id || item.id)
      .map(item => ({
        product: item._id || item.id,
        quantity: item.qty ?? item.quantity ?? 1
      }));

    if (products.length === 0) {
      alert("No valid products found to order.");
      return;
    }

    const orderData = {
      orderItems: products,
      shippingAddress: selectedAddress._id,
      paymentMethod
    };

    try {
      const res = await createOrder(orderData);
      console.log("Order created:", res.data);

      clearCart();
      setOrderPlaced(true);

      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Order placement failed:", err.response?.data || err.message);
    }
  };

  const paymentMethodFields = () => {
    switch (paymentMethod) {
      case "UPI":
        return (
          <Input
            placeholder="UPI ID"
            onChange={(e) =>
              setExtraPaymentInfo({ upiId: e.target.value })
            }
          />
        );
      case "net-banking":
        return (
          <Input
            placeholder="Bank Name"
            onChange={(e) =>
              setExtraPaymentInfo({ bank: e.target.value })
            }
          />
        );
      case "credit-card":
      case "debit-card":
        return (
          <>
            <Input
              placeholder="Card Holder Name"
              onChange={(e) =>
                setExtraPaymentInfo({
                  ...extraPaymentInfo,
                  holder: e.target.value,
                })
              }
            />
            <Input
              placeholder="Card Number"
              onChange={(e) =>
                setExtraPaymentInfo({
                  ...extraPaymentInfo,
                  number: e.target.value,
                })
              }
            />
            <div className="flex space-x-4">
              <Input
                placeholder="MM/YY"
                onChange={(e) =>
                  setExtraPaymentInfo({
                    ...extraPaymentInfo,
                    expiry: e.target.value,
                  })
                }
              />
              <Input
                placeholder="CVC"
                onChange={(e) =>
                  setExtraPaymentInfo({
                    ...extraPaymentInfo,
                    cvc: e.target.value,
                  })
                }
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center animate-fadeIn">
        {/* Success Check Icon */}
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Thank You!
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>

        {/* Small Note */}
        <p className="text-sm text-gray-500">
          You will be redirected to the homepage shortly...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Side */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">
              Review Items And Shipping
            </h1>

            <div className="bg-white p-4 rounded-lg shadow-md mb-8 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id || item.id}
                  item={item}
                  isReview={true}
                />
              ))}
            </div>

            {/* Delivery Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Delivery Information</h2>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddressList(!showAddressList)}
                  >
                    {showAddressList ? "Hide Addresses" : "Select Address"}
                  </Button>
                  <Button
                    className="hover:bg-gray-300 hover:text-black"
                    variant="primary"
                    onClick={() =>
                      navigate("/add-address", {
                        state: { returnTo: "/checkout" },
                      })
                    }
                  >
                    Add Address
                  </Button>
                </div>
              </div>

              {user && selectedAddress ? (
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">
                    {selectedAddress.address}
                    {selectedAddress.landmark
                      ? `, ${selectedAddress.landmark}`
                      : ""}
                  </p>
                  <p className="text-gray-600">
                    {selectedAddress.city}, {selectedAddress.state} -{" "}
                    {selectedAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{selectedAddress.country}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ) : (
                <p>No address selected. Please add one.</p>
              )}

              {showAddressList && allAddresses.length > 0 && (
                <div className="mt-6 space-y-4">
                  {allAddresses.map((addr) => (
                    <label
                      key={addr._id}
                      className={`block p-4 border rounded cursor-pointer ${selectedAddress?._id === addr._id
                        ? "border-black bg-gray-100"
                        : "border-gray-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={addr._id}
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => setSelectedAddress(addr)}
                        className="mr-2"
                      />
                      {addr.address}, {addr.landmark && `${addr.landmark}, `}
                      {addr.city}, {addr.state} - {addr.postalCode},{" "}
                      {addr.country}
                      {addr.isDefault && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-black text-white rounded">
                          Default
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-2">
            <OrderSummary>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                <form onSubmit={handlePlaceOrder}>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="net-banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                  </select>

                  <div className="space-y-4">{paymentMethodFields()}</div>

                  <Button
                    className="w-full mt-6 hover:bg-gray-300 hover:text-black"
                    type="submit"
                  >
                    Pay Now
                  </Button>
                </form>
              </div>
            </OrderSummary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;