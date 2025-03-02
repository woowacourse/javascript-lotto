import { Alert } from "../components/Alert.js";
import { appendToParent } from "./appendToParent.js";

const retryOnErrorForTerminal = async (asyncFn, onError) => {
  while (true) {
    try {
      return await asyncFn();
    } catch (e) {
      onError(e);
    }
  }
};

const retryOnErrorWeb = async (asyncFn) => {
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

const isWebEnvironMent = typeof window !== "undefined";

const retryOnError = async (func, onError) => {
  if (isWebEnvironMent) {
    return await retryOnErrorWeb(func);
  }
  return await retryOnErrorForTerminal(func, onError);
};

export default retryOnError;
