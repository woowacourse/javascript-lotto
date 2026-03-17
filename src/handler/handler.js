export const purchaseHandler = (controller) => (e) => {
  e.preventDefault();
  controller.purchase();
};

export const resultHandler = (controller) => () => {
  controller.getResult();
};

export const restartHandler = (controller) => () => {
  controller.restart();
};

export const modalCloseHandler = (controller) => () => {
  controller.closeModal();
};

export const modalOverlayHandler = () => (e) => {
  modalHiddenByOverlay(e);
};
