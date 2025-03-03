import { Alert } from "../components/Alert.js";

export const alertError = async (asyncFn) => {
  try {
    return await asyncFn();
  } catch (error) {
    const alert = document.querySelector(".alert");
    if (!alert) {
      appendToParent(".alert-container", Alert({ message: error.message }));
      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 1500);
    }
    await asyncFn();
  }
};
