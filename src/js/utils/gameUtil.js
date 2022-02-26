export function lottoNumberClosure() {
  const pickNumbers = shuffle([...new Array(45)].map((_, idx) => idx + 1));

  return () => pickNumbers.pop();
}

export function shuffle(array) {
  const copy = [...array];
  copy.sort(() => Math.random() - 0.5);
  return [...copy];
}
