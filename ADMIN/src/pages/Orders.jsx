import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderDeliveryStatus } from '../services/adminApi';
import Loader from '../components/Loader';
import { formatDate } from '../utils/formatDate';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveringId, setDeliveringId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeliver = async (id) => {
    try {
      setDeliveringId(id);
      await updateOrderDeliveryStatus(id);
      fetchOrders();
    } catch (error) {
      console.error('Error marking as delivered:', error);
    } finally {
      setDeliveringId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide text-xs">
            <tr>
              <th className="p-4 text-left whitespace-nowrap">Order ID</th>
              <th className="p-4 text-left whitespace-nowrap">Customer</th>
              <th className="p-4 text-left whitespace-nowrap">Amount</th>
              <th className="p-4 text-left whitespace-nowrap">Status</th>
              <th className="p-4 text-left whitespace-nowrap">Date</th>
              <th className="p-4 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="p-4 font-mono text-xs text-gray-700">
                    {order._id}
                  </td>
                  <td className="p-4 text-gray-800">
                    {order.customerName || order.userEmail || 'N/A'}
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        order.isDelivered
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.isDelivered ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                  </td>
                  <td className="p-4">
                    {!order.isDelivered ? (
                      <button
                        disabled={deliveringId === order._id}
                        onClick={() => handleDeliver(order._id)}
                        className={`px-4 py-2 rounded text-white text-xs font-semibold transition ${
                          deliveringId === order._id
                            ? 'bg-green-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {deliveringId === order._id
                          ? 'Processing...'
                          : 'Mark Delivered'}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}