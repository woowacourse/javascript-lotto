import gameBoxContents from "./gameBox.html?raw";
import "./gameBox.css";

const createGameBox = () => {
  const main = document.querySelector("main");

  main.insertAdjacentHTML("beforeend", gameBoxContents);
};

export default createGameBox;
