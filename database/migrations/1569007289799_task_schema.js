'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TaskSchema extends Schema {
  up() {
    this.create('tasks', table => {
      table.increments();
      table.string('title', 100).notNullable();
      table.string('body', 200);
      table.boolean('done').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('tasks');
  }
}

module.exports = TaskSchema;
