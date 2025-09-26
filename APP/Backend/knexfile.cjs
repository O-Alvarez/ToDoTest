// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config()

module.exports = {

  development: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  staging: {
    client: 'mysql2',
    connection: {
      host: process.env.STAGING_DB_HOST,
      port: process.env.STAGING_DB_PORT || 3306,
      user: process.env.STAGING_DB_USER,
      password: process.env.STAGING_DB_PASSWORD,
      database: process.env.STAGING_DB_NAME
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  // staging: {
  //   client: 'mysql2',
  //   connection: {
  //     host: process.env.STAGING_DB_HOST,
  //     port: process.env.STAGING_DB_PORT || 3306,
  //     user: process.env.STAGING_DB_USER,
  //     password: process.env.STAGING_DB_PASSWORD,
  //     database: process.env.STAGING_DB_NAME
  //   },
  //   migrations: {
  //     directory: './migrations',
  //     tableName: 'knex_migrations'
  //   },
  //   seeds: {
  //     directory: './seeds'
  //   }
  // },

  // production: {
  //   client: 'mysql2',
  //   connection: {
  //     host: process.env.PROD_DB_HOST,
  //     port: process.env.PROD_DB_PORT || 3306,
  //     user: process.env.PROD_DB_USER,
  //     password: process.env.PROD_DB_PASSWORD,
  //     database: process.env.PROD_DB_NAME
  //   },
  //   migrations: {
  //     directory: './migrations',
  //     tableName: 'knex_migrations'
  //   },
  //   seeds: {
  //     directory: './seeds'
  //   }
  // }
};
