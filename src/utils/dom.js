const dom = {
  $(selector) {
    return document.querySelector(selector);
  },

  create(tagName, id, className, textContent) {
    const tag = document.createElement(tagName);
    if (id) tag.id = id;
    if (className) tag.classList.add(className);
    if (textContent) tag.textContent = textContent;
    return tag;
  },
};

export default dom;
