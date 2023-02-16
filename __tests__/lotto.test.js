import { LottoGame } from "../src/domain/LottoGame";
import { getAscendingSortedNumbers } from "../src/util/sort";

const lottoGame = new LottoGame();

test("1 ~ 45 사이의 난수를 중복되지 않게 6개 생성한다.", () => {
  const lottoTicket = lottoGame.makeLottoTicket();

  expect(new Set(lottoTicket).size).toBe(6);
});

test("로또 구입 금액 / 1000 만큼 로또를 발행한다.", () => {
  const numberOfTickets = 5;

  const lottoTickets = lottoGame.makeLottoTickets(numberOfTickets);

  expect(lottoTickets.length).toBe(numberOfTickets);
});

test("오름차순으로 로또 번호를 정리한다.", () => {
  const lottoTicket = [4, 5, 6, 1, 2, 3];

  expect(getAscendingSortedNumbers(lottoTicket)).toEqual([1, 2, 3, 4, 5, 6]);
});

test.each([
  [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 6],
  [[1, 2, 11, 12, 13, 14], [1, 2, 3, 4, 5, 6], 2],
  [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], 0],
])(
  "사용자가 구매한 로또 번호(%p)와 당첨 번호(%p)를 비교해서 같은 번호의 개수(%i)를 반환한다.",
  (lottoTicket, winningLottoNumbers, expected) => {
    expect(lottoGame.getNumberOfMatchingLottoNumbers(lottoTicket, winningLottoNumbers)).toBe(
      expected
    );
  }
);

test.each([
  [5000, 5000, 100.0],
  [150000, 3000, 5000.0],
  [5000, 30000, 16.7],
  [0, 5000, 0],
])(
  "로또 수익률을 반환한다 (총 당첨금: %i, 총 로또 구입 금액: %i, 수익률: %i).",
  (totalPrize, purchaseAmount, expected) => {
    expect(lottoGame.getRateOfReturn(totalPrize, purchaseAmount)).toBe(expected);
  }
);
