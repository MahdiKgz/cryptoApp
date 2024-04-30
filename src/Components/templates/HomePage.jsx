import { useEffect, useState } from "react";
import CoinsTable from "../CoinsTable";
import Pagination from "../Pagination";
import Search from "../Search.jsx";


import { fetchData } from "../services/getDataApi.js";
import Chart from "../Chart.jsx";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart , setChart] = useState(null)

  useEffect(() => {
    setIsLoading(true);
    const getCoinsData = async () => {
      const res = await fetch(fetchData(page, currency));
      const coins = await res.json();
      setCoins(coins);
      setIsLoading(false);
    };
    getCoinsData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <CoinsTable coins={coins} isLoading={isLoading} currency={currency} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {
        chart && <Chart chart={chart} setChart={setChart} />

      }
    </div>
  );
}

export default HomePage;
