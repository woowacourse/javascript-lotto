import { outputView } from "../view/outputView";

export const errorCatcher = (validator) => {
  try {
    validator();

    return true;
  } catch (error) {
    outputView.print(error.message);

    return false;
  }
};
