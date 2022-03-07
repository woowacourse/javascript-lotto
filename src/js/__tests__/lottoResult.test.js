import LottoResultModel from "../model/LottoResultModel.js";

/* eslint-disable no-undef */
describe("로또 당첨 등수 및 개수 테스트", () => {
  test("구매한 로또 숫자와 당첨 번호를 비교하여 당첨 등수 개수를 확인한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const winningNumbers = [12, 28, 22, 37, 19, 23, 7];
    const lottos = [
      [12, 28, 22, 37, 19, 23], // 6개
      [12, 28, 22, 37, 19, 7], // 5개 + 보너스
      [12, 28, 22, 37, 19, 21], // 5개
      [12, 28, 22, 37, 14, 20], // 4개
      [12, 28, 22, 31, 34, 45], // 3개
    ];
    const result = {
      first: 1,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 1,
    };
    lottos.forEach((lotto) => lottoResultModel.compareWinningNumbers(lotto, winningNumbers));
    expect(lottoResultModel.getlottoResult()).toEqual(result);
  });

  test("로또를 구매한 금액과 당첨 결과를 이용하여 총 수익률을 계산한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const usedAmount = 10000;
    const lottoResult = {
      first: 1,
      second: 1,
      third: 1,
      fourth: 1,
      fifth: 1,
    };
    const profitRate = 20315550;
    expect(lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount)).toBe(profitRate);
  });

  test("로또 번호 6개를 맞춘 1등 수익률을 계산한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const usedAmount = 5000;
    const lottoResult = {
      first: 1,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const profitRate = 40000000;
    expect(lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount)).toBe(profitRate);
  });

  test("로또 번호 5개와 보너스 번호 1개를 맞춘 2등 수익률을 계산한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const usedAmount = 5000;
    const lottoResult = {
      first: 0,
      second: 1,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const profitRate = 600000;
    expect(lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount)).toBe(profitRate);
  });

  test("로또 번호 5개를 맞춘 3등 수익률을 계산한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const usedAmount = 5000;
    const lottoResult = {
      first: 0,
      second: 0,
      third: 1,
      fourth: 0,
      fifth: 0,
    };
    const profitRate = 30000;
    expect(lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount)).toBe(profitRate);
  });

  test("로또 번호 4개를 맞춘 4등 수익률을 계산한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const usedAmount = 5000;
    const lottoResult = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 1,
      fifth: 0,
    };
    const profitRate = 1000;
    expect(lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount)).toBe(profitRate);
  });

  test("로또 번호 3개를 맞춘 5등 수익률을 계산한다.", () => {
    const lottoResultModel = new LottoResultModel();
    const usedAmount = 5000;
    const lottoResult = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 1,
    };
    const profitRate = 100;
    expect(lottoResultModel.calculateTotalProfitRate(lottoResult, usedAmount)).toBe(profitRate);
  });
});
