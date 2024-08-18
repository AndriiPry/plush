'use strict';

/**
 * email-verification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email-verification.email-verification');
