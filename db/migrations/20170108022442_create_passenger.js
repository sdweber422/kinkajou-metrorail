
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(
      'passenger', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('location').notNullable()
      }
    )
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('passenger')
  ])
};
