function NotFoundHandler(app) {
    app.use(function (req, res, next) {
        res.status(404).json({
            message: 'not found routes',
        });
    });
}

module.exports = NotFoundHandler;
