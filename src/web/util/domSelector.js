function $(selector, target = document) {
  return target.querySelector(selector);
}

function $$(selector, target = document) {
  return target.querySelectorAll(selector);
}

export { $, $$ };
