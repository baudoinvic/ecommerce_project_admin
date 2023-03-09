import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import axios from "axios";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [transactions, setTransactions] = useState([]);
 
  useEffect(() => {
    const fetchLatestTransactions = async () => {
      try {
        const TOKEN = localStorage.getItem("sk_test_51MRGm1Lq2BvYijBiLDWUa4zwjvce5ohNMgO533ntCD0yuAJc7hPayu7qJxvJcvKBB8jKTeTphR5x3RHD4QLOjfyY00UcstiMug");
        const res = await axios.get(
          "https://api.stripe.com/v1/charges",
          {
            headers: {
              Authorization: `Bearer ${"sk_test_51MRGm1Lq2BvYijBiLDWUa4zwjvce5ohNMgO533ntCD0yuAJc7hPayu7qJxvJcvKBB8jKTeTphR5x3RHD4QLOjfyY00UcstiMug"}`,
              "Content-Type": "application/x-www-form-urlencoded",
              
            },
            params: {
              limit: '7', // retrieve the latest 5 transactions
            },
          }
        );
        setTransactions(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatestTransactions();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr className="widgetLgTr" key={transaction.id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">
                  {transaction.metadata.customer_name}
                </span>
              </td>
              <td className="widgetLgDate">{new Date(transaction.created * 1000).toLocaleString()}</td>
              <td className="widgetLgAmount">
                {transaction.amount / 100} USD
              </td>
              <td className="widgetLgStatus">{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}