// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const BillingInfo = ({ user }) => {
//   const navigate = useNavigate();
//   const location = useLocation();  
//   const { eventId, totalAmount, ticketQuantity } = location.state || {};

//   const [billingData, setBillingData] = useState({
//     name: user?.name || "",
//     phone_number: "",
//     email_address: user?.email || "",
//     street_address: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBillingData({ ...billingData, [name]: value });
//   };

//   const handlePayment = async () => {
//     try {
//       const orderResponse = await axios.post("http://localhost:5001/create-order", {
//         ...billingData,
//         user_id: user.sub,
//         event_id: eventId,
//         total_amount: totalAmount,
//         ticket_quantity: ticketQuantity,
//         payment_status: "pending",
//       });

//       const { order_id, amount, currency } = orderResponse.data;

//       const options = {
//         key: "rzp_test_XOWDtFSdmw6x5S", // Razorpay key
//         amount,
//         currency,
//         name: billingData.name,
//         description: `Payment for Event ${eventId}`,
//         order_id,
//         handler: async (response) => {
//           const paymentData = {
//             payment_id: response.razorpay_payment_id,
//             order_id,
//             signature: response.razorpay_signature,
//             user_id: user.sub,
//             total_amount: totalAmount,
//             payment_method: "Razorpay",
//           };

//           try {
//             await axios.post("http://localhost:5001/verify-payment", paymentData);
//             alert("Payment successful!");
//             navigate("/confirmation");
//           } catch (err) {
//             console.error("Payment verification failed:", err);
//             alert("Payment verification failed. Please try again.");
//           }
//         },
//         prefill: {
//           name: billingData.name,
//           email: billingData.email_address,
//         },
//         theme: { color: "#7b2b41" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (err) {
//       console.error("Error during payment:", err);
//       setError("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-2xl font-bold mb-4">Billing Information</h1>

//       <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {Object.keys(billingData).map((field) => (
//           <div key={field} className="flex flex-col">
//             <label htmlFor={field} className="mb-1 capitalize">
//               {field.replace("_", " ")}
//             </label>
//             <input
//               type="text"
//               id={field}
//               name={field}
//               value={billingData[field]}
//               onChange={handleChange}
//               className="p-2 border rounded"
//               required
//             />
//           </div>
//         ))}
//       </form>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-300 px-4 py-2 rounded"
//         >
//           Back
//         </button>
//         <button
//           onClick={handlePayment}
//           className="bg-[#7b2b41] text-white px-4 py-2 rounded"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BillingInfo;
