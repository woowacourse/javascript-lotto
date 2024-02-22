import { PRIZE } from "../domain/calculateTotalPrize.js";
import { print } from "../utils/console.js";

const MESSAGES = {
  count: (count) => `${count}개를 구매했습니다.`,
  borderLine: "--------------------",
  matchResult: "당첨 통계",
  profitRate: (rate) => `총 수익률은 ${rate}입니다.`,
  matchReference: ({ matchCount, prize, rank }) => `${matchCount}개 일치 (${prize}원) - ${rank}개`, // TODO: 리펙이 필요하다.
  bonusMatchReference: ({ matchCount, prize, rank }) => `${matchCount}개 일치, 보너스 볼 일치 (${prize}원) - ${rank}개`, // TODO: 리펙이 필요하다.
  lotto: (numbers) => `[ ${numbers.join(", ")} ]`,
};

// TODO: 메서드를 묶어놓은 객체의 이름을 카멜케이스로 지어야하나요, 파스탈로 지어야하나요?
const OutputView = {
  printLotto(lotto) {
    print(MESSAGES.lotto(lotto));
  },

  printLottoCount(count, lottos) {
    print(MESSAGES.count(count));
    lottos.forEach((lotto) => print(MESSAGES.lotto(lotto)));
  },

  printMatchResultTitle() {
    print(MESSAGES.matchResult);
    print(borderLine);
  },

  printProfitRate(rate) {
    print(MESSAGES.profitRate(rate));
  },

  // TODO: 리펙토링 해야한다.
  printMatchCount(rank, i) {
    if (i < PRIZE.length - 2) {
      print(MESSAGES.matchReference({ matchCount: i + 3, prize: PRIZE[i], rank })); // 보통
    } else if (i === PRIZE.length - 2) {
      print(MESSAGES.bonusMatchReference({ matchCount: i + 3, prize: PRIZE[i], rank })); // 보너스
    } else if (i === PRIZE.length - 1) {
      print(MESSAGES.matchReference({ matchCount: i + 2, prize: PRIZE[i], rank })); // 1등
    }
  },

  printMatchCounts(ranks) {
    ranks.forEach((rank, i) => this.printMatchCount(rank, i));
  },
};

export default OutputView;
