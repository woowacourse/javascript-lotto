import LottoPack from "../src/domain/LottoPack";
test("갯수에 비례해 로또가 발행된다.", () => {
  const sampleLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 7, 8, 9, 6],
    [2, 3, 13, 4, 5, 6],
  ];
  const lottoPack = new LottoPack(sampleLottos);
  expect(lottoPack.lottos.length).toBe(sampleLottos.length);
});
