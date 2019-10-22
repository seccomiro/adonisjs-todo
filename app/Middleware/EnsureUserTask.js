'use strict';

class EnsureUserTask {
  async handle(ctx, next) {
    const { params, auth } = ctx;
    const task = await auth.user
      .tasks()
      .where('id', params.id)
      .first();
    ctx.task = task;

    await next();
  }
}

module.exports = EnsureUserTask;
