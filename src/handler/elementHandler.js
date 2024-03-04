const elementHandler = {
  $(className) {
    return document.querySelector(className);
  },

  $$(className) {
    return document.querySelectorAll(className);
  },
};

export default elementHandler;
