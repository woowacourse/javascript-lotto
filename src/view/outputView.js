class OutputView {
  printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  }

  printLotto(lottos) {
    lottos.forEach((lotto) => {
      console.log(lotto);
    });
  }
}

export default OutputView;
