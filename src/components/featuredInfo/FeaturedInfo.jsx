import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios"

export default function FeaturedInfo() {
  const [income, setIncome] = useState({total: 0, lastMonthTotal: 0});

  useEffect(() => {
    const getIncome = async () => {
      try {
        const TOKEN = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/orders/income`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        const data = response.data;
        const lastMonthTotal = data.length > 1 ? data[data.length - 2].total : 0;
        setIncome({total: data[data.length - 1].total, lastMonthTotal: lastMonthTotal});
      } catch (error) {
        console.error(error);
      }
    };
    getIncome();
  }, []);

  const rate = ((income.total - income.lastMonthTotal) / income.lastMonthTotal) * 100;

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income.total}</span>
          <span className={`featuredMoneyRate ${rate < 0 ? 'negative' : ''}`}>
            {rate.toFixed(2)}%{" "}
            {rate < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}