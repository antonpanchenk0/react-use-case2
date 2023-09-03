import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import store, { store as exportedStore } from '../store';
import rootReducer from '../reducers/rootReducer';

describe('store', () => {

  it('should have been created using rootReducer', () => {
    const expectedStore = reduxCreateStore(rootReducer, applyMiddleware());
    expect(store.getState()).toEqual(expectedStore.getState());
  });

  it('should export a single store instance', () => {
    // Make sure that the store exported is always the same (singleton)
    expect(exportedStore).toBe(store);
  });

});
