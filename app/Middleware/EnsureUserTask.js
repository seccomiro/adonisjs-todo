'use strict';

class EnsureUserTask {
  async handle({ request, params, auth }, next) {
    console.log('EnsureUserTask EnsureUserTask EnsureUserTask EnsureUserTask');
    // const task = await auth.user
    //   .tasks()
    //   .where('id', params.id)
    //   .first();
    // request.task = task;

    await next();
  }
}

module.exports = EnsureUserTask;
