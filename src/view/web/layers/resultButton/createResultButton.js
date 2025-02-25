import resultButtonContents from "./resultButton.html?raw";

const createResultButton = () => {
  document
    .getElementById("game-container")
    .insertAdjacentHTML("beforeend", resultButtonContents);
};

export default createResultButton;
