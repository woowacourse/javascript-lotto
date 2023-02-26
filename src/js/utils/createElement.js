const createElement = ({ tagName, type, name }) => {
  const element = document.createElement(tagName);
  if (type === 'class') element.className = name;
  if (type === 'id') element.id = name;

  return element;
};

export default createElement;
