import winningNumbersBoxContents from "./winningNumbersBox.html?raw";

const createWinningNumbersBox = () => {
  const div = document.createElement("div");
  div.id = "winningNumbersBox-container";
  div.innerHTML = winningNumbersBoxContents;

  document.getElementById("gameBox-container").appendChild(div);
};

export default createWinningNumbersBox;
