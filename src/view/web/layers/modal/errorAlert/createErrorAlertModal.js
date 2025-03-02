import {
  appendContents,
  insertTextContents,
} from "../../../utilsWeb/elementCreator";
import errorAlertContents from "./errorAlertModal.html?raw";

const createErrorAlertModal = (message) => {
  appendContents(".error-alert-modal", ".alert-container", errorAlertContents);
  insertTextContents(".error-message", message);
};

export default createErrorAlertModal;
