// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      //filename: './dev.sqlite3'
      filename: "./data/userLogin.db3", // WHERE IS YOUR DB?
    },
    useNullAsDefault: true, // ONLY needed for SQLite

    migrations: {
        directory: "./migrations",//WHERE IS YOUR MIGRATIONS FOLDER?
    },
    seeds: {
        directory: "./seeds",//WHERE IS YOUR SEEDS FOLDER?
    },
    // SQLite will not enforce foreign key constraints by default
    // ONLY NEEDED FOR SQLITE
    pool: {
        afterCreate: (conn, done) => {
            conn.run("PRAGMA foreign_keys = ON", done); // tur on foreign key enforcement
        },
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
