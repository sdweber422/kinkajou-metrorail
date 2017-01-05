const knex = require('../knex')

const Station = {

  create: ({ name, order_number }) => {
    return knex('station')
    .insert({
      name,
      order_number
    })
    .returning('*')
    .then( station => station[0])
  }
}

module.exports = Station
