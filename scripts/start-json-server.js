const fs = require('fs');
const jsonServer = require('json-server');
var cors = require('cors');

const port = 3000;
const testDbFilePath = './test-db.json';

const data = {
  "recipes": {
    "c263136b-970b-4ed4-9549-b2a1200d19ed": {
      "id": "c263136b-970b-4ed4-9549-b2a1200d19ed",
      "name": "Tasty Schnitzel",
      "description": "A super-tasty Schnitzel - just awesome?",
      "imagePath": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/640px-Schnitzel.JPG",
      "ingredients": [
        {
          "name": "Meat",
          "amount": 1
        },
        {
          "name": "French Fries",
          "amount": 20
        }
      ]
    },
    "008d6858-015c-4d90-bb3c-9e6eafd7f032": {
      "id": "008d6858-015c-4d90-bb3c-9e6eafd7f032",
      "name": "Big Fat Burger",
      "description": "What else you need to say?",
      "imagePath": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/640px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      "ingredients": [
        {
          "name": "Meat",
          "amount": 1
        },
        {
          "name": "Buns",
          "amount": 2
        }
      ]
    }
  }
};

fs.writeFileSync(testDbFilePath, JSON.stringify(data));
console.log('Created test db file: ' + testDbFilePath);

const server = jsonServer.create();
const router = jsonServer.router(testDbFilePath, {foreignKeySuffix: 'id' });
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(cors());

server.use('/ng-course-recipe-book', router);

server.listen(port, () => {
  console.log('JSON Server is running on port: ' + port);
});