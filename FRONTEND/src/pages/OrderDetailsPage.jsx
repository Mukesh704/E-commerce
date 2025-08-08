import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        if (res.data.success) {
          setOrder(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading order details...</p>;
  if (!order) return <p className="text-center text-red-500 mt-10">Order not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
        <span className="relative z-10">Order Details</span>
        <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
      </h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Order ID:</span>
          <span>{order._id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <span>{order.orderStatus}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Payment:</span>
          <span>{order.paymentMethod} - <span className={order.isPaid ? "text-green-600" : "text-red-600"}>{order.isPaid ? "Paid" : "Not Paid"}</span></span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Delivery:</span>
          <span className={order.isDelivered ? "text-green-600" : "text-yellow-600"}>{order.isDelivered ? "Delivered" : "Pending"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total Price:</span>
          <span>₹{order.totalPrice}</span>
        </div>
        <div>
          <span className="font-medium block mb-1">Shipping Address:</span>
          <p className="ml-2 text-sm text-gray-600">
            {order.shippingAddress.address},<br />
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-gray-800 relative inline-block pl-2">
          <span className="relative z-10">Items:</span>
          <span className="absolute bottom-0 left-2 w-2/5 h-1 bg-red-600 rounded z-0"></span>
        </h3>
        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <p className="text-lg font-medium text-gray-800">{item.product.name}</p>
              <div className="text-sm text-gray-600 mt-1">
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="font-semibold">Total: ₹{item.product.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;