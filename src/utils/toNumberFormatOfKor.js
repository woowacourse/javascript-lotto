const toNumberFormatOfKor = (number, decimalPlaces = 0) => {
  number = number.toFixed(decimalPlaces);
  const [integer, decimal] = number.split('.');

  return `${Number(integer).toLocaleString('ko-KR')}${decimal ? '.' + decimal : ''}`;
};

export default toNumberFormatOfKor;
