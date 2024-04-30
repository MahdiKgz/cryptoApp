import { useEffect, useState } from "react";
import { searchCoin } from "./services/getDataApi.js";
import toast, { Toaster } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

import styles from "./modules/Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [searchedCoins, setSearchedCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setSearchedCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setIsLoading(false);
          setSearchedCoins(json.coins);
        } else {
          toast.error(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    setIsLoading(true);
    search();

    return () => {
      controller.abort();
    };
  }, [text]);
  return (
    <div className={styles.searchBox}>
      <Toaster position="top-center" />
      <input
        type="search"
        placeholder="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!searchedCoins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines
              strokeWidth="2"
              width="50"
              height="50px"
              strokeColor="#3874ff"
            />
          )}
          <ul>
            {searchedCoins.map((coin) => (
              <li key={coin.id}>
                <img alt="thumb-coin" src={coin.thumb} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
