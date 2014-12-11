var commander = require('commander'),
    async     = require('async'),
    colors    = require('colors'),
    Table     = require('cli-table'),
    oauth     = require('./lib/oauth'),
    urls      = require('./rite-urls'),
    config    = require(process.env.HOME + '/rite-config.json')

commander.parse(process.argv)

if (!commander.args.length) {
  console.error('url required')
  process.exit(1)
}

var arg_url = commander.args[0]

// console.log(urls.base + urls.hashtags_for_url + arg_url)
// process.exit(1)

oauth.get(
  urls.base + urls.hashtags_for_url + arg_url,
  config.token,
  config.token_secret,
  function (err, data, res) {
    if (err) { 
      console.error(err)
      process.exit(1)
    }

    console.log(data)

    // var json = JSON.parse(data)

    // var table = new Table({
    //   head: ['hashtag','count']
    // })

    // async.each(json.data, function(hashtag, cbEach) {

    //   table.push([
    //     '#' + hashtag.tag,
    //     hashtag.count
    //   ])

    //   cbEach()
    // }, function(err){
    //   if (err) {
    //     console.error(err)
    //     process.exit(1)
    //   }

    //   console.log("┌────────────────────────────────────────────────────────────────────────────────────────────────")
    //   console.log("│ Hashtags for URL: " + arg_url)
    //   console.log(table.toString())
    // })
  }
)