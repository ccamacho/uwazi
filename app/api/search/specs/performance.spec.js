import elasticConfig from 'api/config/elasticIndexes.js';
elasticConfig.index = elasticConfig.development;
import search from '../search.js';

const queries = [
  {searchTerm: 'echos de la'},
  {order: 'desc', searchTerm: 'victima', sort: 'metadata.fecha'},
  {searchTerm: 'corte'},
  {searchTerm: 'resolucion interamericana'},
  {order: 'asc', searchTerm: 'victima', sort: 'metadata.fecha'}
];

fdescribe('elasticsearch performance', () => {
  it('should not exceed an average of 200ms', (done) => {
    Promise.all(queries.map((query, index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          search.search(query, 'es')
          .then((r) => resolve(r));
        }, index * 1000);
      });
    }))
    .then((results) => {
      return results.reduce((t, r) => t + r.took, 0) / results.length;
    })
    .then((total) => {
      console.log(total);
      expect(total < 200).toBe(true);
      done();
    });
  }, 10000);
});
