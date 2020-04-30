exports.up = function (knex) {
    return knex.schema.createTable('addresses', function (table) {
        table.increments('id');
        table.string('user_id').notNullable();
        table.string('zipcode').notNullable();
        table.string('street').notNullable();
        table.integer('number').notNullable();
        table.string('district').notNullable();

        table.foreign('user_id');references('id').inTable('users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('addresses');
};
