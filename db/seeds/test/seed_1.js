const fs = require('fs')
const JSON = require('JSON2')
const seeds = JSON.parse(fs.readFileSync(__dirname+'/seed_1.json', 'utf8'))

exports.seed = ( knex, Promise ) => {

  const truncateAllTables = () => {
    return Promise.all([
      knex.truncate( 'train' ),
      knex.truncate( 'station' )
    ])
  }

  const createTrains = () => {
    return knex
      .insert(seeds.trains)
      .into( 'train' )
      .returning('*')
  }

  const createStations = () => {
    return knex
    .insert(seeds.stations)
    .into( 'station' )
    .returning('*')
  }

  return truncateAllTables().then( createTrains ).then( createStations )

}
