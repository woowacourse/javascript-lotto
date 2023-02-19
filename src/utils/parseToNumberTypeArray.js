const parseToNumberTypeArray = (input, str) => {
  const resultData = input.split(str).map((data) => Number(data));
  return resultData;
};

export default parseToNumberTypeArray;
