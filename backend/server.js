require('./env-setup')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')

const app = express()
const health = require('./routes/health')

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
// app.use(logger('combined'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.use('/health', health)
const routes = require('./routes')
app.use('/api/v1', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

const port = Number(process.env.PORT) || 3000
app.listen(port, () => console.log(`Task api listening on port ${port}!`))
