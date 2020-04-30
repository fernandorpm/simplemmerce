exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments('id');
        table.integer('address_id').notNullable();
        table.integer('value');
        table.integer('status').notNullable();
        // [0]Started, [1]Canceled, [2]Paid, [3]Finished

        table.foreign('address_id');references('id').inTable('address');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
