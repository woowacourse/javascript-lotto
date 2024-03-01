export const disableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i += 1) {
    formElement.elements[i].disabled = true;
  }
};

export const ableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i += 1) {
    formElement.elements[i].disabled = false;
  }
};
