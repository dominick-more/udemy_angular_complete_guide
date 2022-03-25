const fs = require('fs');
const bcryptjs = require('bcryptjs');
const jsonServer = require('json-server');
const jsonServerAuth = require('json-server-auth');
const { SALT_LENGTH } = require('json-server-auth/dist/constants');
var cors = require('cors');

const port = 3000;
const testDbFilePath = './test-db.json';

const hashPassword = (password) => {
  return bcryptjs.hashSync(password, SALT_LENGTH);
};

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
  },
  "users": [
    {
      "email": "test@test.com",
      "password": hashPassword('password'),
      "id": 1
    }
  ]
};

fs.writeFileSync(testDbFilePath, JSON.stringify(data));
console.log('Created test db file: ' + testDbFilePath);

// @see {@link https://www.npmjs.com/package/json-server}
const app = jsonServer.create();
const router = jsonServer.router(testDbFilePath, {foreignKeySuffix: 'id' });

// Bind the router db to the app for jsonServerAuth
app.db = router.db;

const middlewares = jsonServer.defaults();

const rules = jsonServerAuth.rewriter({
  // Permission rules protect 'ng-course-recipe-book' r/w
  // @see {@link https://www.npmjs.com/package/json-server-auth}
  'ng-course-recipe-book': 660
})

// Apply route protection rules
app.use(rules);

// Enable cors since server is running on a different port
app.use(cors());

app.use(middlewares);
app.use(jsonServerAuth);
app.use('/ng-course-recipe-book', router);

app.listen(port, () => {
  console.log('JSON Server is running on port: ' + port);
});