import fs from "fs";
import path from "path";
import { screen } from "@testing-library/dom";
import App from "../src/app.js";
import WebInput from "../src/view/WebInput.js";
import WebOutput from "../src/view/WebOutput.js";
import LottoStore from "../src/model/LottoStore.js";
import MockRandomUtil from "./utils/MockRandomUtil.js";

const html = fs.readFileSync(
  path.resolve(__dirname, "./../index.html"),
  "utf8",
);

beforeEach(() => {
  document.body.innerHTML = html.toString();

  const app = new App({
    input: new WebInput(),
    output: new WebOutput(),
    lottoStore: new LottoStore({
      randomUtil: new MockRandomUtil([[1, 2, 3, 4, 5, 6]]),
    }),
  });

  app.run();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Web 통합 테스트", () => {
  test("금액 입력 폼이 정상적으로 출력된다.", () => {
    const element = screen.getByText("구입할 금액을 입력해주세요.");
    expect(element).toBeInTheDocument();
  });

  test("입력한 금액이 1000의 배수인 양의 정수가 아닌 경우 폼이 제출되지 않는다.", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    const moneyInput = document.querySelector(".money__input");
    moneyInput.value = -10010;

    const moneySubmit = document.querySelector(".money__submit");
    moneySubmit.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const mainContainerBody = document.querySelector(".main__container__body");

    expect(alertMock).toHaveBeenCalledTimes(0);
    expect(mainContainerBody.children.length).toBe(1);
  });

  test("입력한 금액이 10000원인 경우 총 10개의 구입한 로또를 출력하고 당첨 번호 입력 폼이 출력된다.", async () => {
    const moneyInput = document.querySelector(".money__input");
    moneyInput.value = 10000;

    const moneySubmit = document.querySelector(".money__submit");
    moneySubmit.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const purchasedLottosParagraph =
      screen.getByText("총 10개를 구매하였습니다.");
    const purchasedLottos = document.querySelectorAll(".purchased-lotto");
    expect(purchasedLottosParagraph).toBeInTheDocument();
    expect(purchasedLottos.length).toBe(10);

    const winningNumberAndBonusForm = screen.getByText("지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.");
    expect(winningNumberAndBonusForm).toBeInTheDocument();
  });

  test("중복되는 로또 번호를 입력하는 경우 Alert가 표시되고 입력폼이 초기화 된다.", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    const moneyInput = document.querySelector(".money__input");
    moneyInput.value = 1000;

    const moneySubmit = document.querySelector(".money__submit");
    moneySubmit.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const orders = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

    orders.forEach((order) => {
      const input = document.querySelector(`.winning-number__${order}__input`);
      if(input) input.value = 1;
    });

    const winningNumberSixthInput = document.querySelector(
      ".winning-number__sixth__input",
    );
    winningNumberSixthInput.value = 1;

    const bonusNumberInput = document.querySelector(".bonus-number__input");
    bonusNumberInput.value = 1;

    const submitButton = document.querySelector(
      ".winning-number-and-bonus__submit",
    );
    submitButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(alertMock).toHaveBeenCalled();

    orders.forEach((order) => {
      const input = document.querySelector(`.winning-number__${order}__input`);
      if(input) expect(input.value).toBe("");
    });

    expect(document.querySelector(".bonus-number__input").value).toBe("");
  });

  test("입력한 금액이 1000원이고 1개의 로또가 1등에 당첨된 경우 수익률은 200000000.0%이다.", async () => {
    const moneyInput = document.querySelector(".money__input");
    moneyInput.value = 1000;

    const moneySubmit = document.querySelector(".money__submit");
    moneySubmit.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const winningNumbers = [1,2,3,4,5,6,7];

    const orders = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

    orders.forEach((order) => {
      const input = document.querySelector(`.winning-number__${order}__input`);
      if(input) input.value = winningNumbers.shift();
    });

    const bonusNumberInput = document.querySelector(".bonus-number__input");
    bonusNumberInput.value = winningNumbers.shift();

    const submitButton = document.querySelector(
      ".winning-number-and-bonus__submit",
    );
    submitButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const element = screen.getByText("당신의 총 수익률은 200000000.0%입니다.");
    expect(element).toBeInTheDocument();
  });

  test("결과창에서 닫고 다시 열수 있다.", async () => {
    const moneyInput = document.querySelector(".money__input");
    moneyInput.value = 1000;

    const moneySubmit = document.querySelector(".money__submit");
    moneySubmit.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const winningNumbers = [1,2,3,4,5,6,7];
    
    const orders = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

    orders.forEach((order) => {
      const input = document.querySelector(`.winning-number__${order}__input`);
      if(input) input.value = winningNumbers.shift();
    });

    const bonusNumberInput = document.querySelector(".bonus-number__input");
    bonusNumberInput.value = winningNumbers.shift();

    const submitButton = document.querySelector(
      ".winning-number-and-bonus__submit",
    );
    submitButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const closeButton = document.querySelector(".close__button");
    closeButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.querySelector('.overlay')?.classList).toContain('hidden');

    const showResultButton = document.querySelector(".show-result__button");
    showResultButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.querySelector('.overlay')?.classList).not.toContain('hidden');
  });

  test("결과창에서 다시 시작하기를 누른 경우 금액 입력 폼을 제외한 나머지 요소들이 사라진다.", async () => {
    const moneyInput = document.querySelector(".money__input");
    moneyInput.value = 1000;

    const moneySubmit = document.querySelector(".money__submit");
    moneySubmit.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const winningNumbers = [1,2,3,4,5,6,7];
    
    const orders = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

    orders.forEach((order) => {
      const input = document.querySelector(`.winning-number__${order}__input`);
      if(input) input.value = winningNumbers.shift();
    });

    const bonusNumberInput = document.querySelector(".bonus-number__input");
    bonusNumberInput.value = winningNumbers.shift();

    const submitButton = document.querySelector(
      ".winning-number-and-bonus__submit",
    );
    submitButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const retryButton = document.querySelector(".retry__button");
    retryButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const mainContainerBody = document.querySelector(".main__container__body");
    expect(mainContainerBody.children.length).toBe(1);

    const element = screen.getByText("구입할 금액을 입력해주세요.");
    expect(element).toBeInTheDocument();
  });
});
