const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/users/user.routes');
const { CategoryRouter } = require('./modules/category/category.routes');
const { OptionRouter } = require('./modules/option/option.routes');

const mainRouter = Router();
mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter);
mainRouter.use('/category', CategoryRouter);
mainRouter.use('/option', OptionRouter);
mainRouter.get('/', (req, res) => {
    res.render('./pages/index.ejs');
});

module.exports = mainRouter;
