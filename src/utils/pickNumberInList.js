export default function pickNumberInList(min, max) {
  const LENGTH = 6;
  return Array.from({
    length: LENGTH,
  }).map(() => Math.floor(Math.random() * (max - min + 1)) + min);
}
