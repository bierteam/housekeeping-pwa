const jwt = require('jsonwebtoken')
const User = require('../models/user')
const denied = [
  'Denied!',
  'Thou shall not pass!',
  'Oh noes',
  'OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!',
  'Oh oh',
  'No.',
  'You can go away now',
  'Nice try'
]

const someMiddleWare = () => {
  console.log('Some middleware is called')
}
module.exports = someMiddleWare
