import footerContents from "./footer.html?raw";
import "./footer.css";

const createFooter = () => {
  const app = document.querySelector("#app");

  app.insertAdjacentHTML("beforeend", footerContents);
};

export default createFooter;
