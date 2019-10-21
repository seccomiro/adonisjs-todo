'use strict';

const Task = use('App/Models/Task');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const term = request.input('search') || '';

    const tasks = (await auth.user
      .tasks()
      .where('title', 'like', `%${term}%`)
      .orderBy('done')
      .orderBy('updated_at', 'desc')
      .fetch()).rows;
    return view.render('tasks.index', { tasks });
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const task = new Task();
    return view.render('tasks.create', { task });
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const taskData = request.only(['title', 'body']);
    taskData.user_id = auth.user.id;
    const task = await Task.create(taskData);
    // await task.user().associate(auth.user);
    response.route('tasks.show', { id: task.id });
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ view, task }) {
    return view.render('tasks.show', { task });
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ view, task }) {
    return view.render('tasks.edit', { task });
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, task }) {
    const taskData = request.only(['title', 'body']);
    task.merge(taskData);
    const success = await task.save();
    response.route('tasks.show', { id: task.id });
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ response, task }) {
    await task.delete();
    response.route('tasks.index');
  }

  /**
   * Mark a task as done or not.
   * GET tasks/:id/done
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async done({ params, request, response, task }) {
    task.done = !task.done;
    await task.save();
    response.route('tasks.index');
  }
}

module.exports = TaskController;
