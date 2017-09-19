import conversor from '../elasticConversor';

fdescribe('elasticConversor', () => {
  describe('docsToElastic', () => {
    it('should rename all metadata properties with the id of the template property', () => {
      const docs = [{
        _id: 1,
        template: 1,
        metadata: {property1: 'value1', property2: 'value2', property3: 'value3'}
      }, {
        _id: 1,
        template: 2,
        metadata: {property4: 'value4', property5: 'value5', property6: 'value6'}
      }];

      const templates = [{
        _id: 1,
        properties: [{_id: 'property1ID', name: 'property1'}, {_id: 'property2ID', name: 'property2'}, {_id: 'property3ID', name: 'property3'}]
      }, {
        _id: 2,
        properties: [{_id: 'property4ID', name: 'property4'}, {_id: 'property5ID', name: 'property5'}, {_id: 'property6ID', name: 'property6'}]
      }];

      const converted = conversor.docsToElastic(docs, templates);

      expect(converted).toEqual([{
        _id: 1,
        template: 1,
        metadata: {property1ID: 'value1', property2ID: 'value2', property3ID: 'value3'}
      }, {
        _id: 1,
        template: 2,
        metadata: {property4ID: 'value4', property5ID: 'value5', property6ID: 'value6'}
      }]);
    });
  });

  describe('docToElastic', () => {
    it('should rename all metadata properties with the id of the template property', () => {
      const doc = {
        _id: 1,
        template: 1,
        metadata: {property1: 'value1', property2: 'value2', property3: 'value3'}
      };
      const template = {
        _id: 1,
        properties: [{_id: 'property1ID', name: 'property1'}, {_id: 'property2ID', name: 'property2'}, {_id: 'property3ID', name: 'property3'}]
      };

      const converted = conversor.docToElastic(doc, template);

      expect(converted).toEqual({
        _id: 1,
        template: 1,
        metadata: {property1ID: 'value1', property2ID: 'value2', property3ID: 'value3'}
      });
    });
  });
});
