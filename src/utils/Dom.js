const Dom = {
  $: (selector) => document.querySelector(selector),
  $$: (selector) => document.querySelectorAll(selector),
};

export default Dom;
