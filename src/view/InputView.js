import Console from '../util/Console.js';
import Validator from '../util/Validator.js';

const LOTTO_SIZE = 6;
const SEPARATOR = ',';
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

const INPUT_MONEY = '> 구입금액을 입력해 주세요.';
const INPUT_WINNING_NUMBERS = '> 당첨 번호를 입력해 주세요.';
const INPUT_BONUS_NUMBER = '> 보너스 번호를 입력해 주세요.';
const ERROR_BASE_10 = '[ERROR] 십진법이 아니에요 ㅠㅠ';
const ERROR_MONEY_RANGE = '[ERROR] 로또 구매 금액은 1000원 이상만 가능해요. 그런데 너무 큰 숫자는 제게 버겁습니다.';

const ERROR_LOTTO_COUNT = '[ERROR] 어머! 로또 숫자가 6개가 아니에요! ㅠㅠ';
const ERROR_LOTTO_DUPLICATED = '[ERROR] 숫자가 중복되었습니다.';
const ERROR_LOTTO_IN_RANGE = '[ERROR] 로또숫자는 1부터 45까지입니다.';

const InputView = {
  async readMoney() {
    const input = await Console.question(INPUT_MONEY);
    if (!Validator.isBase10(input)) throw new Error(ERROR_BASE_10);
    if (!Validator.isNumberInRange(1000, Number.MAX_SAFE_INTEGER)(input)) {
      throw new Error(ERROR_MONEY_RANGE);
    }
    return Number(input);
  },

  async readWinningNumbers() {
    const input = await Console.question(INPUT_WINNING_NUMBERS);
    const winningNumbers = input.split(SEPARATOR).map((number) => number.trim());

    if (!winningNumbers.every(Validator.isBase10)) {
      throw new Error(ERROR_BASE_10);
    }

    if (!Validator.isArrayLengthEqual(winningNumbers, LOTTO_SIZE)) {
      throw new Error(ERROR_LOTTO_COUNT);
    }

    if (Validator.hasDuplication(winningNumbers)) {
      throw new Error(ERROR_LOTTO_DUPLICATED);
    }

    if (!winningNumbers.every(Validator.isNumberInRange(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER + 1))) {
      throw new Error(ERROR_LOTTO_IN_RANGE);
    }

    return winningNumbers.map(Number);
  },

  async readBonusNumber(winningNumbers) {
    const input = await Console.question(INPUT_BONUS_NUMBER);
    if (!Validator.isBase10(input)) throw new Error(ERROR_BASE_10);
    if (!Validator.isNumberInRange(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER + 1)(input)) {
      throw new Error(ERROR_MONEY_RANGE);
    }
    if (winningNumbers.include(Number(input))) {
      throw new Error(ERROR_LOTTO_DUPLICATED);
    }
    return Number(input);
  },
};

export default InputView;
