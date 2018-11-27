const app = require('express')();
const bodyParser = require('body-parser');

let users = require('./userData.json');

let id = 101;

app.use(bodyParser.json());

app.get('/api/user', (req, res) => {
  let result = [];
  if (req.query.age) {
    const { age } = req.query;
    result = users.filter(user => user.age < age);
  } else if (req.query.lastname) {
    const { lastname } = req.query;
    result = users.filter(user => user.last_name === lastname);
  } else if (req.query.email) {
    const { email } = req.query;
    result = users.filter(user => user.email === email);
  } else if (req.query.favorites) {
    const { favorites } = req.query;
    result = users.filter(user => user.favorites.includes(favorites));
  } else {
    result = users;
  }
  res.send(result);
});

app.get('/api/user/:id', (req, res) => {
  const user = users.find(user => user.id == req.params.id);
  if (!user) {
    res.sendStatus(404);
  } else {
    res.send(user);
  }
});

app.get('/api/admin', (req, res) => {
  res.send(users.filter(user => user.type === 'admin'));
});

app.get('/api/nonadmin', (req, res) => {
  res.send(users.filter(user => user.type !== 'admin'));
});

app.get('/api/type/:type', (req, res) => {
  res.send(users.filter(user => user.type === req.params.type));
});

app.put('/api/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(users.map(user => (user.id == id ? req.body : user)));
});

app.post('/api/user', (req, res) => {
  const { body } = req;
  body.id = id++;
  users = [...users, body];
  res.send(users);
});

app.delete('/api/user/:id', (req, res) => {
  users = users.filter(user => user.id != req.params.id);
  res.send(users);
});

app.listen(3000, () => {
  console.log('running');
});
