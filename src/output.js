const printUserLottos = (userLottos) => {
  printLottoCount(userLottos.price);
  userLottos.lottos.forEach((userLotto) => {
    console.log(userLotto.numbers);
  });
};

const printLottoCount = (price) => {
  console.log(`${Number(price / 1000)}개를 구매했습니다.`);
};

export { printUserLottos };
