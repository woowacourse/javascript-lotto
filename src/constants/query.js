import LOTTO_GAME from './lottoGame.js';

const QUERY = {
  LOTTO_PRICE: '구입금액을 입력해 주세요.(공백은 포함하지 않습니다) ',
  LUCKY_NUMBERS: '당첨 번호를 입력해 주세요.(ex. "1,2,3,4,5,6" 혹은 "1, 2, 3, 4, 5, 6"형식) ',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.(공백은 포함하지 않습니다) ',
  RETRY: `다시 시작하시겠습니까? (${LOTTO_GAME.RETRY}/${LOTTO_GAME.QUIT}) `,
};

export default QUERY;
