import { Alert } from "../components/Alert.js";
import { appendElement } from "./elementManager.js";

export const alertError = (asyncFn) => {
  try {
    return asyncFn();
  } catch (error) {
    const alert = document.querySelector(".alert");

    if (!alert) {
      appendElement(".alert-container", Alert({ message: error.message }));
      setTimeout(() => {
        alert.remove();
      }, 1500);
    }
    asyncFn();
  }
};
