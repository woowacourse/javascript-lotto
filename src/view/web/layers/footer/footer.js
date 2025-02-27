import footerContents from "./footer.html?raw";
import "./footer.css";

const createFooter = () => {
  const footer = document.querySelector("footer");

  footer.innerHTML = footerContents;
};

export default createFooter;
