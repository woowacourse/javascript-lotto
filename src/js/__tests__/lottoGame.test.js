import LottoGame from "../models/LottoGame";

describe("로또 게임 모델 테스트", () => {
  it("로또 게임 모델에 금액이 정상적으로 입력되면, 구매할 수 있는 로또의 수를 반환할 수 있어야 한다.", () => {
    const lottoGame = new LottoGame();

    const availableLottoAmount = lottoGame.inputCharge(5000);
    expect(availableLottoAmount).toBe(5);
  });

  it("금액은 1000이상의 숫자여야한다.", () => {
    const lottoGame = new LottoGame();
    try {
      const availableLottoAmount = lottoGame.inputCharge(500);
    } catch ({ message }) {
      expect(message).toEqual("금액은 1000원 이상이어야합니다.");
    }
  });

  it("로또 번호 배열들을 입력하여 로또 모델을 생성하고 관리할 수 있어야 한다.", () => {
    const lottoGame = new LottoGame();
    const availableLottoAmount = lottoGame.inputCharge(5000);

    lottoGame.createLottoList(availableLottoAmount);

    expect(lottoGame.lottoList.length).toBe(availableLottoAmount);
  });
});
