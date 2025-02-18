import LottoResult from "../src/domain/LottoResult.js";

test("발행된 로또의 당첨 내역을 계산한다.", () => {
  //given
  const lottoStatus = [
    { RANK: 2, COUNT: 5, REWORD: 30_000_000, IS_BONUS: true },
    { RANK: 4, COUNT: 4, REWORD: 50_000, IS_BONUS: false },
  ];
  const price = 1000;
  const lottoResult = new LottoResult(lottoStatus, price);

  //when
  const result = lottoResult.getWinningHistory();

  //then
  expect(result).toEqual({ 1: 0, 2: 1, 3: 0, 4: 1, 5: 0 });
});

test("당첨 내역을 기반으로 총 수입을 구한다.", () => {
  //given
  const lottoStatus = [
    { RANK: 2, COUNT: 5, REWORD: 30_000_000, IS_BONUS: true },
    { RANK: 4, COUNT: 4, REWORD: 50_000, IS_BONUS: false },
  ];
  const price = 1000;
  const lottoResult = new LottoResult(lottoStatus, price);

  //when
  const profit = lottoResult.getTotalProfit();

  //then
  expect(profit).toEqual(30_050_000);
});

test("당첨된 내역을 기반으로 수익률을 구한다.", () => {
  //given
  const lottoStatus = [{ RANK: 5, COUNT: 3, REWORD: 5000, IS_BONUS: false }];
  const price = 8000;
  const lottoResult = new LottoResult(lottoStatus, price);

  //when
  const rate = lottoResult.getRate();

  //then
  expect(rate).toEqual("62.5");
});
