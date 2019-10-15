'use strict';

require('./authRoutes.js');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.any('/', ({ response }) => response.redirect('/tasks'));

Route.resource('tasks', 'TaskController').middleware('auth');
Route.get('/tasks/:id/done', 'TaskController.done')
  .as('tasks.done')
  .middleware('auth');
