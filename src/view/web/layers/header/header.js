import headerContents from "./header.html?raw";
import "./header.css";
import { prependContents } from "../../utilsWeb/elementCreator";

const createHeader = () => {
  prependContents("#app", "header", headerContents);
};

export default createHeader;
