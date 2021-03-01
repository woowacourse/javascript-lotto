import reducer from "../reducer/index.js";

const initialState = {
  lottos: [],
  winningNumber: { numbers: [], bonusNumber: 0 },
};

/**
 * closure 및 인자로 넘겨받는 hasStateChanged함수를 활용하여 과거의 state와 현재의 state를 비교 후, state가 변한 경우에는 handleStateChange를 호출한다.
 * handleStateChange: [function type] (previousState) => { }
 *                  : state가 변했을때(hasStateChanged 함수가 true를 반환하였을 때) 호출된다.
 * hasStateChanged  : [function type] (previousState, currentState) => { return [boolean type] }
 *                  : 반환값이 true 일 때 state가 변한 것으로 보아 handleStateChange를 호출한다.
 *                  : false를 반환한 경우에는 state가 변하지 않은 것으로 보아 handleStateChange를 호출하지 않는다.
 */
const attachStateWatcher = (handleStateChange, hasStateChanged) => {
  if (typeof handleStateChange !== "function") {
    throw new TypeError("handleStateChange는 function type이어야 합니다.");
  }

  if (typeof hasStateChanged !== "function") {
    throw new TypeError(
      "hasStateChanged는 (previousState, currentState) 두개의 인자를 받아 state가 다른 경우에 true를, state가 동일한 경우에 false를 반환하는 function type이어야 합니다."
    );
  }

  let currentState = store.getState();

  return () => {
    const previousState = currentState;
    currentState = store.getState();

    if (hasStateChanged(previousState, currentState)) {
      handleStateChange(previousState);
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
