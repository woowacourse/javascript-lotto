class OutputView {
  static printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  }

  static printLotto(lottos) {
    lottos.forEach((lotto) => {
      console.log(`[${lotto.numbers.join(", ")}]`);
    });
  }
}

export default OutputView;
