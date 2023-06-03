import { createContext, useState, useMemo, useEffect } from "react";
export const DataContext = createContext();

export function DataContextProvider(props) {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");
  const [results, setResults] = useState(false);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getData = localStorage.getItem("data");
    if (getData) {
      const parseData = JSON.parse(getData);
      setData(parseData);
    }
  }, [count]);

  //Guardar los datos en el caché
  const saveCache = useMemo(() => data, [data]);

  function nextPage() {
    setCount(count + 1);
  }

  function backPage() {
    setCount((prevCount) => (prevCount <= 1 ? 1 : prevCount - 1));
  }

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        saveCache,
        loader,
        setLoader,
        count,
        setCount,
        results,
        setResults,
        name,
        setName,
        backPage,
        nextPage,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
