const isElement = (target) => {
  return target.nodeType && [1, 9].includes(target.nodeType)
}

const $ = (selector, target = document) => {
  if (typeof selector !== 'string' || !isElement(target)) return;

  const all = target.querySelectorAll(selector);
  return all.length > 1 ? [...all] : all[0];
};

export { $ };
