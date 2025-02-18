const generateLottoNumbers = () => {
  const randomNumbers = [];
  while (randomNumbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45);
    if (randomNumbers.includes(randomNumber)) continue;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};

export default generateLottoNumbers;
