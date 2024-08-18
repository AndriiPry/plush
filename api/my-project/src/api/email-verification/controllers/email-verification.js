'use strict';

/**
 * email-verification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::email-verification.email-verification');
