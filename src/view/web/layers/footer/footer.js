import footerContents from "./footer.html?raw";
import { appendContents } from "../../../../utils/elementCreator.js";
import "./footer.css";

const createFooter = () => {
  appendContents("#app", "footer", footerContents);
};

export default createFooter;
