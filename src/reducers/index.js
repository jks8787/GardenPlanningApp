import { combineReducers } from 'redux';
import gardenLayouts from './gardenLayouts';
import visibilityFilter from './visibilityFilter';

const appReducer = combineReducers({
  gardenLayouts,
  visibilityFilter
});

export default appReducer;
