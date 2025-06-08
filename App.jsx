import { useState, useEffect } from 'react';

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCurrencies();
  }, [toCurrency]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fetchExchangeRate = async () => {
        try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
          if (!response.ok) {
            throw new Error('Failed to fetch exchange rate');
          }
          const data = await response.json();
          setExchangeRate(data.rates[toCurrency]);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Currency Converter</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <select
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={swapCurrencies}
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Swap
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <select
                value={toCurrency}
                onChange={handleToCurrencyChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-500 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800">Converted Amount</h2>
            <p className="text-2xl font-bold mt-2">
              {convertedAmount} {toCurrency}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;