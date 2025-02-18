export default function pickNumberInList(min, max, length) {
  return Array.from({
    length,
  }).map(() => Math.floor(Math.random() * max + 1) + min);
}
