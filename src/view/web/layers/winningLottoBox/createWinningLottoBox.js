import winningLottoBoxContents from "./winningLottoBox.html?raw";

const createWinningLottoBox = () => {
  const div = document.createElement("div");
  div.id = "winningLotto-container";
  div.className = "purchased-rendered";
  div.innerHTML = winningLottoBoxContents;

  document.getElementById("game-container").appendChild(div);
};

export default createWinningLottoBox;
