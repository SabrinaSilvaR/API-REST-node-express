const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');



class ProductsServices {

  constructor() {
    this.products = []
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBock: faker.datatype.boolean()
      });
    };
  };

  async created(data) {
    const newProducts = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProducts)
    return newProducts;

  };

  async find() {
    return this.products
  };

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBock) {
      throw boom.conflict('product is blocked');
    }
    return product;
  };

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    };
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]; 
  };

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1)
    return { id }
  };
};

module.exports = ProductsServices
