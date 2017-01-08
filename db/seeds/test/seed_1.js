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

  const createPassengers = () => {
    return knex
    .insert(seeds.passengers)
    .into( 'passenger' )
    .returning('*')
  }

  const createTickets = () => {
    return knex
    .insert(seeds.tickets)
    .into( 'ticket' )
    .returning('*')
  }

  const createPassengersTickets = () => {
    return knex
    .insert(seeds.passengersTickets)
    .into( 'passengersTickets' )
    .returning('*')
  }

  return truncateAllTables().then( createTrains ).then( createStations ).then( createPassengers ).then( createTickets ).then( createPassengersTickets )

}
