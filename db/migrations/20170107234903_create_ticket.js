
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(
      'ticket', (table) => {
        table.increments('id').primary()
        table.string('origin').notNullable()
        table.string('destination').notNullable()
      }
    )
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ticket')
  ])
};
