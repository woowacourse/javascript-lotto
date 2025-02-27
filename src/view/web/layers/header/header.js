import headerContents from "./header.html?raw";
import "./header.css";

const createHeader = () => {
  const app = document.querySelector("#app");

  app.insertAdjacentHTML("afterbegin", headerContents);
};

export default createHeader;
