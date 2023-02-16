const parseToNumberTypeArray = (input) => {
  const resultData = input.split(',').map((data) => Number(data));
  return resultData;
};

export default parseToNumberTypeArray;
