
exports.up = function(knex, Promise) {
  return Promise.all([ knex.schema.table('train', table => { table.string('train_name').notNullable()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.table('train', table => { table.dropColumn('train_name')
    })
  ])
};
