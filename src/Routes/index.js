const customerRouter = require('./customer')
const loginRouter = require('./login')
const registerRouter = require('./register')

function router(app) {
    app.use('/customer', customerRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);

}

module.exports = router;
