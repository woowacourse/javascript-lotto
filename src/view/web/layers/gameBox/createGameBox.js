import gameBoxContents from "./gameBox.html?raw";
import "./gameBox.css";

const createGameBox = () => {
  const section = document.createElement("section");
  section.id = "game-container";
  section.innerHTML = gameBoxContents;

  document.getElementById("main-container").prepend(section);
};

export default createGameBox;
