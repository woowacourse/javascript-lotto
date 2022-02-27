export const getRandomInt = (min, max) => {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);

  return Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
};

export const getRandomList = (length, min, max) => {
  const randomList = [];

  while (randomList.length < length) {
    const randomInt = getRandomInt(min, max);
    if (!randomList.includes(randomInt)) {
      randomList.push(randomInt);
    }
  }

  return randomList;
};

export const $ = (selector) => document.querySelector(selector);
