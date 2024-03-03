export const readInput = (target) => {
  const input = target.getElementsByTagName("input");
  return [...input].map((el) => el.value);
};
