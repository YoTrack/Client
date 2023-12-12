module.exports.up = async (knex) => {
  await knex.schema.table('card', (table) => {
    table.double('duration');
    table.bigInteger('assignee');
    table.integer('priority').defaultTo(0);
  });
};

module.exports.down = (knex) =>
  knex.schema.table('card', (table) => {
    table.dropColumn('duration');
    table.dropColumn('assignee');
    table.dropColumn('priority');
  });
