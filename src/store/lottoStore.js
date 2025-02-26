const lottoStore = (() => {
  let lottos = [];

  return {
    setLottos: (newlottos) => {
      lottos = newlottos;
    },
    getLottos: () => lottos,
  };
})();

export default lottoStore;
