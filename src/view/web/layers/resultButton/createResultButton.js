import resultButtonContents from "./resultButton.html?raw";
import "./resultButton.css";

const createResultButton = () => {
  document
    .getElementById("winningLotto-numbersInput-form")
    .insertAdjacentHTML("beforeend", resultButtonContents);
};

export default createResultButton;
