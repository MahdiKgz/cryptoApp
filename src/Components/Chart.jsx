import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

import styles from "./modules/Chart.module.css";
import { convertData } from "./helpers/convertData.js";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (event) => {
    if(event.target.tagName === "BUTTON"){
      event.target.classList.add("selected");
      setType(event.target.value)
    }
  }
  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt="coin image" />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={400} data={convertData(chart, type)}>
              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth={2}
              />
              <CartesianGrid stroke="#404042"></CartesianGrid>
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <XAxis dataKey="date" />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : ""} value="prices">prices</button>
          <button className={type === "market_caps" ? styles.selected : ""} value="market_caps">market caps</button>
          <button className={type === "total_volumes" ? styles.selected : ""} value="total_volumes">total volumes</button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices : </p>
            <span>${chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH : </p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap : </p>
            <span>${chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
