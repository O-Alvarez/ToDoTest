exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id_task').primary(); 
    table.integer('id_project').unsigned().notNullable() 
    table.integer('id_category').unsigned().notNullable() 
    table.string('title', 255).notNullable(); 
    table.text('description') 
    table.enu('priority', ['alta', 'media', 'baja']).notNullable().defaultTo('baja')
    table.timestamp('expiration_date').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('update_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    
    table.foreign('id_project').references('id_project').inTable('projects').onDelete('CASCADE')
    table.foreign('id_category').references('id_category').inTable('categories').onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks')
}