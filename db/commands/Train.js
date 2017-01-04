const knex = require('../knex')
const stations = require('../../stations')

const Train = {

  create: ({ capacity, location }) => {
    return knex('train')
    .insert({
      capacity,
      location
    })
    .returning('*')
    .then( train => train[0] )
  },

  getById: ( id ) => {
    return  knex.select('*')
    .where({ id: id })
    .from('train')
    .then( train => train[0] )
  },

  getCurrentLocation: ( id ) => {
    return knex.column('location')
    .select()
    .where({
      id: id
    })
    .from('train')
    .then( location => location[0].location )
  },

  getNextLocation: ( id ) => {
    return Train.getCurrentLocation( id )
    .then( currentLocation => {
      let currentIndex = stations.indexOf( currentLocation )
      const nextIndex = currentIndex === 11 ? 0 : currentIndex + 1
      const nextLocation = stations[ nextIndex ]
      return nextLocation
   })
  },

  gotoNextLocation: ( id ) => {
    return Train.getNextLocation( id )
    .then( nextLocation => {
      return knex.table('train')
      .where({ id: id })
      .update({ location: nextLocation })
      .returning('*')
      .then( location => location[0].location )
    })
  }

}

module.exports = Train
