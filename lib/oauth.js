var OAuth     = require('oauth'),
    config    = require('../rite-config')

var oauth = function () {
  return new OAuth.OAuth(
    null,
    null,
    config.consumer_key,
    config.consumer_secret,
    '1.0',
    null,
    'HMAC-SHA1'
  )
}()

module.exports = oauth