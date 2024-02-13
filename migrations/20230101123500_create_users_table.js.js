exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("location");
    table.text("bio");
    table.string("profile_photo");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
