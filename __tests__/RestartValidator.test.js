import Restart from '../src/domain/validator/Restart';

describe('로또 게임 재시작/종료 여부 입력 유효성 테스트', () => {
  test('재시작/종료 여부 입력 문자가 y/n이 아니라면 에러를 발생시킨다.', () => {
    const restartOption = '파슬리';

    expect(() => Restart.validateOptionCharacter(restartOption)).toThrow('[ERROR]');
  });
});
