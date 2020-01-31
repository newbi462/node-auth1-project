
exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
        table.increments();
        table.string("user").notNullable().index();
        table.string("password").notNullable().index();
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users");
};
