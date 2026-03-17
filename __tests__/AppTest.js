import MainController from "../src/controllers/console/MainController.js";
import InputView from "../src/views/console/InputView.js";
import App from "../src/step1-App";

jest.mock("../src/views/console/InputView.js");

describe("예외가 발생했을 때 그 부분부터 다시 입력이 잘 되어야 한다.", () => {
  test("보너스 번호에서 에러가 나면 보너스 번호만 다시 입력받는다.", async () => {
    const controller = new MainController();

    InputView.readStringWithMsg
      .mockResolvedValueOnce("2000") // 구매금액
      .mockResolvedValueOnce("1,2,3,4,5,6") // 당첨번호
      .mockResolvedValueOnce("1") // 보너스번호 (에러 발생 가정)
      .mockResolvedValueOnce("abc") // 보너스번호 (에러 발생 가정)
      .mockResolvedValueOnce("7"); // 다시 입력

    await controller.run();

    expect(InputView.readStringWithMsg).toHaveBeenCalledTimes(5);
  });
});

describe("재시작이 잘 되어야 한다.", () => {
  test("재시작이 잘 되어야 한다.", async () => {
    const app = new App();

    jest.spyOn(MainController.prototype, "run").mockResolvedValue();

    InputView.readStringWithMsg
      .mockResolvedValueOnce("y") // 재시작
      .mockResolvedValueOnce("n"); // 종료

    await app.run();

    expect(MainController.prototype.run).toHaveBeenCalledTimes(2);
  });
});
