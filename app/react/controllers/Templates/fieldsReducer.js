import Immutable from 'immutable';
const initialState = Immutable.fromJS([]);
import * as types from './actionTypes';

export default function fields(state = initialState, action = {}) {
  if (action.type === types.ADD_FIELD) {
    return state.insert(action.index, Immutable.fromJS(action.config));
  }

  if (action.type === types.UPDATE_PROPERTY) {
    return state.set(action.index, Immutable.fromJS(action.config));
  }

  if (action.type === types.REMOVE_FIELD) {
    return state.delete(action.index);
  }

  if (action.type === types.REORDER_PROPERTY) {
    let newState = state.delete(action.originIndex);
    return newState.insert(action.targetIndex, state.get(action.originIndex));
  }

  return state;
}