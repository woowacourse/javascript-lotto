import gameBoxContents from "./gameBox.html?raw";
import createPriceInput from "./createPriceInput";
import "./gameBox.css";

const createGameBox = () => {
  const main = document.querySelector("main");
  main.insertAdjacentHTML("beforeend", gameBoxContents);

  const priceInput = createPriceInput();
  const inputContainer = document.querySelector(".purchase-container");
  inputContainer.insertAdjacentHTML("afterbegin", priceInput);
};

export default createGameBox;
