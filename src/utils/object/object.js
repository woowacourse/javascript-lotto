/**
 * @param {object} object - 객체
 * @returns {object} 동결된 객체
 */
export const deepFreeze = (object) => {
  const propNames = Object.getOwnPropertyNames(object);

  propNames.forEach((name) => {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(object);
};
