
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(
      'passengersTickets', (table) => {
        table.integer('passenger_id').notNullable()
        table.integer('ticket_id').notNullable()
      }
    )
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('passengersTickets')
  ])
};
