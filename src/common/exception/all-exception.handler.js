function AllExceptionHandler(app) {
    app.use(function (err, req, res, next) {
        let status = err?.status ?? err?.statusCode ?? err?.code;
        if (!status || isNaN(+status) || status > 500 || status < 200) status = 500;
        res.status(status).json({
            message: err?.message ?? err?.stack ?? 'internalServerError',
        });
    });
}

module.exports = AllExceptionHandler;
