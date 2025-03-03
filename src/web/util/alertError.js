import { Alert } from "../components/Alert.js";
import { appendElement } from "./elementManager.js";

export const alertError = (asyncFn) => {
  try {
    return asyncFn();
  } catch (error) {
    if (!document.querySelector(".alert")) {
      appendElement(".alert-container", Alert({ message: error.message }));
      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 1500);
    }
    asyncFn();
  }
};
