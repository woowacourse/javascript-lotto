export default function parseStringToNumber(strings) {
  const stringToNumbers = strings.split(',').map((str) => {
    return Number(str);
  });
  return stringToNumbers;
}
