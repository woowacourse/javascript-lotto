import winningLottoBoxContents from "./winningLottoBox.html?raw";
import createNumbersInput from "./createNumbersInput.js";
import "./winningLottoBox.css";

const createWinningLottoBox = () => {
  const gameBox = document.querySelector(".game-container");
  gameBox.insertAdjacentHTML("beforeend", winningLottoBoxContents);

  const numbersInput = createNumbersInput();
  const inputContainer = document.querySelector(".numbers-input-container");
  inputContainer.insertAdjacentHTML("beforeend", numbersInput);
};

export default createWinningLottoBox;
