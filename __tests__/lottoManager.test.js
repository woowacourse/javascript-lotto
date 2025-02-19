import LottoManager from "../src/LottoManager";

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  const price = 5000;
  const lottoManager = new LottoManager(price);

  lottoManager.generateLottos();
  expect(lottoManager.lottos.length).toBe(5);
});

test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 1;
  const lottoManager = new LottoManager(5000);

  expect(() =>
    lottoManager.validateBonusNumberUnique(winningNumbers, bonusNumber)
  ).toThrow("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
});
