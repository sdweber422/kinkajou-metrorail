const fs = require('fs')
const JSON = require('JSON2')
const seeds = JSON.parse(fs.readFileSync(__dirname+'/seed_1.json', 'utf8'))

exports.seed = ( knex ) => {

  const truncateAllTables = () => {
    return Promise.all([
      knex.truncate( 'train' )
    ])
  }

  const createTrains = () => {
    return knex
      .insert(seeds.trains)
      .into( 'train' )
      .returning('*')
  }

  return truncateAllTables().then( createTrains )

}
