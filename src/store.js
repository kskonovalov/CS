import { createStore, compose } from 'redux';

import rootReducer from './reducers';

const initialState = {
  title: 'Home',
  filter: '',
  search: ''
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers();

const initializeStore = (preloadedState = initialState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default initializeStore;
