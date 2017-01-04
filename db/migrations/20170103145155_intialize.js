
exports.up = function(knex, Promise) {
  return Promise.all([ knex.schema.createTable( 'train', (table) => {
    table.increments('id').primary()
    table.string('location').notNullable()
    table.integer('capacity').notNullable()
  } ) ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('train')
  ])
};
