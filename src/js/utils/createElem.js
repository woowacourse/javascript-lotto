const createElem = (tagName, type, name) => {
  const elem = document.createElement(tagName);
  if (type === 'class') elem.className = name;
  if (type === 'id') elem.id = name;

  return elem;
};

export default createElem;
