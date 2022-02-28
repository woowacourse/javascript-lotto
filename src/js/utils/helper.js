export const qs = (selector, scope = document) => {
  return scope.querySelector(selector);
}

export const qsAll = (selector, scope = document) => {
  return Array.from(scope.querySelectorAll(selector));
}

export const on = (target, eventName, handler) =>
  target.addEventListener(eventName, handler);

export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });

  target.dispatchEvent(event);
};
