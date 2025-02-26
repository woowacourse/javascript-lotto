export const removeModal = () => {
  const modalContainer = document.querySelector(".modal-container");
  if (modalContainer) {
    modalContainer.remove();
  }
};
