import { clearElement, removeElement } from "../util/elementManager.js";

export const resetUI = () => {
  const elementsToClear = [".count-prompt", ".lotto-numbers-container", ".winning-prompt", ".winning-bonus-container", ".result-button-container"];
  elementsToClear.forEach(clearElement);

  const elementsToRemove = [".modal-container", ".warning"];
  elementsToRemove.forEach(removeElement);
};
