import headerContents from "./header.html?raw"
import "./header.css"

const createHeader = async () => {
  const header = document.createElement("header");
  header.className = "header-container";
  header.innerHTML = headerContents;

  document.getElementById("app").prepend(header);
};

export default createHeader;
