
exports.up = function (knex) {
    return knex.schema.createTable('projects', (table) => {
        table.increments('id_project').primary()
        table.integer('id_user').notNullable().unsigned()
        table.string('title').notNullable()
        table.string('description')
        table.enu('status', ['en proceso', 'finalizado', 'pausado', 'cancelado']).notNullable().defaultTo('en proceso')
        table.boolean('ispublic').notNullable().defaultTo(false)
        table.timestamp('expiration_date')
        table.timestamp('Defeated_time')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.foreign('id_user').references('id_user').inTable('users').onDelete('CASCADE')
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('projects')
};
