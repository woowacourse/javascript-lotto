const $ = selector => {
  const elements = document.querySelectorAll(selector);

  return elements.length === 1 ? elements[0] : elements;
};

export default $;
