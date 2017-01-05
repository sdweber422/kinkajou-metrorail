
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(
      'station', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('order_number').notNullable()
      }
    )
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('station')
  ])
};
