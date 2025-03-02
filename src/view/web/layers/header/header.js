import headerContents from "./header.html?raw";
import { prependContents } from "../../utilsWeb/elementCreator.js";
import "./header.css";

const createHeader = () => {
  prependContents("#app", "header", headerContents);
};

export default createHeader;
