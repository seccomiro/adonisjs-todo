'use strict';

/*
|--------------------------------------------------------------------------
| TaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');
const Task = use('App/Models/Task');

class TaskSeeder {
  async run() {
    await Task.create({
      title: 'Wash the car',
      body: 'This sunday',
      done: true
    });
    await Task.create({
      title: 'Clean the house',
      body: 'Really',
      done: false
    });
  }
}

module.exports = TaskSeeder;
