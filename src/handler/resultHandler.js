import { Modal } from "../components/Modal.js";
import { Result } from "../components/Result.js";
import { displayComponent } from "../util/displayComponents.js";

export const resultHandler = (matchingCount, profitRate) => {
  const modalContent = Result({ matchingCount, profitRate });
  displayComponent("#app", Modal({ content: modalContent }));
};
