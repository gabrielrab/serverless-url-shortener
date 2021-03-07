const response = require('../../shared/response');
const repository = require('../../shared/repository');
const parser = require('../../utils/parser');
const Shortener = require('../models/Shortener');

const table = process.env.TABLE;

module.exports = {
  async list() {
    const urls = await repository(table).list();
    return response.success(urls, 200);
  },

  async create(event, context) {
    const alert = new Shortener({
      short: !(event && event.body.short)
        ? Math.random().toString(36).slice(-8)
        : event.body.short,
      ...parser.parseToObject(event.body),
    });
    const { errors } = alert.validate();
    if (errors) {
      return response.error('Validation', errors, context);
    }
    await repository(table).create(alert);
    return response.success(alert, 201);
  },

  async redirect(event, context) {
    const shortener = await repository(table).getBy({
      short: event.pathParameters.short,
    });
    if (shortener.length === 0) {
      return response.error(
        'NotFound',
        { path: `short`, value: event.pathParameters.short },
        context,
      );
    }
    const { url } = shortener[0] || {};
    return response.success(null, 301, {
      Location: url,
    });
  },

  async delete(event, context) {
    const { Attributes } = await repository(table).delete(
      event.pathParameters.id,
    );
    return Attributes
      ? response.success({}, 204)
      : response.error('Request', '', context);
  },
};
