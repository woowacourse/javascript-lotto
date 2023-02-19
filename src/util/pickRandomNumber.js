const pickRandomNumber = (maxRange) => {
  const randomNumber = Math.ceil(Math.random() * maxRange);

  return randomNumber;
};

export default pickRandomNumber;
