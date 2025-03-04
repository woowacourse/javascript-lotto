import headerContents from "./header.html?raw";
import { prependContents } from "../../../../utils/view/elementCreator.js";
import "./header.css";

const createHeader = () => {
  prependContents("#app", "header", headerContents);
};

export default createHeader;
