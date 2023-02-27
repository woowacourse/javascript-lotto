const LottoStore = (function () {
  let state = {
    lottoList: [],
    statistics: 0,
    earningRate: 0,
  };

  function setState(newState) {
    state = { ...state, ...newState };
  }

  function getLottoList() {
    return state.lottoList;
  }

  function getStatistics() {
    return state.statistics;
  }

  function getEarningRate() {
    return state.earningRate;
  }

  return {
    setState,
    getLottoList,
    getStatistics,
    getEarningRate,
  };
})();

export default LottoStore;
