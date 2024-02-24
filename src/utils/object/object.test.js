import { deepFreeze } from './object';

describe('deepFreeze 함수 테스트', () => {
  test('단일 레벨 객체가 동결되어야 한다', () => {
    // given
    const obj = { key: 'value' };

    // when
    const frozenObj = deepFreeze(obj);

    // then
    expect(Object.isFrozen(frozenObj)).toBeTruthy();
  });

  describe('다중 레벨 객체 동결 테스트', () => {
    // given
    const obj = {
      inner: { key: 'value' },
      anotherInner: { anotherKey: 'anotherValue' },
    };

    // when
    const frozenObj = deepFreeze(obj);

    // given
    const testCases = [
      { targetObjectName: 'inner', targetObject: frozenObj.inner },
      { targetObjectName: 'anotherInner', targetObject: frozenObj.anotherInner },
      { targetObjectName: 'anotherKey', targetObject: frozenObj.anotherKey },
    ];

    test.each(testCases)(
      '다중 레벨 객체 내 존재하는 $targetObjectName 객체는 동결 된다.',
      ({ targetObject }) => {
        // then
        expect(Object.isFrozen(targetObject)).toBeTruthy();
      },
    );

    test('배열 내의 객체도 깊게 동결되어야 한다', () => {
      // given
      const object = {
        array: [{ key: 'value' }, { key: 'value' }],
      };

      // when
      const frozenObjResult = deepFreeze(object);

      // then
      expect(
        Object.isFrozen(frozenObjResult) &&
          Object.isFrozen(frozenObjResult.array) &&
          Object.isFrozen(frozenObjResult.array[0]) &&
          Object.isFrozen(frozenObjResult.array[1]),
      ).toBeTruthy();
    });
  });
});
