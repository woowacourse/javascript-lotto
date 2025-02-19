import lottoController from "../../src/controllers/LottoController.js";
import Lotto from "../../src/models/Lotto.js";

jest.mock("../../src/models/Lotto.js");

describe("controllers/lottoController", () => {
  test("입력받은 금액만큼 로또 수를 발행한다.", () => {
    const price = 8000;
    lottoController(price);

    expect(Lotto).toHaveBeenCalledTimes(8);
  });
});
