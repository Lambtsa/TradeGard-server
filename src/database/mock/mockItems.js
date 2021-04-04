const { createItem } = require('../services/items-service');
const Item = require('../schemas/item');

const mockObjects = [{
  itemTitle: 'desk',
  itemDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  itemImages: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1536&q=80'],
  itemCategory: 'furniture',
  itemOwner: '00uhgcoq6XAUBJJ2r5d6',
},
{
  itemTitle: 'Harry Potter',
  itemDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  itemImages: [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80'],
  itemCategory: 'books',
  itemOwner: '00uhgcoq6XAUBJJ2r5d6',
},
{
  itemTitle: 'jacket',
  itemDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  itemImages: [
    'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=801&q=80',
  ],
  itemCategory: 'clothes',
  itemOwner: '00uhgcoq6XAUBJJ2r5d6',
},
{
  itemTitle: 'macbook',
  itemDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  itemImages: [
    'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1514&q=80',
  ],
  itemCategory: 'electronics',
  itemOwner: '00uhgcoq6XAUBJJ2r5d6',
},
{
  itemTitle: 'imac',
  itemDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  itemImages: [
    'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  ],
  itemCategory: 'electronics',
  itemOwner: '00uhgcoq6XAUBJJ2r5d6',
},
{
  itemTitle: 'bicycle',
  itemDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  itemImages: [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  ],
  itemCategory: 'hobbies',
  itemOwner: '00uhgcoq6XAUBJJ2r5d6',
}
];

/* eslint-disable no-console */
const populateDatabase = async () => {
  await Item.deleteMany();
  await Promise.all(mockObjects.map(createItem));
  console.log('Mock items created');
};

module.exports = { populateDatabase };
