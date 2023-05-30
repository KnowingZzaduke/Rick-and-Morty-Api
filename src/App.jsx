import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";

function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");
  const cardVariants = {
    offscreen: {
      y: 200,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      trasition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
        delay: 2000,
      },
    },
  };

  useEffect(() => {
    const getData = localStorage.getItem("data");
    if (getData) {
      const parseData = JSON.parse(getData);
      setData(parseData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https:rickandmortyapi.com/api/character/?page=${count}`
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [count]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    const parseCount = parseInt(savedCount);
    if (parseCount) {
      setCount(parseInt(parseCount));
    }
  }, []);
  const cachePagination = useMemo(() => data, [count]);

  function nextPage() {
    setCount(count + 1);
  }

  function backPage() {
    setCount((prevCount) => (prevCount <= 1 ? 1 : prevCount - 1));
  }

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  const filterData = useCallback(() => {
    if (name === "") {
      return data;
    } else {
      return data.filter((date) => date.name.includes(name));
    }
  }, [name]);

  function status(status) {
    switch (status) {
      case "Alive":
        return "🟢";

      case "Died":
        return "🔴";

      case "unknown":
        return "❓";

      default:
        return "⚫";
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Rick and Morty API</h1>
        <div className="content_search">
          <div className="input">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Character name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button onClick={filterData}>Buscar</button>
        </div>
        <div className="content_buttons">
          <FaRegArrowAltCircleLeft onClick={backPage} />
          <FaRegArrowAltCircleRight onClick={nextPage} />
        </div>
      </header>
      <div className="content_cards">
        {cachePagination?.map((date) => (
          <motion.div
            className="card"
            key={date.id}
            initial={cardVariants.offscreen}
            whileInView={cardVariants.onscreen}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="left">
              <img src={date.image} />
            </div>
            <div className="right">
              <span>{date.name}</span>
              <span>{date.species}</span>
              <span>Status: {status(date.status)}</span>
              <span>Gender: {date.gender}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="content_buttons">
        <FaRegArrowAltCircleLeft onClick={backPage} />
        <FaRegArrowAltCircleRight onClick={nextPage} />
      </div>
      <footer>
        <p>José Luis Arteta Buelvas❤️</p>
      </footer>
    </div>
  );
}

export default App;
