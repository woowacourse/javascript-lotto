export const createElementWithAttributes = ({
  tag,
  id = '',
  className = '',
  attributes = {},
  textContent = '',
  children = [],
} = {}) => {
  const element = document.createElement(tag);

  if (id) {
    element.setAttribute('id', id);
  }

  if (className) {
    element.classList.add(...className.split(' '));
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (textContent) {
    element.textContent = textContent;
  }

  if (Array.isArray(children) && children.length) {
    children.forEach((child) =>
      element.append(createElementWithAttributes(child)),
    );
  }

  return element;
};
