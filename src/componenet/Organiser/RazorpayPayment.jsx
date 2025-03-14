import React from 'react';
import axios from 'axios';

const RazorpayPayment = ({ userInfo }) => {
  const { user_id, name, email, amount, description, eventId } = userInfo;

  const handlePayment = async () => {
    try {
      // Step 1: Create order by sending user info to backend
      const orderResponse = await axios.post("http://localhost:5001/create-order", {
        user_id,
        name,
        email,
        amount,
        description,
        eventId,
      });

      const { order_id, amount: orderAmount, currency } = orderResponse.data;

      // Step 2: Initialize Razorpay with options
      const options = {
        key: "rzp_test_XOWDtFSdmw6x5S", // Replace with your Razorpay Key ID
        amount: orderAmount,
        currency: currency,
        name: name,
        description: description,
        order_id: order_id,
        handler: async (response) => {
          // Step 3: Payment Success
          const paymentData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Step 4: Verify payment on the backend
          try {
            await axios.post("http://localhost:5001/payment-verification", paymentData);
            alert("Payment successful!");
          } catch (error) {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#7b2b41", // Your custom color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed");
    }
  };

  return { handlePayment };
};

export default RazorpayPayment;
