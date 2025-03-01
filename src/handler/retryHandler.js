import { getOriginalApp } from "../state/state.js";
import { initialHandler } from "./intialHandler.js";

export const retryHandler = () => {
  const originalApp = getOriginalApp();
  const currentApp = document.querySelector("#app");
  if (originalApp) {
    currentApp.replaceChildren(...originalApp.children);
  }
  initialHandler();
};
