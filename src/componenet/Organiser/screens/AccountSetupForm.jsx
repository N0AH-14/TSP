import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

const AccountSetupForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
const { name, email, phone } = location.state || {}; 
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organization_name: "",
    pan_card_number: "",
    organization_address: "",
    gstin_number: "",
    itr_filed: false,
    contact_person_name: "",
    contact_person_number: "",
    beneficiary_name: "",
    account_type: "",
    bank_name: "",
    account_number: "",
    bank_ifsc: "",
    email: email || "", // Assuming `email` is passed via location.state
    panFront: null,
    panBack: null,
    signedAgreement: null,
  });

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handlePrevious = () => setCurrentStep(currentStep - 1);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const uploadData = new FormData();

    // Append fields to FormData, including files
    Object.keys(formData).forEach((field) => {
      if (formData[field] !== null) {
        uploadData.append(field, formData[field]);
      }
    });
  

    try {
      const response = await axios.post(
        "http://localhost:5001/upload-documents-info",
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Documents uploaded successfully");
      window.history.back();
    } catch (error) {
      console.error("Error uploading documents:", error.response?.data || error);
    }
  };

  const handleDownloadAgreement = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/download-agreement?name=${formData.contact_person_name}&email=${formData.email}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `agreement-${formData.contact_person_name}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error downloading agreement:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-800">
      <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-[#7b2b41]">Event Setup</h1>
       
{/* Go Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 py-2 px-6 bg-[#7b2b41] text-white rounded-full hover:bg-[#5e1f30] focus:outline-none focus:ring-4 focus:ring-[#7b2b41] focus:ring-opacity-50 transition-transform transform hover:scale-105"
        >
          Go Back
        </button>


        <div className="flex justify-between items-center mb-10">
          {["General Info", "Upload Documents", "Sign Agreement"].map(
            (step, index) => (
              <div
                key={index}
                className={`text-lg font-semibold px-4 py-2 rounded-full transition-all ${
                  currentStep === index + 1
                    ? "bg-[#7b2b41] text-white shadow-lg"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}. {step}
              </div>
            )
          )}
        </div>

        <div className="transition-opacity duration-500">
          {currentStep === 1 && (
            <div>
              <div className="p-6 mb-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Organization Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="organization_name"
                    value={formData.organization_name}
                    placeholder="Organization Name"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="text"
                    name="pan_card_number"
                    value={formData.pan_card_number}
                    placeholder="PAN Card Number"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="text"
                    name="organization_address"
                    value={formData.organization_address}
                    placeholder="Organization Address"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="text"
                    name="gstin_number"
                    value={formData.gstin_number}
                    placeholder="GSTIN Number"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="checkbox"
                    name="itr_filed"
                    checked={formData.itr_filed}
                    onChange={(e) =>
                      setFormData({ ...formData, itr_filed: e.target.checked })
                    }
                  />{" "}
                  ITR Filed
                </div>
              </div>

              <div className="p-6 mb-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Contact Person</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="contact_person_name"
                    value={formData.contact_person_name}
                    placeholder="Contact Person Name"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="text"
                    name="contact_person_number"
                    value={formData.contact_person_number}
                    placeholder="Contact Person Number"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                </div>
              </div>

              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="beneficiary_name"
                    value={formData.beneficiary_name}
                    placeholder="Beneficiary Name"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <select
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  >
                    <option value="">Select account type</option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                  </select>
                  <input
                    type="text"
                    name="bank_name"
                    value={formData.bank_name}
                    placeholder="Bank Name"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="text"
                    name="bank_ifsc"
                    value={formData.bank_ifsc}
                    placeholder="Bank IFSC"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                  <input
                    type="text"
                    name="account_number"
                    value={formData.account_number}
                    placeholder="Account Number"
                    onChange={handleInputChange}
                    className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
              <input
                type="file"
                name="panFront"
                onChange={handleFileChange}
                className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
              />
              <input
                type="file"
                name="panBack"
                onChange={handleFileChange}
                className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">

                <div className="mb-6">
                  <button
                    onClick={handleDownloadAgreement}
                    className="py-2 px-4 bg-[#7b2b41] text-white rounded-lg hover:bg-[#5e1f30] focus:outline-none focus:ring-4 focus:ring-[#7b2b41] focus:ring-opacity-50 transition-transform transform hover:scale-105"
                  >
                    Download Agreement
                  </button>
                </div>
              <h2 className="text-xl font-semibold mb-4">Sign Agreement</h2>
              <input
                type="file"
                name="signedAgreement"
                onChange={handleFileChange}
                className="p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7b2b41]"
              />
          
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="py-2 px-4 bg-gray-300 text-black rounded-lg"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="py-2 px-4 bg-[#7b2b41] text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="py-2 px-4 bg-[#7b2b41] text-white rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupForm;
