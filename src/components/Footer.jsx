import rickAndMorty from "/img/rick-and-morty.png";
import { useContext } from "react";
import { DataContext } from "../context/CardContext";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
export function Footer() {
  const { backPage, nextPage } = useContext(DataContext);
  return (
    <div className="content_footer">
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
