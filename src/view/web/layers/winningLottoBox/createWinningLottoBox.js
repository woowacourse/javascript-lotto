import winningLottoBoxContents from "./winningLottoBox.html?raw";

const createWinningLottoBox = () => {
  const div = document.getElementById("winningLotto-container");
  div.innerHTML = winningLottoBoxContents;

  document.getElementById("game-container").appendChild(div);
};

export default createWinningLottoBox;
