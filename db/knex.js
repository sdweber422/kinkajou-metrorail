const Knex = require('knex')

//NOTE: Remove hardcoding of test environment.
const config = require('../knexfile')['test']  //[process.env.NODE_ENV]
const knex = Knex(config)

knex.truncateAllTables = function(){
  return knex.schema.raw(`
    BEGIN;
    TRUNCATE train RESTART IDENTITY CASCADE;
    TRUNCATE station RESTART IDENTITY CASCADE;
    COMMIT;
  `)
}

knex.truncateTrainTable = function(){
  return knex.schema.raw(`
    BEGIN;
    TRUNCATE train RESTART IDENTITY CASCADE;
    COMMIT;
  `)
}

module.exports = knex
