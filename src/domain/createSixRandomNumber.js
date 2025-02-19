const createSixRandomNumber = () => {
  const randomValue = [];
  for (let i = 0; i < 6; i++) {
    randomValue.push(Math.floor(Math.random() * 45) + 1);
  }
  return randomValue;
};

export default createSixRandomNumber;
