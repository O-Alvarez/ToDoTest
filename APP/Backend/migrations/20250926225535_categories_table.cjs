
exports.up = function(knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id_category').primary()
    table.integer('id_project').notNullable().unsigned()
    table.string('description').notNullable()
    table.enu('color', ['verde', 'rojo', 'amarillo', 'azul']).notNullable().defaultTo('verde')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.foreign('id_project').references('id_project').inTable('projects').onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories')
};
