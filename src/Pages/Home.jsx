import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(' https://api.coinlore.net/api/tickers/');
        setCoins(response.data.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };
    fetchCoins();
  }, []);

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoins = coins.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = Math.ceil(coins.length / itemsPerPage);
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2">Coin</th>
              <th className="px-4 py-2 border-b-2">Code</th>
              <th className="px-4 py-2 border-b-2">Price</th>
              <th className="px-4 py-2 border-b-2">Total Supply</th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((coin, index) => (
              <tr key={coin.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-t">{coin.name}</td>
                <td className="px-4 py-2 border-t">{coin.symbol.toUpperCase()}</td>
                <td className="px-4 py-2 border-t">${Number(coin.price_usd).toLocaleString()}</td>
                {coin.tsupply ? `${Number(coin.tsupply)} ${coin.symbol.toUpperCase()}` : 'N/A'}
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoinTable;
