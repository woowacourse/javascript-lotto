import { changeToUpperSnakeCase } from '../utils';

test('카멜케이스의 문자열이 대문자 스네이크 케이스로 변환되는지 확인한다.', () => {
  const stringInput = 'stringInput';

  expect(changeToUpperSnakeCase(stringInput)).toBe('STRING_INPUT');
});
