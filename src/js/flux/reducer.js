export const PURCHASE_LOTTO = 'purchase-lotto';

export function reducer(state, { type, payload }) {
  const newState = { ...state };
  switch (type) {
    case PURCHASE_LOTTO:
      newState.money = payload;
      break;
    default:
      break;
  }

  return newState;
}
