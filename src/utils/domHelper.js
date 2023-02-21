const qs = (selector, target = document) => target.querySelector(selector);
const component = (name) => qs(`[data-component="${name}"]`);

export { qs, component };
