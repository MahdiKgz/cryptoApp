import ChartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";

import styles from "./TableCoin.module.css";
import { marketChart } from "./services/getDataApi";
function TableRow({
  coin ,
  currency,
  setChart,
}) {
  let currencySymbol = null;
  const {
    id,
    name,
    image,
    symbol,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  } = coin
  switch (currency) {
    case "usd":
      currencySymbol = "$";
      break;
    case "eur":
      currencySymbol = "€";
      break;
    case "jpy":
      currencySymbol = "¥";
      break;
  }
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin : coin });
    } catch (error) {
      console.log(error)
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currencySymbol} {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        {price_change > 0 ? (
          <img src={ChartUp} alt="chart" />
        ) : (
          <img src={chartDown} alt="chart" />
        )}
      </td>
    </tr>
  );
}

export default TableRow;
