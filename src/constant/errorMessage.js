import { SETTING } from './setting';

const PREFIX = '[ERROR]';
const SUFFIX = '다시 입력해주세요.';

const generateErrorMessage = (message) => `${PREFIX} ${message} ${SUFFIX}`;

const ERROR_MESSAGE = {
  INPUT_IS_EMPTY: generateErrorMessage('필수값입니다.'),
  INPUT_IS_NOT_NUMBER: generateErrorMessage('숫자로 입력해주셔야 합니다.'),
  PURCHASE_AMOUNT_NOT_DIVIDED: generateErrorMessage(`${SETTING.LOTTO_PRICE} 단위의 숫자여야 합니다.`),
  LOTTO_NUMBER_LENGTH: generateErrorMessage(`쉼표로 구분되는 ${SETTING.LOTTO_LENGTH}개의 숫자여야 합니다.`),
  LOTTO_NUMBER_RANGE: generateErrorMessage(
    `각각의 숫자는 ${SETTING.MIN_LOTTO_NUMBER}~${SETTING.MAX_LOTTO_NUMBER} 사이의 숫자여야 합니다.`,
  ),
  LOTTO_NUMBER_FORMAT: generateErrorMessage('각각의 당첨 번호는 숫자여야 합니다.'),
  LOTTO_NUMBER_DUPLICATED: generateErrorMessage('서로 중복되지 않는 숫자여야 합니다.'),
  BONUS_NUMBER_RANGE: generateErrorMessage(
    `보너스 번호는 ${SETTING.MIN_LOTTO_NUMBER}~${SETTING.MAX_LOTTO_NUMBER} 사이의 숫자여야 합니다.`,
  ),
  BONUS_NUMBER_FORMAT: generateErrorMessage('보너스 번호는 숫자여야 합니다.'),
  BONUS_NUMBER_DUPLICATED: generateErrorMessage('보너스 번호는 당첨 번호와 중복되지 않아야 합니다.'),
  RESTART_COMMAND_FORMAT: generateErrorMessage(
    `재시작 여부는 ${SETTING.RESTART_COMMAND} 또는 ${SETTING.EXIT_COMMAND}으로 입력하셔야 합니다.`,
  ),
};

export default ERROR_MESSAGE;
