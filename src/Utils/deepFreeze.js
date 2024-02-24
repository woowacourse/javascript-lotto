/**
 * Object.freeze 는 얕은 동결로 인하여 객체 안의 객체에 대한 불변성을 완전히 보장해주진 못합니다.
 * deepFreeze 는 재귀를 통해 깊은 동결을 해주어서 불변성을 보장해줍니다.
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @param { object } object
 * @returns { object }
 */
const deepFreeze = (object) => {
  Object.keys(object).forEach((prop) => {
    if (typeof object[prop] === 'object' && !Object.isFrozen(object[prop])) {
      deepFreeze(object[prop]);
    }
  });
  return Object.freeze(object);
};

export default deepFreeze;
