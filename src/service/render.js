const render = (selector, content) => {
  const element = document.querySelector(selector);
  element.innerHTML = content;
};

export default render;
