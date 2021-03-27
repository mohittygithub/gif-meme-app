import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("fun");
  const [limit, setLimit] = useState("48");
  const [loading, setLoading] = useState(false);

  const getGifs = async () => {
    try {
      setLoading(true);
      const gifs = await axios.get(
        `https://g.tenor.com/v1/search?q=${query}&key=AQXMF78LZOF3&limit=${limit}`,
        { mode: "cors", "Access-Control-Allow-Origin": "*" }
      );
      console.log(gifs.data.results);
      setImages(gifs.data.results);
      setLoading(false);
    } catch (error) {
      setError("Sorry no gifs found for this keyword");
      console.log("error => ", error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("query => ", query);
    getGifs();
  };
  useEffect(() => {
    getGifs();
  }, []);

  return (
    <div className="home">
      <h1>GIFS</h1>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <label className="label">Search</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="button" type="submit">
            Find
          </button>
        </form>
      </div>
      <div className="gifs">
        {images.map((image) =>
          image.media.map((med) => (
            <img key={image.id} src={med.gif.url} alt={image.title} />
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
