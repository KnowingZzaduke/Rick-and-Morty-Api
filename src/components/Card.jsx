import { status } from "../functions/function";
import { motion } from "framer-motion";
import { useEffect, useContext } from "react";
import { DataContext } from "../context/CardContext";
import axios from "axios";
import { cardVariants } from "../contants/constants";
export function Card() {
  const { setData, data, setLoader, name, count, saveCache } =
    useContext(DataContext);

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

  //Guardar los datos en el local Storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [count]);

  return (
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
  );
}
