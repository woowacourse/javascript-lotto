const $ = (selector, target = document) => {
  const all = target.querySelectorAll(selector);
  return all.length > 1 ? [...all] : document.querySelector(selector);
};

export { $ };
