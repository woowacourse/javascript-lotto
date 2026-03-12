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

    // 금액 입력 후 구입 버튼 누르기
    const priceInput = document.querySelector("#price input");
    const buyButton = document.querySelector("#buy-button");

    priceInput.value = 2000;
    buyButton.click();

    // 결과 확인: 로또 구매 개수
    const amountText = document.querySelector("#amount-text");
    expect(amountText.textContent).toBe("총 2개를 구매하였습니다.");

    // 결과 확인: 번호 확인
    const lottoList = document.querySelector("#lotto-list");
    const lottoListItem = lottoList.querySelectorAll("li");
    lottoListItem.forEach((lottoList, i) => {
      expect(lottoList.textContent).toBe(
        `🎟️ ${lottoListNumbers[i].join(", ")}`,
      );
    });

    // 당첨 번호 입력
    const winningNumbers = [1, 2, 3, 7, 8, 9];

    const winningLottos = document.querySelector("#winning-lottos");
    const winningLottosPin = winningLottos.querySelectorAll(".ui-pin");

    winningLottosPin.forEach((winningLottoPin, i) => {
      winningLottoPin.querySelector("input").value = winningNumbers[i];
    });

    // 보너스 번호 입력
    const bonusNumber = 20;

    const bonusLottoPin = document.querySelector("#bonus-lotto");
    bonusLottoPin.querySelector("input").value = bonusNumber;

    // 결과 확인하기 버튼 클릭
    const resultButton = document.querySelector("#result-button");
    resultButton.click();

    // 결과 학인: 당첨 통계
    const staticstic = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
      0: 0,
    };

    const resultStaticstic = document.querySelector("#result-staticstic");
    resultStaticstic.querySelectorAll("tbody tr").forEach((tr, i) => {
      // 5등 부터 보여줌
      const grade = 5 - i;
      const lastTd = tr.querySelector("td:last-child");

      expect(lastTd.textContent).toBe(`${staticstic[grade]}개`);
    });

    // 결과 학인: 수익률
    const rate = 250;
    const rateText = document.querySelector("#rate-text");

    expect(rateText.textContent).toBe(`당신의 총 수익률은 ${rate}%입니다.`);
  });
});
