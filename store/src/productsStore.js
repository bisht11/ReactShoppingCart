//  products dummy data (temporary)

////////////////////////////////////// Stripe API price id(s) //////////////////////////////////////////////////

// Wired Earphones : price_1MFjQASBj8IBTa4Qjzl8wf1w
// Hat : price_1MFjRqSBj8IBTa4QmcrimK5m
// Tiffin Box : price_1MFjSxSBj8IBTa4QxnlRELDD

const productsArray = [
  {
    id: "price_1MFjQASBj8IBTa4Qjzl8wf1w",
    title: "Wired Earphones",
    price: "1000",
  },
  {
    id: "price_1MFjRqSBj8IBTa4QmcrimK5m",
    title: "Hat",
    price: "450",
  },
  {
    id: "price_1MFjSxSBj8IBTa4QxnlRELDD",
    title: "Tiffin Box",
    price: "680",
  },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);
  if (productData === undefined) {
    console.log("Product data does not exist for id: " + id);
    return undefined; //extra feature
  }

  return productData;
}

export { productsArray, getProductData };
