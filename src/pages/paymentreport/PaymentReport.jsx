import React, { useState, useEffect } from "react";
import "./paymentreport.css";

function PaymentReport() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payment data from server
    fetch("/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ /* payment data */ }),
    })
      .then((response) => response.json())
      .then((data) => setPayments((prevPayments) => [...prevPayments, data]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="payment-report-container">
      <h1 className="payment-report-heading">Payment Report</h1>
      <table className="payment-report-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.date}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}

export default PaymentReport;