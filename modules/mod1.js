module.exports.replaceTemplate = function (product, template) {
  let output = template
    .replaceAll(`{%IMAGE%}`, product.image)
    .replaceAll(`{%PRODUCTNAME%}`, product.productName)
    .replaceAll(`{%PRICE%}`, product.price)
    .replaceAll(`{%QUANTITY%}`, product.quantity)
    .replaceAll(`{%ID%}`, product.id)
    .replaceAll(`{%DESCRIPTION%}`, product.description)
    .replaceAll(`{%NUTRIENTS%}`, product.nutrients)
    .replaceAll(`{%FROM%}`, product.from);

  if (!product.organic)
    output = output.replaceAll(`{%NOT_ORGANIC%}`, "not-organic");

  return output;
};
