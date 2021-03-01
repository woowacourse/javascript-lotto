import reducer from "../reducer/index.js";

const initialState = {
  lottos: [],
  winningNumber: { numbers: [], bonusNumber: 0 },
};

/**
 * closure 및 인자로 넘겨받는 hasStateChanged함수를 활용하여 과거의 state와 현재의 state를 비교 후, state가 변한 경우에는 handleStateChange를 호출한다.
 * handleStateChange: [function type] (previousState) => { }
 *                  : state가 변했을때(hasStateChanged 함수가 true를 반환하였을 때) 호출된다.
 * select           : [function type] (state) => { return state.[property] }
 *                  : state 중 변경을 탐지할 프라퍼티를 반환하는 함수
 * hasStateChanged  : [function type] (previousState, currentState) => { return [boolean type] }
 *                  : 반환값이 true 일 때 state가 변한 것으로 보아 handleStateChange를 호출한다.
 *                  : false를 반환한 경우에는 state가 변하지 않은 것으로 보아 handleStateChange를 호출하지 않는다.
 *                  : Default value는 shallow-copy를 이용하여 state변경을 판단한다.
 */
const attachStateWatcher = (
  handleStateChange,
  select,
  hasStateChanged = (prev, curr) => select(prev) !== select(curr)
) => {
  if (typeof handleStateChange !== "function" || typeof select !== "function") {
    throw new TypeError(
      `[store] [attachStateWatcher] handleStateChange: ${handleStateChange} select: ${select} handleStateChange와 select는 function type이어야 합니다.`
    );
  }

  let currentState = store.getState();
  if (select(currentState) === "undefined") {
    throw new Error(
      "[store] [attachStateWatcher] select(state)는 undefined를 반환해서는 안됩니다."
    );
  }

  return () => {
    const previousState = currentState;
    currentState = store.getState();

    if (hasStateChanged(previousState, currentState)) {
      handleStateChange(select(previousState));
    }
  };
};

const createStore = (reducer, initialState) => {
  let state = initialState;
  let listeners = [];

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener();
    });
  };

  const subscribe = (handleStateChange, hasStateChanged) => {
    const listener = attachStateWatcher(handleStateChange, hasStateChanged);
    listeners.push(listener);
  };

  return { getState, dispatch, subscribe };
};

const store = createStore(reducer, initialState);

export default store;
