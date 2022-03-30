'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.NODE_ENV === 'production' ? 'sqlite:memory:' : process.env.DATABASE_URL || 'postgresql://localhost:5432/bearer-auth';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG, {
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized: false,
    },
  },
});
module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};
