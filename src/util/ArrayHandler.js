const ArrayHandler = (function () {
  return {
    sortAscendingOrder(numbers) {
      return [...numbers.sort((a, b) => a - b)];
    },
  };
})();

export default ArrayHandler;
