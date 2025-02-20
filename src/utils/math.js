export const getRevenueRate = (revenue, cost) => {
  if (typeof revenue !== "number" || typeof cost !== "number") {
    throw new Error("인자가 숫자가 아닙니다.");
  }

  return (revenue / cost) * 100;
};
