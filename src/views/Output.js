const Output = {
  printErrorMessage(errorMessage) {
    console.log(`[ERROR] ${errorMessage}\n`);
  },
  printIssuedLottos(purchaseAmount, lottos) {
    const lottoCount = purchaseAmount / 1_000;
    console.log(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach((lotto) => console.log(`[${lotto.join(", ")}]`));
  },
};

export default Output;
