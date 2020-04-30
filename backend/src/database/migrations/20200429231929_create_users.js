exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.string('whatsapp').notNullable();
    table.boolean('status').notNullable();
    table.integer('authority').notNullable();
    // [0]User, [1]Manager, [2]Admin

  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
