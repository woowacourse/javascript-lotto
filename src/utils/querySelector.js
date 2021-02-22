const $ = (selector, target = document) => {
  const all = target.querySelectorAll(selector);
  return all.length > 1 ? [...all] : all[0];
};

export { $ };
