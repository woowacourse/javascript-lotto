import {
  appendContents,
  insertTextContents,
} from "../../../../../utils/view/elementCreator.js";
import errorAlertContents from "./errorAlertModal.html?raw";
import "./errorAlertModal.css";

const createErrorAlertModal = (message) => {
  appendContents(".error-alert-modal", ".alert-container", errorAlertContents);
  insertTextContents(".error-message", message);
};

export default createErrorAlertModal;
