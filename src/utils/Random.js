export function shuffle(numbers) {
  return numbers.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
