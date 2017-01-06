const knex = require('../knex')
const stations = require('../../stations')

class Train {

  constructor( id, capacity, location ) {
    this.id = id || 0,
    this.capacity = capacity || 50,
    this.location = location || 'elm',
    Train.create( {capacity: this.capacity, location: this.location} )
  }

  static create( {capacity, location} ) {
    const attributes = { capacity, location }
    return knex('train')
      .insert(attributes)
      .returning('*')
      .on('query-response', function(response) {
        return response
      })
      .then( train => {
        this.id = train[0].id,
        this.capacity = train[0].capacity,
        this.location = train[0].location
        return train
       })
      .then( train => console.log(train) )
      .catch( (error) => console.log(error))
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
      return new Train( train[0].id, train[0].capacity, train[0].location )
    })
  }

  getCurrentLocation() {
    return this.location
    // return knex.column('location')
    // .select()
    // .where({
    //   id: id
    // })
    // .from('train')
    // .then( location => location[0].location )
  }

  getNextLocation( id ) {
    return Train.getCurrentLocation( id )
    .then( currentLocation => {
      let currentIndex = stations.indexOf( currentLocation )
      const nextIndex = currentIndex === 11 ? 0 : currentIndex + 1
      const nextLocation = stations[ nextIndex ]
      return nextLocation
   })
  }

  updateWithNextLocation( id ) {
    return Train.getNextLocation( id )
    .then( nextLocation => {
      return knex.table('train')
      .where({ id: id })
      .update({ location: nextLocation })
      .returning('*')
      .then( location => location[0].location )
    })
  }

  static delete( id ) {
    return knex('train')
    .where({ id: id })
    .del()
  }

}

module.exports = Train
