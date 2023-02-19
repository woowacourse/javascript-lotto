const toNumberFormatOfKor = (number, decimalPlaces) => {
  number = number.toFixed(decimalPlaces);
  const [integer, decimal] = number.split('.');

  return `${Number(integer).toLocaleString('ko-KR')}.${decimal}`;
};

export default toNumberFormatOfKor;
