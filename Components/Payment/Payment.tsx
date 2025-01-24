import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import "./Payment.css"; // Your custom styles

const Payment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [cardType, setCardType] = useState<string>("");

  // Detect card type based on the card number
  const detectCardType = (number: string) => {
    const visaPattern = /^4/;
    const masterPattern = /^(5[1-5]|2[2-7])/;
    const amexPattern = /^3[47]/;

    if (visaPattern.test(number)) {
      setCardType("Visa");
    } else if (masterPattern.test(number)) {
      setCardType("Mastercard");
    } else if (amexPattern.test(number)) {
      setCardType("American Express");
    } else {
      setCardType("");
    }
  };

  // Handle card number input with formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\s+/g, "").replace(/\D/g, ""); // Remove spaces and non-numeric characters
    if (inputValue.length <= 16) {
      inputValue = inputValue.replace(/(\d{4})(?=\d)/g, "$1 "); // Format in 4-digit groups
    }
    setCardNumber(inputValue);
    detectCardType(inputValue);
  };

  // Handle expiry date input
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (inputValue.length > 2) {
      inputValue = inputValue.substring(0, 2) + "/" + inputValue.substring(2, 4); // Add '/' after MM
    }
    setExpiryDate(inputValue);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (cardType === "American Express" && cvv.length !== 4) {
      toast.error("CVV must be 4 digits for American Express.");
      return;
    }

    if (["Visa", "Mastercard"].includes(cardType) && cvv.length !== 3) {
      toast.error("CVV must be 3 digits for Visa or Mastercard.");
      return;
    }

    toast.success("Payment successfully submitted!");
    console.log("Payment Details:", { paymentMethod, cardName, cardNumber, expiryDate, cvv });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Payment Form</h1>
        </div>

        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="card-name">Card Name</label>
          <input
            type="text"
            id="card-name"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          {cardType && <small>Detected Card Type: {cardType}</small>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input
              type="text"
              id="expiry-date"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit Payment
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Payment;
