import elasticConfig from 'api/config/elasticIndexes.js';
elasticConfig.index = elasticConfig.development;
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/uwazi_development', {useMongoClient: true});
import search from '../search.js';

const queries = [
  {order: 'desc', sort: 'metadata._ltima_actualizaci_n', types: ['58b2f3a35d59f31e1345b48a']},
  {order: 'desc', sort: 'metadata._ltima_actualizaci_n', types: ['58b2f3a35d59f31e1345b4b6']},
  {searchTerm: 'echos de la'},
  {searchTerm: 'corte'},
  {order: 'desc', searchTerm: 'victima', sort: 'metadata.fecha'},
  {order: 'asc', searchTerm: 'victima', sort: 'metadata.fecha'},
  {order: 'desc', searchTerm: 'victimas', sort: 'metadata.fecha', types: ['58b2f3a35d59f31e1345b48a']},
  {filters: {pa_s: {values: ['q223u6ha4zsq0k9']}}, order: 'desc', searchTerm: 'victima', sort: 'metadata.fecha', types: ['58b2f3a35d59f31e1345b4ac','58b2f3a35d59f31e1345b471','58b2f3a35d59f31e1345b482','58b2f3a35d59f31e1345b479']},
  {searchTerm: 'resolucion interamericana'},
  {order: 'desc', searchTerm: 'resolucion interamericana', sort: 'metadata.fecha'},
  {filters: {pa_s: {values: ['q223u6ha4zsq0k9']}}, order: 'desc', searchTerm: 'resolucion interamericana', sort: 'metadata.fecha', types: ['58b2f3a35d59f31e1345b4ac','58b2f3a35d59f31e1345b471','58b2f3a35d59f31e1345b482','58b2f3a35d59f31e1345b479']},
  {searchTerm: 'guatemala'},
  {order: 'desc', searchTerm: 'guatemala', sort: 'metadata.fecha'},
  {filters: {pa_s: {values: ['q223u6ha4zsq0k9']}}, order: 'desc', searchTerm: 'guatemala', sort: 'metadata.fecha', types: ['58b2f3a35d59f31e1345b4ac','58b2f3a35d59f31e1345b471','58b2f3a35d59f31e1345b482','58b2f3a35d59f31e1345b479']},
  {filters: {firmantes: {values: ['wbaxp4ebvu2z9f6r']}, pa_s: {values: ['q223u6ha4zsq0k9']}}, order: 'desc', searchTerm: 'guatemala', sort: 'metadata.fecha', types: ['58b2f3a35d59f31e1345b4ac','58b2f3a35d59f31e1345b471','58b2f3a35d59f31e1345b482','58b2f3a35d59f31e1345b479']}
];

Promise.all(queries.map((query, index) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      search.search(query, 'es')
      .then((r) => resolve(r));
    }, index * 1000);
  });
}))
.then((results) => {
  return results.reduce((t, r) => {
    console.log('took:', r.took, 'total hits:', r.totalRows);
    return t + r.took;
  }, 0) / results.length;
})
.then((total) => {
  console.log(total);
});
