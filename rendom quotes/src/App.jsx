import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quote, setQuote] = useState(null);
  const [savedQuotes, setSavedQuotes] = useState(() => {
    const saved = localStorage.getItem('savedQuotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes/random');
      setQuote(response.data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const saveQuote = () => {
    setSavedQuotes(prev => {
      const newQuotes = [...prev, quote];
      localStorage.setItem('savedQuotes', JSON.stringify(newQuotes));
      return newQuotes;
    });
  };

  const deleteQuote = (index) => {
    const newQuotes = savedQuotes.filter((_, i) => i !== index);
    setSavedQuotes(newQuotes);
    localStorage.setItem('savedQuotes', JSON.stringify(newQuotes));
  };

  return (
    <div className="p-6 font-sans">
      <div className="border-2 border-black p-6 rounded-lg mb-6">
        {quote && (
          <>
            <p className="text-xl font-semibold">"{quote.quote}"</p>
            <p className="text-right mt-4">~ {quote.author}</p>
          </>
        )}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={saveQuote}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!quote}
          >
            Save
          </button>
          <button
            onClick={fetchRandomQuote}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Re-generate
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">Saved quotes</h3>
        {savedQuotes.map((savedQuote, index) => (
          <div
            key={index}
            className="border border-gray-400 p-4 rounded-lg mb-4"
          >
            <p className="text-lg">"{savedQuote.quote}"</p>
            <p className="text-right mt-2">~ {savedQuote.author}</p>
            <button
              onClick={() => deleteQuote(index)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
