export const isDuplicate = (nums) => {
  return new Set(nums).size !== nums.length;
};
