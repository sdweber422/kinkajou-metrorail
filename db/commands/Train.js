const knex = require('../knex')
const stations = require('../../stations')

class Train {

  constructor( capacity, location ) {
    this.capacity = capacity || 50,
    this.location = location || 'elm',
    this.create( {capacity: this.capacity, location: this.location} )
  }

  create( {capacity, location} ) {
    console.log('$$$$$$$$$$$$', capacity, location)
    const attributes = { capacity, location }
    console.log('attributes', attributes)

    return knex('train')
      .insert(attributes)
      .returning('*')
      .catch( (error) => console.log(error))
      .then( train => train[0] )
  }
//NOTE: Change return value to an object or null, per Punit (Changes for multiple test will have to occur)
  getById( id ) {
    return  knex.select('*')
    .where({ id: id })
    .from('train')
    .catch( () => {
      console.log('ERROR: Train does not exists in database.')
      return 'Train does not exist.'
    })
    .then( train => train[0] )
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

  delete( id ) {
    return knex('train')
    .where({ id: id })
    .del()
  }

}

module.exports = Train
