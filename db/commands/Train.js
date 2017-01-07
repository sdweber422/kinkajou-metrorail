const knex = require('../knex')
const stations = require('../../stations')

class Train {

  constructor( id, capacity, location, train_name ) {
    this.id = id || 0,
    this.capacity = capacity || 50,
    this.location = location || 'elm',
    this.trainName = train_name || 'Union Pacific'
  }

static create( {capacity, location, train_name} ) {
  const attributes = { capacity, location, train_name }
  return Promise.resolve(Promise.resolve(knex('train')
    .insert(attributes)
    .returning('*')
    .on('query-response', response => response)
    .then( train => new Train( train[0].id, train[0].capacity, train[0].location, train[0].train_name ) )
    .then( train => train )
    .catch( (error) => console.log(error))))
}
//NOTE: Change return value to an object or null, per Punit (Changes for multiple test will have to occur)
  static getById( id ) {
    return  knex.select('*')
    .where({ id: id })
    .from('train')
    .catch( () => {
      console.log('ERROR: Train does not exists in database.')
    })
    .then( train => {
      return new Train( train[0].id, train[0].capacity, train[0].location, train[0].train_name )
    })
  }

  getCurrentLocation() {
    return this.location
  }

  getNextStation() {
      let currentIndex = stations.indexOf( this.location )
      const nextIndex = currentIndex === 11 ? 0 : currentIndex + 1
      const nextLocation = stations[ nextIndex ]
      return nextLocation
  }

  moveToNextStation() {
    return knex.select('*')
      .where({ name: this.location })
      .from('station')
      .then( station => {
        let stationId = station[0].id + 1
        return knex.select('*')
        .where({ id: stationId })
        .from('station')
      })
      .then( station => {
        let nextLocation = station[0].name
        return knex.table('train')
        .where({ id: this.id })
        .update({ location: nextLocation })
        .returning('*')
      })
      .then( location => {
        this.location = location[0].location
        return this.location })
  }

  isAtMaxCapacity() {

  }

  getMaxCapacity() {
    return this.capacity
  }

  static delete( id ) {
    return knex('train')
    .where({ id: id })
    .del()
  }
//NOTE: Add instance method for delete
}

module.exports = Train
require('make-runnable')
