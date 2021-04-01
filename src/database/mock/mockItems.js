const { createItem } = require('../services/items-service');
const Item = require('../schemas/item');

const mockObjects = [{
  itemTitle: 'desk',
  itemDescription: 'a very beautiful desk',
  itemImages: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1536&q=80'],
  itemCategory: 'furniture',
  itemOwner: '00ug773uv5onWq24i5d6',
},
{
  itemTitle: 'Harry Potter',
  itemDescription: 'old version of Harry Potter',
  itemImages: [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80'],
  itemCategory: 'books',
  itemOwner: '00ug773uv5onWq24i5d6',
},
{
  itemTitle: 'jacket',
  itemDescription: 'nice jacket',
  itemImages: [
    'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=801&q=80',
  ],
  itemCategory: 'clothes',
  itemOwner: '00ug773uv5onWq24i5d6',
}];

/* eslint-disable no-console */
const populateDatabase = async () => {
  await Item.deleteMany();
  await Promise.all(mockObjects.map(createItem));
  console.log('Mock items created');
};

module.exports = { populateDatabase };
