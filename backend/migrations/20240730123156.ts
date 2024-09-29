import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('newsubmissions', (table: Knex.TableBuilder) => {
    table.string('id').primary();
    table.timestamp('submittedAt').notNullable();
    table.jsonb('data').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('newsubmissions');
}
