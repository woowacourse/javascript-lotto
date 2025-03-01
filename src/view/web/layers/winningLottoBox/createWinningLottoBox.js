import winningLottoBoxContents from "./winningLottoBox.html?raw";
import createNumbersInput from "./createNumbersInput.js";
import "./winningLottoBox.css";
import { appendContents } from "../../utilsWeb/elementCreator.js";

const createWinningLottoBox = () => {
  appendContents(
    ".game-container",
    ".winning-lotto-container",
    winningLottoBoxContents,
  );

  const numbersInput = createNumbersInput();
  appendContents(".numbers-input-container", ".winning-numbers", numbersInput);
};

export default createWinningLottoBox;
