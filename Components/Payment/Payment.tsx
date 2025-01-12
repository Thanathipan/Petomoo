import React, { useState } from "react";
import "./Payment.css";

const BookingVisitStep3: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiredCard, setExpiredCard] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`
      Payment Details:
      - Payment Method: ${paymentMethod}
      - Card Name: ${cardName}
      - Card Number: ${cardNumber}
      - Expiry Date: ${expiredCard}
      - CVV: ${cvv}
    `);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Booking Visit Form</h1>
        <button className="close-button" aria-label="Close Form">
          &times;
        </button>
      </div>
      <div className="progress-bar">
        <div className="step">1</div>
        <div className="step">2</div>
        <div className="step active">3</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="left">
            <h2>Payment</h2>
            <div className="form-group">
              <label htmlFor="payment-method">Choose Payment Method</label>
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
                placeholder="Budi Similikiwaw"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                placeholder="01234 5678 1234"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expired-card">Expired Card</label>
                <input
                  type="text"
                  id="expired-card"
                  placeholder="07/25"
                  value={expiredCard}
                  onChange={(e) => setExpiredCard(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="000"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="continue-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default BookingVisitStep3;
