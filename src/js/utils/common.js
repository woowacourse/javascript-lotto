const convertToNum = value => Number(value);

const convertValueToString = list => list.map(el => el.value).join(',');

export { convertToNum, convertValueToString };
