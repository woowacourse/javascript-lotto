const lottoStore = (() => {
  let lottos = [];

  return {
    setLottos: (lottos) => {
      lottos = lottos;
    },
    getLottos: () => lottos,
  };
})();

export default lottoStore;
