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
  const [name, setName] = useState(null);
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
    const axiosData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character`
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    axiosData();
  }, []);
  //Guardar los datos en el caché
  const saveCache = useMemo(() => data, [data]);

  //Buscador
  const filterData = useCallback((e) => {
    e.preventDefault();
    console.log(name)
    if (name === "") {
      setData(saveCache);
    } else {
      const filteredData = saveCache.filter((save) =>
        save.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredData) {
        setData(filteredData);
      }
    }
    [name, saveCache];
  });

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
        <form className="content_search" onSubmit={filterData}>
          <div className="input">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Character name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button>Buscar</button>
        </form>
        <div className="content_buttons"></div>
      </header>
      <div className="content_cards">
        {saveCache?.map((date) => (
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
      {saveCache?.length === 0 && <div className="loader"></div>}

      <div className="content_buttons">
        <FaRegArrowAltCircleLeft />
        <FaRegArrowAltCircleRight />
      </div>
      <footer>
        <p>José Luis Arteta Buelvas❤️</p>
      </footer>
    </div>
  );
}

export default App;
