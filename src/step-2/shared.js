export const shared = {
  createInput(attr) {
    const input = document.createElement('input');
    const baseAttributes = {
      type: 'text',

    };
    Object.entries(attr).forEach(([key, value]) => {
      input[key] = value;
    });
    return input;
  },
};
