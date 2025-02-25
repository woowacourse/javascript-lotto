import resultButtonContents from "./resultButton.html?raw";
import "./resultButton.css";

const createResultButton = () => {
  document
    .getElementById("game-container")
    .insertAdjacentHTML("beforeend", resultButtonContents);
};

export default createResultButton;
