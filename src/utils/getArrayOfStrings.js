export const getArrayOfStrings = (arrays) => {
  return arrays.reduce((acc, cur) => {
    acc.push(`[${cur.join(', ')}]`);
    return acc;
  }, []);
};
