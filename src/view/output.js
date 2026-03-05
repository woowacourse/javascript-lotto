export const OutputView = {
  outputLottoNumber(lottos) {
    console.log(lottos.length, "개를 구매했습니다.");
    for (let i = 0; i < lottos.length; i++) {
      console.log(lottos[i].getNumber());
    }
  },
};
