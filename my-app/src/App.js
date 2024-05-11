import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);

  const handleSearch = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=6ty29TmmlgrAMTgrM3cRQit4Rl8ZXOGZ&q=${searchTerm}&limit=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setGifs(data.data);
      } else {
        alert("No GIFs found for the given search term.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data. Please try again later.");
    }
  };

  return (
    <div className="App">
      <h1>Giphy Search</h1>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="grid-container">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-item">
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
