const createDomElement = (tag, props) => {
  if (tag === 'svg' || tag === 'path') {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(props).forEach(([key, value]) => {
      element.setAttribute(`${key}`, value);
    });
    return element;
  }
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    element[key] = value;
  });

  return element;
};

export default createDomElement;
