const extractTemplateNameMapping = (template) => {
  let mapping = {};
  template.properties.forEach((property) => {
    mapping[template._id + property.name] = property._id;
  });
  return mapping;
};

const convertDocMetadata = (doc, mapping) => {
  const docMetadata = doc.metadata;
  doc.metadata = {};
  Object.keys(docMetadata).forEach((name) => {
    doc.metadata[mapping[doc.template + name]] = docMetadata[name];
  });
  return doc;
};

export default {
  docsToElastic(docs, templates) {
    const start = Date.now();
    let nameMappings = {};

    templates.forEach((template) => {
      Object.assign(nameMappings, extractTemplateNameMapping(template));
    });

    return docs.map((doc) => {
      return convertDocMetadata(doc, nameMappings);
    });
  },

  docToElastic(doc, template) {
    const nameMappings = extractTemplateNameMapping(template);
    return convertDocMetadata(doc, nameMappings);
  }
};
