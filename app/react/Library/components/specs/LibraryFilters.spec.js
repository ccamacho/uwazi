import React from 'react';
import {shallow} from 'enzyme';
import Immutable from 'immutable';

import {LibraryFilters, mapStateToProps} from 'app/Library/components/LibraryFilters';

describe('LibraryFilters', () => {
  let component;
  let templates;
  let props;

  beforeEach(() => {
    templates = [{name: 'Decision'}, {name: 'Ruling'}];
    props = {
      templates,
      documentTypes: {},
      searchTerm: 'Bruce Wayne',
      form: {isBatman: {value: true}},
      searchDocuments: jasmine.createSpy('searchDocuments')
    };
    component = shallow(<LibraryFilters {...props} />);
  });

  describe('Apply Filters', () => {
    it('should do a searchDocuments action with the searchTerm and the form values', () => {
      component.find('.apply-filters').simulate('click');
      expect(props.searchDocuments).toHaveBeenCalledWith('Bruce Wayne', {isBatman: true});
    });
  });

  it('should render a checkbox to filter for all types and one for each document type', () => {
    let docs = component.find('input[type="checkbox"]');
    expect(docs.length).toBe(3);
  });

  describe('maped state', () => {
    it('should contain the filters store and the filters form', () => {
      let store = {
        library: {
          filters: Immutable.fromJS({properties: 'filters state'}),
          ui: Immutable.fromJS({searchTerm: 'Zerg Rush'})
        },
        form: {filters: {name: 'redux-form'}}
      };
      let state = mapStateToProps(store);
      expect(state).toEqual({properties: 'filters state', form: {name: 'redux-form'}, searchTerm: 'Zerg Rush'});
    });
  });
});