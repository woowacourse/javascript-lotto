export const createElement = (tag, props = {}) => {
  if (!tag || typeof tag !== 'string') {
    throw new Error('태그는 문자열이어야 합니다.');
  }
  const element = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'style' && typeof value === 'object') {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        element.style.setProperty(styleKey, styleValue);
      });
    } else if (key === 'class') {
      value.split(' ').forEach((cls) => element.classList.add(cls));
    } else {
      element[key] = value;
    }
  });

  return element;
};
