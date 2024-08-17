'use strict';

/**
 * email-verification router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::email-verification.email-verification');
