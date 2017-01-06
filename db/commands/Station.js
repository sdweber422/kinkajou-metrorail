const knex = require('../knex')
const stations = require('../../stations')

class Station {

  constructor( name, order_number ) {
    this.name = name || 'downtown',
    this.order_number = order_number || 0,
    Station.create( { name: this.name, order_number: this.order_number } )
  }

  static create( { name, order_number } ) {
    const attributes = { name, order_number }
    return knex('station')
    .insert( attributes )
    .returning('*')
    .on('query-response', response => {
      return response
    })
    .then( station =>{
      this.name = station[0].name,
      this.order_number = station[0].order_number
      return station
    })
    .then( station => console.log( station ))
    .catch( error => console.error( error ))
  }

//NOTE: Not sure where to put the or null for return value,
  static getByName( name ) {
    return knex.select()
    .where({ name: name })
    .from( 'station' )
    .catch( () => {
      console.error('ERROR: Station does not exist in database.')
    })
    .then( station => {
      return new Station( staion[0].name, station[0].order_number )
    }) // || null
  }    // here ^ ?

  getOrderNumber() {
    return this.order_number
  }

//NOTE: I realzed to make this more dynamic we can't rely on the array to maintain
// the order of the stations but use the data in the database.
  getNextInOrder() {
    return knex( 'station' ).count( 'order_number' )
    .then( totalStations => {
      if ( this.order_number >= totalStations - 1) {
        return knex.select( 'name' )
        .where({ order_number: 0 })
        .from( 'station' )
      } else {
        const nextOrderNumber = this.order_number + 1
        return knex.select( 'name' )
        .where({ order_number: nextOrderNumber })
        .from( 'station ')
      }//FIXME: Add a catch for if someonthing goes wrong here.
    })
  }
}

module.exports = Station
