const DomUpdator = {
  content: (element, content) => {
    element.textContent = content;
  },

  removeClass: (element, className) => {
    element.classList.remove(className);
  },

  addClass: (element, className) => {
    element.classList.add(className);
  },

  blur: (element) => {
    element.blur();
  },

  initialInputValue: (element) => {
    element.value = "";
  },

  replaceChildren: (element) => {
    element.replaceChildren();
  },

  showModal: (element, flag) => {
    if (flag) {
      element.showModal();
      return;
    }
    element.close();
  },
};

export default DomUpdator;
