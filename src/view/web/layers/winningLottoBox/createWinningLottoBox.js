import winningLottoBoxContents from "./winningLottoBox.html?raw";

const createWinningLottoBox = () => {
  const div = document.createElement("div");
  div.id = "winningLottoBox-container";
  div.innerHTML = winningLottoBoxContents;

  document.getElementById("gameBox-container").appendChild(div);
};

export default createWinningLottoBox;
