const db = require('./../data/db.js');

module.exports = {
  findUserById,
  addUser,
  findByProp,
}

function findUserById(id) {
  return db("users")
    .select("id", "user", "password")// added pass so I could see hash for token
    .where({ id })
    .first();
}

function addUser(userObj) {
  return db("users")
    .insert(userObj, "id")
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}

function findByProp(filterBy) {
    return db("users")
        .select("id", "user", "password")
        .where(filterBy);
}
