import { resetState } from "../state/state.js";
import { resetUI } from "../ui/resetUI.js";

export const retryHandler = () => {
  resetState();
  resetUI();
};
