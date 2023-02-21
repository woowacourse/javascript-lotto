const createElem = (tagName, className) => {
  const elem = document.createElement(tagName);
  elem.className = className;

  return elem;
};
