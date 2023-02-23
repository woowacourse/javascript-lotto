const qs = (selector, target = document) => target.querySelector(selector);
const qsAll = (selector, target = document) => target.querySelectorAll(selector);
const component = (name) => qs(`[data-component="${name}"]`);
const getFields = (formEl) => Object.fromEntries(new FormData(formEl));
const createEl = (tag, options = {}) => {
  const $el = document.createElement(tag);

  if (options.id) $el.id = options.id;
  if (options.class) $el.className = options.class;
  if (options.style)
    Object.entries(options.style).forEach(([key, value]) => {
      $el.style[key] = value;
    });

  if (options.attributes)
    Object.entries(options.attributes).forEach(([key, value]) => $el.setAttribute(key, value));

  return $el;
};

export { qs, qsAll, component, getFields, createEl };
