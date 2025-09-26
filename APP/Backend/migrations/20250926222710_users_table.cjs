//migraciones cuando se ejecuta migrate
exports.up = function(knex) {
  return knex.schema.createTable( 'users' , (table) =>{
    table.increments('id_user').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('mail').notNullable().unique()
    table.string('password_hash').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  })
};

//cambios cuando se ejecuta rollback
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}