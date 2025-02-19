/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import readLineAsync from "./readLineAsync.js";
import UserLottos from "./UserLottos.js";
import LottoManager from "./LottoManager.js";
import { printUserLottos } from "./output.js";

async function run() {
  const price = await readLineAsync("구입금액을 입력해 주세요.");
  const userLottos = new UserLottos(price);
  printUserLottos(userLottos);

  const winningNumbers = await readLineAsync("당첨 번호를 입력해 주세요.");
  const bonusNumber = await readLineAsync("보너스 번호를 입력해 주세요.");

  const lottoManager = new LottoManager(
    userLottos,
    winningNumbers,
    bonusNumber
  );
}
run();
