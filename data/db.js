const knex = require('knex');

const configOptions = require('../knexfile').development;//point to your "knexfile.js"

module.exports = knex(configOptions);
