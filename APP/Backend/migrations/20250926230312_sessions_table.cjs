
exports.up = function(knex) {
  return knex.schema.createTable('sessions', (table) =>{
    table.increments('id_session').primary()
    table.integer('id_user').notNullable().unsigned()
    table.string('token', 255).notNullable()
    table.text('user_agent').notNullable()
    table.string('ip_address', 45).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('expiration_date').notNullable()
    table.boolean('status').notNullable().defaultTo(true)

    table.foreign('id_user').references('id_user').inTable('users').onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sessions')
}
