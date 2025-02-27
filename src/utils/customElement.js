const customCreateElement = (tagInfo) => {
  const { tagName, className, text } = tagInfo;

  const $tag = document.createElement(tagName);

  if (className) $tag.className = className;
  if (text) $tag.textContent = text;

  return $tag;
};

export default customCreateElement;
