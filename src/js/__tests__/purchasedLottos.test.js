import { LOTTO_PRICE } from '../constants';

describe("로또 구입 기능 테스트", () => 

  it("입력 금액으로 구입할 수 있는 로또 최대 개수를 구한다.", () => {
    const charge = 5500;
    const expectResult = {
      quotient: 5,
      remainder: 500,
    };
    expect(divider(charge, LOTTO_PRICE)).toStrictEqual(expectResult);
  });

  it("주어진 개수의 로또를 발급한다.", () => {
    const count = 7;
    const purchasedLottos = new PurchasedLottos();
    purchasedLottos.generateNewLottos(count);

    expect(purchasedLottos.lottos).toHaveLength(count);
  });

});