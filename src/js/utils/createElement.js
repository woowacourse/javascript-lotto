const createCustomElement = ({ tag, className, id, children }) => {
  const element = document.createElement(tag);
  Object.assign(element, className && { className }, id && { id });
  if (Array.isArray(children)) {
    element.append(...children);
    return element;
  }
  element.append(children);
  return element;
};

export const div = function createCustomDiv({ className, id, children }) {
  return createCustomElement({ tag: 'div', className, id, children });
};

export const p = function createCustomP({ className, id, children }) {
  return createCustomElement({ tag: 'p', className, id, children });
};

export const label = function createCustomLabel({ className, id, children }) {
  return createCustomElement({ tag: 'label', className, id, children });
};
