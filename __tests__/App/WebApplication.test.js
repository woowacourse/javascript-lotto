import fs from "fs";
import path from "path";

import Random from "../../src/utils/Random.js";

import App from "../../src/App/WebApp.js";

const mockRandoms = (numbers) => {
  Random.randomArray = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.randomArray);
};

const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"));

describe("웹 로또 앱 테스트", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;

    const app = new App();
    app.run();
  });

  test("jsdom 테스트", async () => {
    const logo = document.querySelector(".logo");
    expect(logo.textContent.trim()).toBe("🎱 행운의 로또");
  });

  test("전체 웹 로또 시나리오 테스트", async () => {
    const lottoListNumbers = [
      [1, 2, 3, 4, 5, 6],
      [11, 12, 13, 14, 15, 16],
    ];

    mockRandoms(lottoListNumbers);

    const priceInput = document.querySelector("#price");
    const buyButton = document.querySelector("#buy-button");
    const amountText = document.querySelector("#amount-text");
    const lottoList = document.querySelector("#lotto-list");
    const lottoListItem = lottoList.querySelectorAll("li");
    const winningLottos = document.querySelector("#winning-lottos");
    const winningLottosPin = winningLottos.querySelectorAll(".ui-pin");
    const bonusLottoPin = document.querySelector("#bonus-lotto");
    const resultButton = document.querySelector("#result-button");
    const resultStaticstic = document.querySelector("#result-staticstic");
    const rateText = document.querySelector("#rate-text");

    priceInput.value = 2000;
    buyButton.click();

    expect(amountText.textContent).toBe("총 2개를 구매하였습니다.");

    lottoListItem.forEach((lottoList, i) => {
      expect(lottoList.textContent).toBe(
        `🎟️ ${lottoListNumbers[i].join(", ")}`,
      );
    });

    const winningNumbers = [1, 2, 3, 7, 8, 9];
    winningLottosPin.forEach((winningLottoPin, i) => {
      winningLottoPin.querySelector("input").value = winningNumbers[i];
    });

    const bonusNumber = 20;
    bonusLottoPin.querySelector("input").value = bonusNumber;

    resultButton.click();

    const staticstic = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
      0: 0,
    };
    resultStaticstic.querySelectorAll("tbody tr").forEach((tr, i) => {
      // 5등 부터 보여줌
      const grade = 5 - i;
      expect(tr.querySelector("td:last-child")).toBe(`${staticstic[grade]}개`);
    });

    const rate = 500;
    expect(rateText.textContent).toBe(`당신의 총 수익률은 ${rate}%입니다.`);
  });
});
