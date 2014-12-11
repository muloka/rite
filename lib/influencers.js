var influencers = function (argv, callback) {
  var arg_hashtag = argv['_'].splice(1).join(' ')

  if (!arg_hashtag.length) {
    console.error('hashtag required')
    process.exit(1)
  }

  var async     = require('async'),
      chalk     = require('chalk'),
      Table     = require('cli-table'),
      oauth     = require('../lib/oauth'),
      urls      = require('../rite-urls'),
      config    = require(process.env.HOME + '/rite-config.json')

  oauth.get(
    urls.base + urls.influencers_for_hashtag + arg_hashtag,
    config.token,
    config.token_secret,
    function (err, data, res) {
      if (err) { 
        console.error(err)
        process.exit(1)
      }

      var json = JSON.parse(data)

      var table = new Table({
        head: ['username','followers']
      })

      async.each(json.influencers, function(influencer, cbEach) {

        table.push([
          '@' + influencer.username,
          influencer.folowers
        ])

        cbEach()
      }, function(err){
        if (err) {
          console.error(err)
          process.exit(1)
        }

        console.log("┌────────────────────────────────────────────────────────────────────────────────────────────────")
        console.log("│ Influencers for Hashtag: #" + arg_hashtag)
        console.log(table.toString())
      })
    }
  )

  return callback()
}

module.exports = influencers