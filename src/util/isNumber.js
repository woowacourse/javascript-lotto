export default function isNumber(input) {
  if (Number.isNaN(Number(input))) {
    throw new Error('Invalid input: must be a valid number');
  }
  return Number(input);
}
