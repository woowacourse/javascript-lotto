import gameBoxContents from "./gameBox.html?raw";
import createPriceInput from "./createPriceInput.js";
import "./gameBox.css";
import {
  appendContents,
  prependContents,
} from "../../../../utils/view/elementCreator.js";

const createGameBox = () => {
  appendContents("main", ".game-container", gameBoxContents);

  const priceInput = createPriceInput();
  prependContents(".purchase-container", "#price", priceInput);
};

export default createGameBox;
