import { outputView } from "../view/outputView";

export const webErrorCatcher = (validator) => {
  try {
    validator();

    return true;
  } catch (error) {
    alert(error.message);

    return false;
  }
};

export const consoleErrorCatcher = (validator) => {
  try {
    validator();

    return true;
  } catch (error) {
    outputView.print(error.message);

    return false;
  }
};
