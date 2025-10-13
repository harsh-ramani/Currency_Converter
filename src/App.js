import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromAmount, setFromAmount] = useState("");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json")
      .then((res) => {
        const data = res.data.usd;
        setCurrencies(Object.keys(data));
        setDate(res.data.date);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const handleConvert = async () => {
    if (!fromAmount || fromAmount <= 0) return alert("Enter a valid USD amount");
    try {
      const res = await axios.get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
      );
      const rate = res.data.usd[toCurrency];
      setConvertedAmount((fromAmount * rate).toFixed(2));
      setDate(res.data.date);
    } catch (err) {
      console.error("Conversion error:", err);
    }
  };

  return (
    <div className="app">
      <h1>💱 USD Currency Converter</h1>

      <div className="converter-box">
        <input
          type="number"
          placeholder="Enter amount in USD"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
        />

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>

        <button onClick={handleConvert}>Convert</button>

        {convertedAmount && (
          <div className="result">
            <h2>
              {fromAmount} USD = {convertedAmount} {toCurrency.toUpperCase()}
            </h2>
            <p>Conversion date: {date}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
