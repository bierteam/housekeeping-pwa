require('./env-setup')
const createError = require('http-errors')
const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')

const app = express()
const health = require('./routes/health')

// maybe use:
// app.use(cors()) // https://www.npmjs.com/package/cors
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // https://stackoverflow.com/questions/9713644/when-is-it-safe-to-enable-cors/9725695#9725695
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,GET,DELETE,OPTIONS')
  next()
})

app.disable('x-powered-by')
app.use(express.json())
app.use('/health', health) // above logger to not log this every second
app.use(logger(app.get('env') === 'development' ? 'dev' : 'combined'))

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const routes = require('./routes')
app.use('/api/v1', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

const port = Number(process.env.PORT) || 3000
app.listen(port, () => console.log('Task api listening on port', port))
