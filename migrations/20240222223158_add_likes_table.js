/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("likes", function (table) {
    table.increments("id").primary();
    table.integer("post_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();

    table.foreign("post_id").references("posts.id").onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");

    table.unique(["post_id", "user_id"]);

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
