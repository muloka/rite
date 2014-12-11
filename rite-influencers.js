var commander = require('commander'),
    async     = require('async'),
    colors    = require('colors'),
    Table     = require('cli-table'),
    oauth     = require('./lib/oauth'),
    urls      = require('./rite-urls'),
    config    = require(process.env.HOME + '/rite-config.json')

commander.parse(process.argv)

if (!commander.args.length) {
  console.error('hashtag required')
  process.exit(1)
}

var arg_hashtag = commander.args[0]

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