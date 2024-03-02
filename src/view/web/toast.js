import { $ } from "../../utils/web/selector.js";

function toast(errorMessage) {
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");
  toastElement.textContent = errorMessage;

  $("body").appendChild(toastElement);

  setTimeout(() => toastElement.remove(), 2500);
}

export default toast;
