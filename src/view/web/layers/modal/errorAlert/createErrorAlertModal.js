import {
  appendContents,
  insertTextContents,
} from "../../../utilsWeb/elementCreator";
import errorAlertContents from "./errorAlertModal.html?raw";

const createErrorAlertModal = (message) => {
  appendContents("#app", ".error-alert-modal", errorAlertContents);
  insertTextContents(".error-message", message);
};

export default createErrorAlertModal;
