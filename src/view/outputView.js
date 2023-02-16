const outputView = {
  printLottos(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      console.log(`[${lotto.join(', ')}]`);
    });
  },
};
