import App from "../src/controller/App.js";
import InputView from "../src/view/InputView.js";

describe("게임 재시작", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("사용자가 'y'를 입력하면 게임이 재시작되어 inputPrice가 두 번 호출된다.", async () => {
    const inputPriceSpy = jest
      .spyOn(InputView, "inputPrice")
      .mockResolvedValue("1000");
    jest
      .spyOn(InputView, "inputWinningNums")
      .mockResolvedValue([1, 2, 3, 4, 5, 6]);
    jest.spyOn(InputView, "inputBonusNum").mockResolvedValue(7);

    jest
      .spyOn(InputView, "inputRestartAnswer")
      .mockResolvedValueOnce("y")
      .mockResolvedValueOnce("n");

    const app = new App();
    await app.run();

    expect(inputPriceSpy).toHaveBeenCalledTimes(2);
  });

  test("사용자가 'n' 를 입력하면 게임이 종료되어 inputPrice가 한 번 호출된다.", async () => {
    const inputPriceSpy = jest
      .spyOn(InputView, "inputPrice")
      .mockResolvedValue("1000");
    jest
      .spyOn(InputView, "inputWinningNums")
      .mockResolvedValue([1, 2, 3, 4, 5, 6]);
    jest.spyOn(InputView, "inputBonusNum").mockResolvedValue(7);

    jest.spyOn(InputView, "inputRestartAnswer").mockResolvedValueOnce("n");

    const app = new App();
    await app.run();

    expect(inputPriceSpy).toHaveBeenCalledTimes(1);
  });
});
