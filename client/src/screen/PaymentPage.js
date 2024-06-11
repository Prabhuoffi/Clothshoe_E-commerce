import React, { useState } from 'react';
import Modal from 'react-modal';
import { paymentDetails } from '../api/api';

const PaymentMethodPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate card details
  const validateCardDetails = () => {
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardNumberRegex.test(cardNumber)) {
      setErrorMessage('Invalid card number.');
      return false;
    }
    if (!expiryRegex.test(expiry)) {
      setErrorMessage('Invalid expiry date.');
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      setErrorMessage('Invalid CVV.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handlePayment = async () => {
    if (!validateCardDetails()) return;

    setIsLoading(true);
    try {
      const response = await paymentDetails (
        {customerId: 'customer-id',  // replace with actual customer id
        cardNumber,
        expiry,
        cvv,}
      );

      if (response.status === 200) {
        // Handle successful payment (e.g., save data)
        setModalIsOpen(true);
      } else {
        setErrorMessage('Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setErrorMessage('Payment failed. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModalAndRefresh = () => {
    setModalIsOpen(false);
    window.location.reload(); // This will refresh the page and reset the form
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Payment Method</h1>
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        {errorMessage && (
          <div className="mb-4 text-red-500">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiry</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="MM/YY"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="123"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-purple-600 transition duration-300 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModalAndRefresh} className="modal">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Payment Successful!</h2>
          <p>Your payment has been successfully processed.</p>
          <button
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-purple-600 transition duration-300 ease-in-out"
            onClick={closeModalAndRefresh}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentMethodPage;