const db = require('./../data/db.js');

module.exports = {
  findUserById,
  addUser,
}

function findUserById(id) {
    return db("users")
        .select("id", "user", "password")
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
