const HandleView = {
  removeClassList(element, className) {
    element.classList.remove(className);
  },

  addClassList(element, className) {
    element.classList.add(className);
  },

  $(className) {
    return document.querySelector(className);
  },

  $$(className) {
    return document.querySelectorAll(className);
  },
};

export default HandleView;
