// TODO: 상수 객체 안의 키는 대문자로 작성해야 할까?
// 사용하는 곳의 입장에서 소문자로 불러오는 코드를 보고 변수로 착각할 수 있을 것 같다.

export const INPUT_MESSAGES = Object.freeze({
  paymentAmount: '구입금액을 입력해 주세요.',
  winningLottoNumbers: '당첨 번호를 입력해 주세요. ',
  bonusNumber: '보너스 번호를 입력해 주세요. ',
  restart: '다시 시작하시겠습니까? (y/n) ',
});

export const OUTPUT_MESSAGES = Object.freeze({
  lottoTickets: '당첨 통계',
});

export const OUTPUT_MESSAGE_GENERATORS = {};

export const ERRORS = Object.freeze({});
