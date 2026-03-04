export const OutputView = {
  outputLottoNumber(lottos) {
    for (let i = 0; i < lottos.length; i++) {
      console.log(lottos[i].getNumber());
    }
  },
};
