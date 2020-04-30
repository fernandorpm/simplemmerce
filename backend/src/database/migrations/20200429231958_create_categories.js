exports.up = function(knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('tag_1').notNullable();
    table.string('tag_2');
    table.string('tag_3');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
