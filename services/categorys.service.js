const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoryService {

  constructor() {
    this.categorys = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.categorys.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  };

  async created(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categorys.push(newCategory);
    return newCategory;
  };


  async find() {
    return this.categorys;

  };
  async findOne(id) {
    const category = this.categorys.find(items => items.id === id)
    if (!category) {
      throw boom.notFound('category not found');
    }
    if (category.isBlock) {
      throw boom.conflict('category is blocked');
    }
    return category;
  };
  async update(id, changes) {
    const index = this.categorys.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    const category = this.categorys[index];
    this.categorys[index] = {
      ...category,
      ...changes
    }
    return this.categorys[index];
  };

  async delete(id) {
    const index = this.categorys.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    this.categorys.splice(index, 1);
    return { id }
  };

};

module.exports = CategoryService;

