export const bindPurchaseEvent = (handler) => {
  document.querySelector("#purchase-input-section").addEventListener("submit", handler);
};

export const bindResultEvent = (handler) => {
  document.querySelector("#winning-input-section").addEventListener("submit", handler);
};

export const bindModalBackdropClick = (handler) => {
  document.getElementById("modal-container").addEventListener("click", handler);
};

export const bindModalCloseEvent = (handler) => {
  document.getElementById("modal-close-button").addEventListener("click", handler);
};

export const bindResetEvent = (handler) => {
  document.querySelector("#modal-statistics-section button").addEventListener("click", handler);
};
