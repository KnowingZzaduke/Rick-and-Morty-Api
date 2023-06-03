import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import rickAndMorty from "/img/rick-and-morty.png";
import { useCallback, useContext } from "react";
import { DataContext } from "../context/CardContext";

export function Header() {
  const {
    name,
    saveCache,
    setName,
    setLoader,
    setData,
    setResults,
    backPage,
    nextPage,
    results,
    loader,
    count
  } = useContext(DataContext);

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

  return (
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
      <div className="count">
        <span>Page: {count}</span>
      </div>
      <div className="content_buttons">
        <FaRegArrowAltCircleLeft onClick={backPage} />
        <FaRegArrowAltCircleRight onClick={nextPage} />
      </div>
      {results && (
        <div className="results">
          <h2>¡ No results :( !</h2>
        </div>
      )}
      {loader && <div className="loader"></div>}
    </header>
  );
}
