const qs = (selector, target = document) => target.querySelector(selector);
const qsAll = (selector, target = document) => target.querySelectorAll(selector);
const component = (name) => qs(`[data-component="${name}"]`);

export { qs, qsAll, component };
