#!/bin/bash

echo -e "\n\nDeleting ${1:-uwazi_development} database"
mongo -host ${2:-127.0.0.1} ${1:-uwazi_development} --eval "db.dropDatabase()"
mongorestore -h ${2:-127.0.0.1} blank_state/uwazi_development/ --db=${1:-uwazi_development} 

echo "Restoring pdfs..."
rm -f ../uploaded_documents/*.pdf
cp ./uploaded_documents/*.pdf ${2:-..}/uploaded_documents/

echo "Indexing into ElasticSearch..."
node reindex_elastic.js
