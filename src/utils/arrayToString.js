export const arrayToString = (arrays) => {
  return arrays.reduce((acc, cur) => {
    acc.push(`[${cur.join(', ')}]`);
    return acc;
  }, []);
};
