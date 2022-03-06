export function shuffle(array) {
  const copy = [...array];
  copy.sort(() => Math.random() - 0.5);
  return [...copy];
}
