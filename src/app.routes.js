const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/users/user.routes');

const mainRouter = Router();
mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter);

module.exports = mainRouter;
