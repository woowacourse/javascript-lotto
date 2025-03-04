import winningLottoBoxContents from "./winningLottoBox.html?raw";
import createNumbersInput from "./createNumbersInput.js";
import "./winningLottoBox.css";
import { appendContents } from "../../../../utils/view/elementCreator.js";
import createBonusNumberInput from "./createBonusNumberInput.js";

const createWinningLottoBox = () => {
  appendContents(
    ".game-container",
    ".winning-lotto-container",
    winningLottoBoxContents,
  );

  const numbersInput = createNumbersInput();
  const bonusNumberInput = createBonusNumberInput();
  appendContents(".numbers-input-container", ".winning-numbers", numbersInput);
  appendContents(".bonus-number-container", ".bonus-number", bonusNumberInput);
};

export default createWinningLottoBox;
