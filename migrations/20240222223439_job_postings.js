/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("job_postings", (table) => {
    table.increments("id").primary();
    table
      .integer("company_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.string("job_title").notNullable();
    table.text("job_description").notNullable();
    table.string("location").notNullable();
    table.string("salary_range");
    table.string("job_type");
    table.string("experience_level");
    table.text("qualifications");
    table.string("industry");
    table.date("posted_date").notNullable();
    table.date("expiration_date");
    table.string("status").defaultTo("active");
    table.string("application_email_or_link");
    table.timestamps(true, true);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("job_postings");
};
