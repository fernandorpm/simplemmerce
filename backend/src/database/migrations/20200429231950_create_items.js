exports.up = function (knex) {
    return knex.schema.createTable('items', function (table) {
        table.increments('id');
        table.integer('category_id').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.integer('value').notNullable();
        table.binary('image_1').notNullable();
        table.binary('image_2');
        table.binary('image_3');
        table.binary('image_4');
        //binary = bytea for PostgreSQL

        table.foreign('category_id').references('id').inTable('categories');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('items');
};