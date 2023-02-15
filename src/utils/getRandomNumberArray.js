const getRandomNumberArray = (length) => {
  const set = new Set();
  while (set.size < length) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    set.add(randomNumber);
  }

  return [...set].sort((a, b) => a - b);
};

export default getRandomNumberArray;
