exports.up = function (knex) {
    return knex.schema.createTable('order_items', function (table) {
        table.increments('id');
        table.integer('order_id').notNullable();
        table.integer('item_id').notNullable();
        table.integer('value').notNullable();

        table.foreign('order_id').references('id').inTable('orders');
        table.foreign('item_id').references('id').inTable('items');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('order_items');
};
