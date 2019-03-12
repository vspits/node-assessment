const userData = require('./userData.json');

module.exports = {
  getUser: (req, res) => {
    // console.log(req.query)
    if (req.query.age) {
      const lessThanAge = userData.filter(user => user.age < req.query.age);
      res.status(200).send(lessThanAge);
    } else if (req.query.email) {
      const email = userData.filter(user => user.email.includes(req.query.email));
      res.status(200).send(email);
    } else if (req.query.favorites) {
      const favs = userData.filter(user => user.favorites.includes(req.query.favorites));
      res.status(200).send(favs);
    } else {
      res.status(200).send(userData);
    }
  },
  getUserId: (req, res) => {
    const { userId } = req.params;
    const i = userData.findIndex(user => +user.id === +userId);
    if (i !== -1 && +userId === +userData[i].id) {
      res.status(200).send(userData[i]);
    } else {
      res.sendStatus(404);
    }
  },
  getAdmin: (req, res) => {
    const admin = userData.filter(user => user.type === 'admin');
    res.status(200).send(admin);
  },
  getNonAdmin: (req, res) => {
    const nonAdmin = userData.filter(user => user.type !== 'admin');
    res.status(200).send(nonAdmin);
  },
  getUserType: (req, res) => {
    const userType = req.params;
    const userTypeArr = userData.filter(user => user.type === userType.userType);
    res.status(200).send(userTypeArr);
  },
  updateUserId: (req, res) => {
    // console.log(req.params.userId)
    const updatedUserData = userData.map((user, i) => {
      if (+req.params.userId === +user.id) {
        user = {
          id: +req.params.userId,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          gender: req.body.gender,
          language: req.body.language,
          age: req.body.age,
          city: req.body.city,
          state: req.body.state,
          type: req.body.type,
          favorites: req.body.favorites,
        };
        userData.splice(i, 1, user);
        return user;
      }
      return user;
    });
    return res.status(200).send(updatedUserData);
  },
  addUser: (req, res) => {
    const id = userData[userData.length - 1].id + 1;
    const user = req.body;
    console.log(id);
    userData.push(user);
    res.status(200).send(userData);
  },
  deleteUser: (req, res) => {
    const id = req.params.userId;
    const i = userData.findIndex(user => +user.id === +id);
    // console.log(userData.length)
    if (i !== -1) {
      userData.splice(i, 1);
    }
    // console.log(id, i)
    // console.log(userData.length)
    res.status(200).send(userData);
  },
};
