import { create } from "../core/dom.js";

export const Modal = ({ onClose, children }) => {
  const $overlay = create("div", { className: "modal-overlay" });
  const $modal = create("div", { className: "modal" });

  const $closeButton = create("button", {
    className: "modal-close-button",
    text: "✕",
  });

  $closeButton.addEventListener("click", onClose);
  $overlay.addEventListener("click", (e) => {
    if (e.target === $overlay) onClose();
  });

  const open = () => $overlay.classList.add("active");
  const close = () => $overlay.classList.remove("active");

  $modal.append($closeButton, children);
  $overlay.append($modal);

  return { $overlay, open, close };
};
