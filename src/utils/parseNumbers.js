const parseNumbers = (numbersText, separator) => {
  return numbersText.split(separator).map(number => parseInt(number.trim(), 10));
};

export default parseNumbers;
