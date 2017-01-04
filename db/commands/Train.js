const knex = require('../knex')

const Train = {

  create: ({ capacity, location }) => {

    console.log( capacity, location )
    return knex('train').insert({ capacity: capacity, location: location }).returning('*')
    // NOTE: Stuck here, function not returning new entry. FIXME
  },

  getById: ( request, response, next ) => {
    const { id } = request.params
    knex.select('*').where({ id: id }).from('train')
    .then( result =>  response.send(result[0]) )
  },

  getLocation: ( request, response, next ) => {

  }
}

module.exports = Train
