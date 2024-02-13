/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .createTable("comments", function (table) {
      table.increments("id").primary();
      table.integer("post_id").unsigned().notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.text("comment").notNullable();
      table.timestamps(true, true);

      table
        .foreign("post_id")
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
