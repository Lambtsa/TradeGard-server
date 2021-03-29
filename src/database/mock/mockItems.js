const { createItem } = require('../services/items-service');
const Item = require('../schemas/item');

const mockObjects = [{
  itemTitle: 'desk',
  itemDescription: 'a very beautiful desk',
  itemImages: ['https://unsplash.com/photos/3d4sSUChunA'],
  itemCategory: 'Furniture',
  itemOwner: 'Mina',
},
{
  itemTitle: 'Harry Potter',
  itemDescription: 'old version of Harry Potter',
  itemImages: ['https://unsplash.com/photos/CXYPfveiuis', 'https://unsplash.com/photos/xY55bL5mZAM'],
  itemCategory: 'Books',
  itemOwner: 'Oscar',
},
{
  itemTitle: 'jacket',
  itemDescription: 'nice jacket',
  itemImages: ['https://unsplash.com/photos/opJElA_rBNw'],
  itemCategory: 'Clothes',
  itemOwner: 'Tom',
}];

const populateDatabase = async () => {
  await Item.deleteMany();
  await Promise.all(mockObjects.map(createItem));
  console.log('Mock items created');
};

module.exports = { populateDatabase };
