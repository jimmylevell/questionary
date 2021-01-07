const { database } = require('../database')
const Sequelize = require('sequelize');

exports.Question = database.define('question', {
    question: Sequelize.STRING
  });