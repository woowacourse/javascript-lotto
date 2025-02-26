const priceStore = (() => {
  let price = 0;
  return {
    getPrice: () => price,
    setPrice: (newPrice) => (price = newPrice),
  };
})();

export default priceStore;
