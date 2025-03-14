import React from 'react';

const RazorpayModal = ({ userInfo, onClose, onPay }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Payment</h2>
        <p className="mb-4">
          You are about to pay <strong>₹{userInfo.amount}</strong> for <strong>{userInfo.description}</strong>.
        </p>
        <button onClick={onPay} className="bg-[#7b2b41] text-white px-4 py-2 rounded mr-2">
          Pay with Razorpay
        </button>
        <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RazorpayModal;
