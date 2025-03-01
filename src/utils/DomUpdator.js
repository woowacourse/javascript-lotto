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

  initialValue: (element) => {
    element.value = "";
  },

  showModal: (element) => {
    element.showModal();
  },
};

export default DomUpdator;
