const generateRandomNumber = (max, count) => {
  const lottoNumbers = new Array(max).fill().map((_, index) => index + 1);

  return () => {
    lottoNumbers.sort(() => Math.random() - 0.5);
    return lottoNumbers.slice(0, count);
  };
};

export default generateRandomNumber;
