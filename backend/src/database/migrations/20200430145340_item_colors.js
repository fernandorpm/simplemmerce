exports.up = function (knex) {
    return knex.schema.createTable('item_colors', function (table) {
        table.increments('id');
        table.integer('item_id').notNullable();
        table.string('name').notNullable();
        table.boolean('available').notNullable();

        table.foreign('item_id');references('id').inTable('items');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_colors');
};