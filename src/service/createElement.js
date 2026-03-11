const createElement = (tag, attributes = {}, ...children) => {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.substring(2).toLowerCase(), value);
      continue;
    }
    element.setAttribute(key, value);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
};

export default createElement;
