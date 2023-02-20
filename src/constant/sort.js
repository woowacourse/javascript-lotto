const SORT = Object.freeze({
  ascendingOrder: (a, b) => a - b,
  disorder: () => Math.random() - 0.5,
});

export default SORT;
