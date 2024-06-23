const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const ticketRoute = require('./ticket.route');
const ticketStatusRoute = require('./ticketStatus.route');
const customerRoute = require('./customer.route');
const tagRoute = require('./tag.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/tickets',
    route: ticketRoute,
  },
  {
    path: '/ticketstatus',
    route: ticketStatusRoute,
  },
  {
    path: '/tags',
    route: tagRoute,
  },
  {
    path: '/customers',
    route: customerRoute,
  },
  {
    path: '/heartz',
    route: (req, res) => {
      res.json({
        message: 'OK',
      });
    },
  },

  {
    path: '/',
    route: (req, res) => {
      res.json({
        message: 'Welcome to Express API template',
      });
    },
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
