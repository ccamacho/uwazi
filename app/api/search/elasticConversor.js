const extractTemplateNameMapping = (template) => {
  let mapping = {};
  template.properties.forEach((property) => {
    mapping[template._id + property.name] = property._id;
  });
  return mapping;
};

const convertDocMetadata = (doc, mapping) => {
  if (!doc.metadata) {
    return doc;
  }
  const docMetadata = doc.metadata;
  doc.metadata = {};
  Object.keys(docMetadata).forEach((name) => {
    doc.metadata[mapping[doc.template + name]] = docMetadata[name];
  });
  return doc;
};

export default {
  docsToElastic(docs, templates) {
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
