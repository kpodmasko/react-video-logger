import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSageMiddleware from "redux-saga";

import rootReducer from "@reducers";
import rootSaga from "@sagas";

const composeEnhancers = composeWithDevTools({
  trace: true,
  shouldCatchErrors: true,
});

const sagaMiddleware = createSageMiddleware();

// TODO: enable typescript
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
