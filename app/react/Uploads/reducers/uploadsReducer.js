import Immutable from 'immutable';

import * as types from 'app/Uploads/actions/actionTypes';

const initialState = [];

export default function documents(state = initialState, action = {}) {
  if (action.type === types.SET_UPLOADS) {
    return Immutable.fromJS(action.documents);
  }

  if (action.type === types.ELEMENT_CREATED) {
    return state.push(Immutable.fromJS(action.doc)).sort((a, b) => b.get('creationDate') - a.get('creationDate'));
  }

  if (action.type === types.ELEMENTS_CREATED) {
    return action.docs.reduce((_state, doc) => {
      return _state.push(Immutable.fromJS(doc));
    }, state)
    .sort((a, b) => b.get('creationDate') - a.get('creationDate'));
  }

  if (action.type === types.UPLOAD_COMPLETE) {
    return state.update(state.findIndex(doc => doc.get('sharedId') === action.doc), (doc) => doc.set('uploaded', true));
  }

  if (action.type === types.UPDATE_DOCUMENT) {
    return state.update(state.findIndex(doc => doc.get('sharedId') === action.doc.sharedId), (doc) => doc.merge(Immutable.fromJS(action.doc)));
  }

  if (action.type === types.UPDATE_DOCUMENTS) {
    return action.docs.reduce((_state, doc) => {
      const docIndex = state.findIndex(_doc => {
        return _doc.get('_id') === doc._id;
      });

      return _state.set(docIndex, Immutable.fromJS(doc));
    }, state);
  }

  if (action.type === types.CONVERSION_COMPLETE) {
    const index = state.findIndex(doc => doc.get('sharedId') === action.doc);
    return index >= 0 ? state.update(index, (doc) => doc.set('processed', true)) : state;
  }

  if (action.type === types.MOVED_TO_LIBRARY) {
    return state.delete(state.findIndex(doc => doc.get('_id') === action.id));
  }

  if (action.type === types.ELEMENT_DELETED) {
    return state.delete(state.findIndex(doc => doc.get('_id') === action.id));
  }

  return Immutable.fromJS(state);
}
