import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import rickAndMorty from "/img/rick-and-morty.png";
function App() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(true);
  const [results, setResults] = useState(false);
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
  }, [count]);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${count}`
        );
        setData(response.data.results);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    axiosData();
  }, [count, name]);
  //Guardar los datos en el caché
  const saveCache = useMemo(() => data, [data]);

  //Guardar los datos en el local Storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [count]);

  //Buscador
  const filterData = useCallback(
    (e) => {
      e.preventDefault();
      const filteredData = saveCache.filter((save) =>
        save.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredData.length === 0) {
        setResults(true);
      } else {
        setData(filteredData);
        setLoader(false);
        setResults(false);
      }
    },
    [name, saveCache]
  );

  function nextPage() {
    setCount(count + 1);
  }

  function backPage() {
    setCount((prevCount) => (prevCount <= 1 ? 1 : prevCount - 1));
  }

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
        <img src={rickAndMorty} />
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
        <div className="content_buttons">
          <FaRegArrowAltCircleLeft onClick={backPage} />
          <FaRegArrowAltCircleRight onClick={nextPage} />
        </div>
      </header>
      {results && (
        <div className="results">
          <h2>¡ No results :( !</h2>
        </div>
      )}
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
      {loader && <div className="loader"></div>}
      <div className="content_buttons">
        <FaRegArrowAltCircleLeft onClick={backPage} />
        <FaRegArrowAltCircleRight onClick={nextPage} />
      </div>
      <footer>
        <p>José Luis Arteta Buelvas❤️</p>
        <img src={rickAndMorty} />
      </footer>
    </div>
  );
}

export default App;
