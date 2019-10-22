'use strict';
const Config = use('Config');
const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (
      error.name === 'InvalidLoginException' ||
      error.name === 'InvalidSessionException'
    ) {
      return response.redirect(Config.get('adonis-auth-scaffold.loginRoute'));
    }
    if (
      error.name === 'HttpException' &&
      error.message.includes('E_GUEST_ONLY')
    ) {
      return response.redirect(
        Config.get('adonis-auth-scaffold.registrationSuccessRedirectTo')
      );
    }

    return super.handle(...arguments);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
