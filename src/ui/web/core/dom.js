const addAttr = ($el, key, value) => {
  if (value === undefined || value === null) return;
  $el.setAttribute(key, String(value));
};

export const create = (tag, attrs = {}) => {
  const $el = document.createElement(tag);

  const { className, text, value, disabled, ...rest } = attrs;

  if (className) $el.className = className;
  if (text) $el.textContent = text;
  if (value !== undefined) $el.value = value;
  if (disabled !== undefined) $el.disabled = disabled;

  Object.entries(rest).forEach(([key, value]) => addAttr($el, key, value));
  return $el;
};
