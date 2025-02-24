import winningLottoBoxContents from "./winningLottoBox.html?raw";

const createWinningLottoBox = () => {
  const div = document.createElement("div");
  div.id = "winningLotto-container";
  div.class = "purchased-rendered";
  div.innerHTML = winningLottoBoxContents;

  document.getElementById("game-container").appendChild(div);
};

export default createWinningLottoBox;
