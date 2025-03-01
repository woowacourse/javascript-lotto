import gameBoxContents from "./gameBox.html?raw";
import createPriceInput from "./createPriceInput";
import "./gameBox.css";
import { appendContents, prependContents } from "../../utilsWeb/elementCreator";

const createGameBox = () => {
  appendContents("main", ".game-container", gameBoxContents);

  const priceInput = createPriceInput();
  prependContents(".purchase-container", "#price", priceInput);
};

export default createGameBox;
