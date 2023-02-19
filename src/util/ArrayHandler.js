const arrayHandler = {
  sortAscendingOrder(numbers) {
    return [...numbers.sort((a, b) => a - b)];
  },
};

export default arrayHandler;
