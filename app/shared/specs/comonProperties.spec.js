import {comonProperties} from '../comonProperties';

describe('comonProperties', () => {
  let templates = [
    {_id: '1', properties: [
      {_id: 1, name: 'author', filter: false, type: 'text'},
      {_id: 2, name: 'country', filter: true, type: 'select', content: 'abc1'},
      {_id: 3, name: 'date', filter: true, type: 'text'},
      {_id: 4, name: 'language', filter: true, type: 'text'}
    ]},
    {_id: '2', properties: [
      {_id: 7, name: 'author', filter: false, type: 'text'},
      {_id: 8, name: 'country', filter: true, type: 'select', content: 'abc1'},
      {_id: 9, name: 'language', filter: false, type: 'text', required: true}
    ]},
    {_id: '3', properties: [
      {_id: 12, name: 'author', filter: false, type: 'markdown'},
      {_id: 13, name: 'country', filter: true, type: 'text'}
    ]}
  ];

  let thesauris = [{_id: 'abc1', values: [{id: 1, value: 'value1'}, {id: 2, value: 'value2'}]}];

  describe('comonProperties()', () => {
    describe('When only one documentType is selected', () => {
      it('should return all its fields with thesauri options', () => {
        let documentTypes = ['1'];
        let filters = comonProperties(templates, documentTypes, thesauris);
        expect(filters)
        .toEqual([
          {name: 'author', filter: false, type: 'text', commonIds: [1]},
          {name: 'country', filter: true, type: 'select', content: 'abc1', commonIds: [2]},
          {name: 'date', filter: true, type: 'text', commonIds: [3]},
          {name: 'language', filter: true, type: 'text', commonIds: [4]}
        ]);
      });
    });

    describe('When more than one documentType is selected', () => {
      it('should return all fields that are in the selected templates selecting those that are required', () => {
        let documentTypes = ['1', '2'];
        let filters = comonProperties(templates, documentTypes);
        expect(filters).toEqual([
          {name: 'author', filter: false, type: 'text', commonIds: [1, 7]},
          {name: 'country', filter: true, type: 'select', content: 'abc1', commonIds: [2, 8]},
          {name: 'language', filter: false, type: 'text', required: true, commonIds: [4, 9]}
        ]);
      });

      describe('when none match', () => {
        it('should return none', () => {
          let documentTypes = ['1', '2', '3'];
          let filters = comonProperties(templates, documentTypes);
          expect(filters).toEqual([]);
        });
      });
    });
  });
});
